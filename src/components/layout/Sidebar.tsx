import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Why It Matters */}
      <div className="bg-brand-navy border border-white/5 rounded-2xl p-6">
        <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3">Why It Matters</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Registration is the cornerstone of accountability. Without it, your voice cannot be officially recorded. It prevents fraud and ensures that the "one person, one vote" principle is upheld.
        </p>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">CIVIC DUTY</span>
          <div className="w-12 h-1 bg-brand-teal rounded-full" />
        </div>
      </div>
      
      {/* Common Pitfalls */}
      <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">COMMON PITFALLS</span>
        </div>
        <ul className="space-y-3">
          <li className="flex gap-3 text-xs text-gray-400 group">
            <span className="text-red-500 group-hover:scale-125 transition-transform">•</span>
            Using an expired ID document.
          </li>
          <li className="flex gap-3 text-xs text-gray-400 group">
            <span className="text-red-500 group-hover:scale-125 transition-transform">•</span>
            Incorrectly typing residential ZIP codes.
          </li>
        </ul>
      </div>
      
      {/* Quick Links */}
      <div className="bg-brand-navy border border-white/5 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <div className="flex flex-col gap-3">
          <Link href="/candidates" className="flex items-center justify-between group">
            <span className="text-sm font-semibold text-gray-400 group-hover:text-brand-teal transition-colors">Candidate Profiles</span>
            <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/locations" className="flex items-center justify-between group">
            <span className="text-sm font-semibold text-gray-400 group-hover:text-brand-teal transition-colors">Find Polling Locations</span>
            <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/my-ballot" className="flex items-center justify-between group">
            <span className="text-sm font-semibold text-gray-400 group-hover:text-brand-teal transition-colors">My Personalized Ballot</span>
            <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/registration" className="flex items-center justify-between group">
            <span className="text-sm font-semibold text-gray-400 group-hover:text-brand-teal transition-colors">Registration Info</span>
            <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
      
      {/* Promo Card */}
      <Link href="/registration" className="relative rounded-2xl overflow-hidden aspect-[4/5] group block cursor-pointer">
        <Image 
          src="/images/voting_methods.png" 
          alt="Voting Methods" 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-xl font-bold mb-2">Learn more about Voting Methods</h3>
          <p className="text-gray-300 text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Discover the difference between mail-in, early voting, and day-of polling.</p>
          <div className="flex items-center gap-2 text-brand-teal text-[10px] font-bold tracking-widest uppercase">
            EXPLORE MODULE
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};
