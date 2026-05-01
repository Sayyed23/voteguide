import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full flex-wrap gap-4">
      <Link href="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-full border border-brand-teal flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-dark transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="font-display font-bold text-xl tracking-tighter">The Editorial Chronology</span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-brand-teal transition-colors">Timeline</Link>
        <Link href="/candidates" className="hover:text-brand-teal transition-colors">Candidates</Link>
        <Link href="/locations" className="hover:text-brand-teal transition-colors">Locations</Link>
        <Link href="/my-ballot" className="hover:text-brand-teal transition-colors">My Ballot</Link>
        <Link href="/registration" className="hover:text-brand-teal transition-colors">Registration</Link>
      </div>
      
      <div className="flex items-center gap-4 text-gray-400">
        <button className="hover:text-white transition-colors" title="Settings">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>
        <button className="flex items-center gap-2 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full hover:border-brand-teal" title="Login">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">Sign In</span>
        </button>
      </div>
    </nav>
  );
};
