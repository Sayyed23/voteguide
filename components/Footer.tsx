import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display font-bold text-2xl tracking-tighter text-brand-teal">The Digital Curator</span>
          <p className="text-gray-500 text-xs">Empowering democratic participation through clarity.</p>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-500">
          <a href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-teal transition-colors">Methodology</a>
          <a href="#" className="hover:text-brand-teal transition-colors">Contact Support</a>
        </div>
        
        <div className="text-gray-600 text-[10px] tracking-tight">
          © 2024 THE DIGITAL CURATOR. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
