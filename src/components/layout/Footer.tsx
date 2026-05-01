import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-display font-bold text-2xl tracking-tighter text-brand-teal hover:opacity-80 transition-opacity">
            The Digital Curator
          </Link>
          <p className="text-gray-500 text-xs">Empowering democratic participation through clarity.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">
          <Link href="/registration" className="hover:text-brand-teal transition-colors">Register to Vote</Link>
          <Link href="/candidates" className="hover:text-brand-teal transition-colors">Candidates</Link>
          <Link href="/locations" className="hover:text-brand-teal transition-colors">Polling Locations</Link>
          <Link href="/my-ballot" className="hover:text-brand-teal transition-colors">My Ballot</Link>
        </div>
        
        <div className="text-gray-600 text-[10px] tracking-tight">
          © 2024 THE DIGITAL CURATOR. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
