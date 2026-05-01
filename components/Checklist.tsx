import React from 'react';

interface ChecklistItem {
  id: number;
  label: string;
  checked: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
}

export const Checklist = ({ items }: ChecklistProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="px-8 mt-24 max-w-7xl mx-auto w-full">
      <div className="glass-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
          <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-extrabold">Your Checklist</h2>
        </div>
        
        <div className="grid gap-4">
          {items.map(item => (
            <label key={item.id} className="flex items-center gap-4 p-5 bg-brand-navy border border-white/5 rounded-xl cursor-pointer hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-all group">
              <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 rounded border-white/10 bg-transparent text-brand-teal focus:ring-brand-teal/50" />
              <span className="text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
