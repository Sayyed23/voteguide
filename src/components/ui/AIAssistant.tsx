/**
 * @fileoverview AI Election Assistant chatbot widget.
 * Renders a floating action button that opens a chat window powered
 * by the Google Gemini 1.5 Flash API via `/api/chat`. Uses useCallback
 * for stable event handlers and memoized message rendering.
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

/** Shape of a single chat message */
interface ChatMessage {
  /** Who sent the message */
  role: 'user' | 'ai';
  /** Message content text */
  text: string;
}

/** Initial greeting shown when the chat opens */
const INITIAL_MESSAGE: ChatMessage = {
  role: 'ai',
  text: 'Hi! I am the VoteGuide Assistant. How can I help you prepare for the election today?',
};

/**
 * AIAssistant component provides a floating chatbot widget.
 * It manages its own open/close state, message history, loading state,
 * and auto-scrolls to the latest message.
 */
export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /** Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /** Open the chat panel */
  const handleOpen = useCallback(() => setIsOpen(true), []);

  /** Close the chat panel */
  const handleClose = useCallback(() => setIsOpen(false), []);

  /** Handle input field changes */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  /**
   * Send the current message to the /api/chat endpoint.
   * Appends the user message immediately, then streams the AI response.
   */
  const sendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: data.error || 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error. Please check your connection.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 p-4 bg-brand-teal text-brand-dark rounded-full shadow-[0_0_20px_rgba(79,209,197,0.4)] hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 glass-card rounded-2xl border border-white/10 shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
        role="dialog"
        aria-label="Election Assistant Chat"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" aria-hidden="true" />
            <h3 className="font-bold text-white">Election Assistant</h3>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close Election Assistant">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
          {messages.map((msg, i) => (
            <div key={i} className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'ai' ? 'bg-white/10 text-gray-200 self-start rounded-tl-sm' : 'bg-brand-teal text-brand-dark self-end rounded-tr-sm font-medium'}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white/10 text-gray-400 self-start rounded-2xl rounded-tl-sm p-3 text-sm flex gap-1 items-center" aria-label="Loading response">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="p-3 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about voting..."
            aria-label="Ask about voting"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="p-2 bg-brand-teal text-brand-dark rounded-xl hover:bg-brand-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
    </>
  );
};
