import React from 'react';
import { stagesData } from '@/data/timelineData';

interface HeroProps {
  activeStageId?: number;
}

export const Hero = ({ activeStageId = 2 }: HeroProps) => {
  const currentStage = stagesData.find(s => s.id === activeStageId) || stagesData[1];
  const progressPercentage = ((activeStageId - 1) / (stagesData.length - 1)) * 100;

  return (
    <section className="px-8 mt-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            See how the election process works step by step
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-lg">
            A curated roadmap through the democratic architecture of your district.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="bg-brand-teal/10 border border-brand-teal/20 px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400">YOUR STAGE: {currentStage.label}</span>
          </div>
          <div className="text-[10px] font-bold tracking-tighter uppercase text-gray-500">
            STEP {activeStageId} OF {stagesData.length}
          </div>
        </div>
      </div>
      
      {/* Progress Bar Container */}
      <div className="mt-12 h-1 bg-gray-800 rounded-full w-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand-teal to-cyan-400 transition-all duration-1000 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </section>
  );
};
