import React from 'react';
import Link from 'next/link';
import { stagesData } from '@/data/timelineData';

interface TimelineProps {
  activeStageId?: number;
}

export const Timeline = ({ activeStageId = 2 }: TimelineProps) => {
  return (
    <div className="px-8 mt-12 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center relative overflow-x-auto pb-4 gap-4 no-scrollbar">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -translate-y-1/2 z-0" />
        
        {stagesData.map((step) => {
          const isActive = step.id === activeStageId;
          return (
            <Link key={step.id} href={`/stage/${step.slug}`} className="relative z-10 flex flex-col items-center gap-3 min-w-[100px] flex-grow group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer
                ${isActive 
                  ? 'bg-brand-teal text-brand-dark ring-4 ring-brand-teal/20 scale-110 shadow-[0_0_20px_rgba(79,209,197,0.3)]' 
                  : 'bg-brand-navy border border-gray-800 text-gray-500 group-hover:border-brand-teal/50 group-hover:text-brand-teal/80'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                </svg>
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors
                ${isActive ? 'text-brand-teal' : 'text-gray-500 group-hover:text-brand-teal/80'}
              `}>
                {step.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
