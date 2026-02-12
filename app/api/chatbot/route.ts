import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { formattedSchoolData } from "@/data/schoolData";
import { generateLocalResponse } from "@/lib/localQA";
import { 
  getClientIp, 
  checkRateLimit, 
  getRemainingRequests, 
  getResetTimeSeconds 
} from "@/lib/rateLimit";

// Validate API key exists
if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ OPENAI_API_KEY not set - Using local Q&A system");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy",
});

const SYSTEM_PROMPT = `You are Shem Bot, an AI assistant for Shemford Futuristic School.

CRITICAL: You ONLY answer questions using the knowledge base below. 
If information is not in this knowledge base, respond with:
"I don't have that specific information. Please contact the school directly at +91 9431201060 or admissions@shemfordpatna.com"

DO NOT:
- Guess or assume information
- Provide general knowledge unrelated to the school
- Make up fees, dates, or policies
- Discuss politics, religion, or controversial topics
- Answer questions outside school scope

===== OFFICIAL SCHOOL KNOWLEDGE BASE =====
${formattedSchoolData}
===== END OF KNOWLEDGE BASE =====

RESPONSE GUIDELINES:
1. Be friendly, professional, and concise
2. Use the knowledge base ONLY
3. For detailed information, suggest contacting the school
4. Encourage campus visits for prospective students
5. Answer in a helpful and welcoming manner
6. If unsure, direct to: +91 9431201060 or admissions@shemfordpatna.com`;

export async function POST(request: NextRequest) {
  try {
    // ===== RATE LIMITING =====
    const clientIp = getClientIp(request);
    
    if (!checkRateLimit(clientIp)) {
      const resetTime = getResetTimeSeconds(clientIp);
      return NextResponse.json(
        { 
          error: `You've sent too many messages. Please wait ${resetTime} seconds before trying again. This helps us serve all visitors better. Contact the school directly: +91 9431201060` 
        },
        { status: 429 }
      );
    }

    // ===== VALIDATE INPUT =====
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Prevent extremely long conversations
    if (messages.length > 50) {
      return NextResponse.json(
        { error: "Conversation is too long. Please start a new chat." },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuestion = lastMessage?.content || "";

    // ===== TRY OPENAI FIRST =====
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "sk-dummy") {
      try {
        // Limit message history to last 10 messages to avoid token limits
        const recentMessages = messages.slice(-10);

        let response;
        let modelUsed = "gpt-3.5-turbo";

        try {
          // Try primary model
          response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              ...recentMessages,
            ],
            max_tokens: 500,
            temperature: 0.2,
          });
        } catch (primaryError: any) {
          console.warn(`Primary model (${modelUsed}) failed, trying fallback...`, primaryError.message);
          
          // If primary model fails, try fallback model
          try {
            modelUsed = "gpt-4o-mini";
            response = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: SYSTEM_PROMPT,
                },
                ...recentMessages,
              ],
              max_tokens: 500,
              temperature: 0.2,
            });
          } catch (fallbackError: any) {
            console.warn(`Both OpenAI models failed, falling back to local Q&A: ${fallbackError.message}`);
            // Fall through to local Q&A
            throw fallbackError;
          }
        }

        const assistantMessage =
          response.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response. Please try again or contact us at admissions@shemfordpatna.com";

        return NextResponse.json(
          { response: assistantMessage },
          { status: 200 }
        );
      } catch (error: any) {
        // Log OpenAI error but continue to local Q&A
        console.warn("OpenAI API failed, using local Q&A system:", error.message);
        // Fall through to local Q&A below
      }
    }

    // ===== FALLBACK TO LOCAL Q&A =====
    console.log("💡 Using local Q&A system (no API quota needed)");
    const localResponse = generateLocalResponse(userQuestion);
    
    return NextResponse.json(
      { response: localResponse },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Chatbot error (using local Q&A fallback):", error.message);

    // ===== ULTIMATE FALLBACK =====
    return NextResponse.json(
      { 
        response: "I'm here to help! 😊 Ask me about:\n✓ School admissions\n✓ Classes and curriculum\n✓ Facilities\n✓ Timings\n✓ Contact information\n\nOr call us: +91 9431201060" 
      },
      { status: 200 }
    );
  }
}

