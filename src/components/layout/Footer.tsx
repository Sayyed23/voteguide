/**
 * @fileoverview Application footer with brand, navigation links,
 * and copyright. Memoized as a static presentational component.
 */

import React from 'react';
import Link from 'next/link';

/** Navigation links displayed in the footer */
const footerLinks = [
  { href: 'registration', label: 'Register to Vote' },
  { href: 'candidates', label: 'Candidates' },
  { href: 'locations', label: 'Polling Locations' },
  { href: 'my-ballot', label: 'My Ballot' },
] as const;

/**
 * Footer renders the site-wide bottom navigation bar with brand identity,
 * quick links, and legal copyright notice.
 */
export const Footer = React.memo(function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-8 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-display font-bold text-2xl tracking-tighter text-brand-teal hover:opacity-80 transition-opacity">
            The Digital Curator
          </Link>
          <p className="text-gray-500 text-xs">Empowering democratic participation through clarity.</p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-bold tracking-widest uppercase text-gray-500" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-teal transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="text-gray-600 text-[10px] tracking-tight">
          © 2024 THE DIGITAL CURATOR. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
});
