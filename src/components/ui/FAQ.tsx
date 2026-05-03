/**
 * @fileoverview FAQ accordion component.
 * Renders a list of frequently asked questions with expand/collapse
 * behavior. Uses useCallback for stable toggle handlers.
 */

'use client';
import React, { useState, useCallback } from 'react';

/** Shape of a single FAQ entry */
interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}

/** Props for the FAQ component */
interface FAQProps {
  /** Array of FAQ items to render */
  faqs: FAQItem[];
}

/**
 * FAQ component renders an accessible accordion of election-related
 * questions. Only one answer is expanded at a time. Implements
 * aria-expanded and aria-controls for screen reader support.
 */
export const FAQ = React.memo(function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Toggle a FAQ item open/closed by index */
  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="px-8 mt-24 mb-32 max-w-7xl mx-auto w-full" aria-label="Frequently Asked Questions">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-card overflow-hidden">
            <button 
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="font-bold text-lg">{faq.question}</span>
              <svg 
                className={`w-6 h-6 text-brand-teal transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 pb-0'}`}
            >
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
