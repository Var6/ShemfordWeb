import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant for Shemford Futuristic School, a premier educational institution located in Jaganpur, Patna, Bihar, India.

Your knowledge about the school:
- School Name: Shemford Futuristic School
- Location: Jaganpur, Patna, Bihar, India
- Type: Modern, futuristic learning environment
- Curriculum: CBSE (Central Board of Secondary Education)
- Focus Areas: Academic excellence, holistic development, technology integration
- Facilities: Modern classrooms, laboratories, sports facilities, computer labs, library, cafeteria
- Programme: Pre-Primary to Class 12
- Contact: Visit our website or call us for details
- Admission: Open for various classes throughout the year

You are helpful, friendly, and professional. You:
1. Answer questions about the school's programs, admissions, and facilities
2. Provide information about school timings, holidays, and events
3. Guide parents and students through the admission process
4. Share information about school achievements and success stories
5. Politely redirect technical queries to contact us directly
6. Always encourage visitors to contact the school for detailed information

Keep responses concise and friendly. If you don't have specific information, suggest contacting the school directly.`;

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
      temperature: 0.7,
    });

    const assistantMessage =
      response.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

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
          "Failed to process your request. Please try again or contact us.",
      },
      { status: 500 }
    );
  }
}
