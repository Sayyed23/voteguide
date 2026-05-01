'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Timeline' },
  { href: '/candidates', label: 'Candidates' },
  { href: '/locations', label: 'Locations' },
  { href: '/my-ballot', label: 'My Ballot' },
  { href: '/registration', label: 'Registration' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full flex-wrap gap-4 relative">
      <Link href="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-full border border-brand-teal flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-dark transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="font-display font-bold text-xl tracking-tighter">The Editorial Chronology</span>
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-widest text-gray-400">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-brand-teal transition-colors ${
              pathname === link.href ? 'text-brand-teal' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-gray-400">
        <button className="hover:text-white transition-colors" aria-label="Settings" title="Settings">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>
        <button className="flex items-center gap-2 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full hover:border-brand-teal" aria-label="Sign In" title="Login">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Sign In</span>
        </button>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          title="Menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden w-full mt-2 bg-brand-navy/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-semibold uppercase tracking-widest py-2 border-b border-white/5 last:border-none transition-colors ${
                pathname === link.href ? 'text-brand-teal' : 'text-gray-400 hover:text-brand-teal'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
