import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    // Input Validation
    if (!message || typeof message !== 'string') {
      return Response.json({ error: "Invalid message format." }, { status: 400 });
    }

    if (message.length > 500) {
      return Response.json({ error: "Message too long. Please keep it under 500 characters." }, { status: 400 });
    }

    const sanitizedMessage = message.trim();

    // The Gemini 1.5 model is versatile and works well for most text tasks
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Set the context for the AI
    const prompt = `
      You are a helpful, neutral, and highly knowledgeable election assistant for the VoteGuide application. 
      Your goal is to help citizens understand the voting process, requirements, and logistics.
      Answer the user's question clearly and concisely.
      If the user asks something completely unrelated to voting or elections, politely steer them back to election topics.

      User Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return Response.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      { error: "Failed to process your request." },
      { status: 500 }
    );
  }
}
