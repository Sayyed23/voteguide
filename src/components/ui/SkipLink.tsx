/**
 * @fileoverview Skip navigation link for keyboard accessibility.
 * Provides a skip-to-main-content link that becomes visible on focus,
 * allowing keyboard users to bypass repetitive navigation elements.
 */

import React from 'react';

/**
 * SkipLink component renders a visually-hidden anchor that becomes visible
 * when focused via keyboard navigation. This is a critical accessibility
 * feature (WCAG 2.1 Level A, Success Criterion 2.4.1).
 */
export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-teal focus:text-brand-dark focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  );
};
