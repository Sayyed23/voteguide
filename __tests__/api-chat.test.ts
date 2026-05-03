/**
 * @fileoverview Unit tests for the /api/chat API route.
 * Tests input validation, sanitization, and error handling for the
 * Gemini AI chat endpoint.
 * @jest-environment node
 */

// Mock the Google Generative AI module before importing the route
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () => 'This is a test AI response about voting.',
        },
      }),
    }),
  })),
}))

import { POST } from '@/app/api/chat/route'

describe('Chat API Route', () => {
  it('returns 400 for missing message', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid message format.')
  })

  it('returns 400 for non-string message', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 12345 }),
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid message format.')
  })

  it('returns 400 for message over 500 characters', async () => {
    const longMessage = 'a'.repeat(501)
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: longMessage }),
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Message too long. Please keep it under 500 characters.')
  })

  it('returns 200 with valid message', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'How do I register to vote?' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.text).toBeTruthy()
  })

  it('accepts message at exactly 500 characters', async () => {
    const maxMessage = 'a'.repeat(500)
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: maxMessage }),
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
