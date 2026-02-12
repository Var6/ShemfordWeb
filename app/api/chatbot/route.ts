import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { formattedSchoolData } from "@/data/schoolData";
import { 
  getClientIp, 
  checkRateLimit, 
  getRemainingRequests, 
  getResetTimeSeconds 
} from "@/lib/rateLimit";

// Validate API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error("CRITICAL: OPENAI_API_KEY not set in environment variables");
}

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
        console.error(`Both models failed. Primary: ${primaryError.message}, Fallback: ${fallbackError.message}`);
        throw fallbackError; // Throw fallback error for main catch block
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
    console.error("Chatbot API error details:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      fullError: JSON.stringify(error)
    });

    // ===== ERROR HANDLING WITH FALLBACK MESSAGES =====

    // OpenAI API Errors
    if (error instanceof OpenAI.APIError) {
      console.error(`OpenAI API Error - Status: ${error.status}, Message: ${error.message}`);
      
      // 429 - Rate limit (quota or too many requests)
      if (error.status === 429) {
        console.error("Rate limit hit:", error.message);
        return NextResponse.json(
          { 
            response: "Our AI assistant is temporarily busy serving other visitors. Please try again in a moment, or contact us directly at +91 9431201060 or admissions@shemfordpatna.com. We're here to help!" 
          },
          { status: 200 }
        );
      }

      // 401 - Authentication failed (bad API key)
      if (error.status === 401) {
        console.error("CRITICAL: OpenAI authentication failed - API key invalid or expired");
        return NextResponse.json(
          { 
            response: "We're experiencing a configuration issue. Please contact the school directly: +91 9431201060. We apologize for the inconvenience." 
          },
          { status: 200 }
        );
      }

      // 500 - OpenAI server error
      if (error.status === 500) {
        console.error("OpenAI server error");
        return NextResponse.json(
          { 
            response: "OpenAI servers are temporarily unavailable. Please try again in a moment or contact us at +91 9431201060." 
          },
          { status: 200 }
        );
      }

      // 403 - Access denied / Account issue
      if (error.status === 403) {
        console.error("CRITICAL: Access denied - Check account status and API key permissions");
        return NextResponse.json(
          { 
            response: "We're unable to access our AI service right now. Please contact the school: +91 9431201060" 
          },
          { status: 200 }
        );
      }
    }

    // Check for specific error codes
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      console.error("Network error - Cannot reach OpenAI servers");
      return NextResponse.json(
        { 
          response: "Connection error. Please check your internet or try again in a moment. Contact: +91 9431201060" 
        },
        { status: 200 }
      );
    }

    // Generic fallback for any other error
    console.error("Unknown error type:", error.type || typeof error);
    return NextResponse.json(
      { 
        response: "I'm having trouble responding right now. Please call the school at +91 9431201060 for immediate assistance." 
      },
      { status: 200 }
    );
  }
}
