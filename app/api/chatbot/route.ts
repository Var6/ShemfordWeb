import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { formattedSchoolData } from "@/data/schoolData";

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
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Limit message history to last 10 messages to avoid token limits
    const recentMessages = messages.slice(-10);

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
      temperature: 0.2, // Lowered from 0.7 for more factual responses
    });

    const assistantMessage =
      response.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again or contact us at admissions@shemfordpatna.com";

    return NextResponse.json(
      { response: assistantMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chatbot API error:", error);

    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key" },
          { status: 500 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Failed to process your request. Please contact us at admissions@shemfordpatna.com or +91 9431201060",
      },
      { status: 500 }
    );
  }
}
