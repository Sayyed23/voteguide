/**
 * @fileoverview API route for the AI Election Assistant chatbot.
 * Handles POST requests with user messages, validates input, applies
 * rate limiting, sanitizes content, and forwards to Google Gemini 1.5 Flash
 * for context-aware election-related responses.
 *
 * @security
 * - Input type validation (string check)
 * - Message length limit (500 characters)
 * - HTML/script tag sanitization
 * - In-memory rate limiting (10 requests/minute per IP)
 * - System prompt constrains AI to election topics only
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Simple in-memory rate limiter.
 * Tracks request counts per IP within a rolling time window.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute window

/**
 * Checks whether a given IP has exceeded the rate limit.
 * @param ip - The client IP address
 * @returns true if rate limit is exceeded
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/**
 * Sanitizes user input by stripping HTML tags and trimming whitespace.
 * Prevents script injection and ensures clean text for the AI model.
 * @param input - Raw user input string
 * @returns Sanitized string
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[<>]/g, '')    // Remove any remaining angle brackets
    .trim();
}

/**
 * POST handler for the /api/chat endpoint.
 * Accepts a JSON body with a `message` field and returns an AI-generated
 * response scoped to election and voting topics.
 *
 * @param req - The incoming HTTP request
 * @returns JSON response with `text` field or `error` field
 */
export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(clientIp)) {
      return Response.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message } = body;

    // Input Validation: type check
    if (!message || typeof message !== 'string') {
      return Response.json({ error: "Invalid message format." }, { status: 400 });
    }

    // Input Validation: length limit
    if (message.length > 500) {
      return Response.json({ error: "Message too long. Please keep it under 500 characters." }, { status: 400 });
    }

    // Sanitize user input
    const sanitizedMessage = sanitizeInput(message);

    if (sanitizedMessage.length === 0) {
      return Response.json({ error: "Message cannot be empty after sanitization." }, { status: 400 });
    }

    // Initialize the Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // System prompt constrains AI to election/voting context
    const prompt = `
      You are a helpful, neutral, and highly knowledgeable election assistant for the VoteGuide application. 
      Your goal is to help citizens understand the voting process, requirements, and logistics.
      Answer the user's question clearly and concisely.
      If the user asks something completely unrelated to voting or elections, politely steer them back to election topics.
      Do not provide any personal opinions on candidates or parties.

      User Question: ${sanitizedMessage}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return Response.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
