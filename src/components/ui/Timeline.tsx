/**
 * @fileoverview Interactive timeline navigation component.
 * Renders the 7-stage election pipeline as clickable icons with
 * active state highlighting. Memoized to prevent unnecessary re-renders.
 */

import React, { useMemo } from 'react';
import Link from 'next/link';
import { stagesData } from '@/data/timelineData';

/** Props for the Timeline component */
interface TimelineProps {
  /** ID of the currently active stage (1-7). Defaults to 2. */
  activeStageId?: number;
}

/**
 * Timeline renders a horizontal navigation bar representing the
 * 7 election stages. The active stage is visually highlighted with
 * a glow effect and scale transform.
 */
export const Timeline = React.memo(function Timeline({ activeStageId = 2 }: TimelineProps) {
  const stages = useMemo(() => stagesData, []);

  return (
    <nav className="px-8 mt-12 max-w-7xl mx-auto w-full" aria-label="Election stage navigation">
      <div className="flex justify-between items-center relative overflow-x-auto pb-4 gap-4 no-scrollbar">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -translate-y-1/2 z-0" aria-hidden="true" />
        
        {stages.map((step) => {
          const isActive = step.id === activeStageId;
          return (
            <Link
              key={step.id}
              href={`/stage/${step.slug}`}
              className="relative z-10 flex flex-col items-center gap-3 min-w-[100px] flex-grow group"
              aria-current={isActive ? 'step' : undefined}
              aria-label={`Stage ${step.id}: ${step.label}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer
                ${isActive 
                  ? 'bg-brand-teal text-brand-dark ring-4 ring-brand-teal/20 scale-110 shadow-[0_0_20px_rgba(79,209,197,0.3)]' 
                  : 'bg-brand-navy border border-gray-800 text-gray-500 group-hover:border-brand-teal/50 group-hover:text-brand-teal/80'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    </nav>
  );
});
