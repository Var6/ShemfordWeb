import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { formattedSchoolData } from "@/data/schoolData";
import { 
  getClientIp, 
  checkRateLimit, 
  getRemainingRequests, 
  getResetTimeSeconds 
} from "@/lib/rateLimit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    // Limit message history to last 10 messages to avoid token limits
    const recentMessages = messages.slice(-10);

    // ===== CALL OPENAI API =====
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...recentMessages,
      ],
      max_tokens: 500,
      temperature: 0.2, // Factual responses only
    });

    const assistantMessage =
      response.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again or contact us at admissions@shemfordpatna.com";

    return NextResponse.json(
      { response: assistantMessage },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Chatbot API error:", error);

    // ===== ERROR HANDLING WITH FALLBACK MESSAGES =====

    // OpenAI API Errors
    if (error instanceof OpenAI.APIError) {
      // Quota exceeded / Rate limit from OpenAI
      if (error.status === 429) {
        return NextResponse.json(
          { 
            response: "Our AI assistant is temporarily busy. Please try again in a few moments, or contact us directly at +91 9431201060 or admissions@shemfordpatna.com. We're here to help!" 
          },
          { status: 200 } // Return 200 so client doesn't crash
        );
      }

      // Invalid API key
      if (error.status === 401) {
        console.error("CRITICAL: OpenAI API key invalid");
        return NextResponse.json(
          { 
            response: "We're experiencing a temporary issue. Please contact the school directly: +91 9431201060" 
          },
          { status: 200 }
        );
      }

      // Server error from OpenAI
      if (error.status === 500) {
        return NextResponse.json(
          { 
            response: "OpenAI servers are temporarily unavailable. Please try again in a moment or contact us at +91 9431201060." 
          },
          { status: 200 }
        );
      }

      // Other OpenAI errors
      return NextResponse.json(
        { 
          response: "I'm having trouble responding right now. Please call the school at +91 9431201060 for immediate assistance." 
        },
        { status: 200 }
      );
    }

    // Network or other errors
    return NextResponse.json(
      { 
        response: "Connection error. Please check your internet connection or contact the school at +91 9431201060." 
      },
      { status: 200 }
    );
  }
}
