import React from 'react';
import Link from 'next/link';
import { stagesData } from '@/data/timelineData';

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface StageData {
  slug: string;
  stagePrefix: string;
  title: string;
  description: string;
  steps: Step[];
}

interface StageContentProps {
  data: StageData;
}

export const StageContent = ({ data }: StageContentProps) => {
  if (!data) return null;

  const currentIndex = stagesData.findIndex(s => s.slug === data.slug);
  const prevStage = currentIndex > 0 ? stagesData[currentIndex - 1] : stagesData[stagesData.length - 1];
  const nextStage = currentIndex < stagesData.length - 1 ? stagesData[currentIndex + 1] : stagesData[0];

  return (
    <div className="glass-card p-8 md:p-12 relative overflow-hidden group h-full flex flex-col">
      {/* Decorative gradient background pulse */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl group-hover:bg-brand-teal/10 transition-all duration-700" />
      
      <div className="relative z-10 flex-grow">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-teal mb-2 block">{data.stagePrefix}</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">{data.title}</h2>
        
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
          {data.description}
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Add to Checklist
          </button>
          <button className="btn-outline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Set Reminder
          </button>
        </div>
        
        {/* Process Steps */}
        <div className="space-y-8 mt-12 pt-12 border-t border-white/5">
          {data.steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              <span className="text-2xl font-bold text-gray-700 font-display">{step.num}</span>
              <div>
                <h4 className="text-xl font-bold mb-1">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-end gap-4 mt-12 relative z-10 pt-8">
        <Link href={`/stage/${prevStage.slug}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <Link href={`/stage/${nextStage.slug}`} className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-brand-dark hover:scale-105 transition-all shadow-[0_0_15px_rgba(79,209,197,0.4)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
