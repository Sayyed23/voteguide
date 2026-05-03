/**
 * @fileoverview Home page for the VoteGuide application.
 * Renders the complete election timeline view with Hero banner,
 * interactive stage navigation, stage content, sidebar, checklist,
 * and FAQ sections.
 */

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Timeline } from "@/components/ui/Timeline";
import { StageContent } from "@/components/layout/StageContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { Checklist } from "@/components/ui/Checklist";
import { FAQ } from "@/components/ui/FAQ";
import { Footer } from "@/components/layout/Footer";
import { stagesData } from "@/data/timelineData";

/**
 * Home page component. Displays the Registration stage (Stage 2)
 * as the default landing view for the election timeline.
 */
export default function Home() {
  const stageData = stagesData[1]; // Registration stage
  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden" role="main" aria-label="VoteGuide Home">
      <Navbar />
      <Hero activeStageId={stageData.id} />
      <Timeline activeStageId={stageData.id} />
      
      {/* Content Grid */}
      <section className="px-8 mt-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch" aria-label="Stage details and resources">
        <div className="lg:col-span-2">
          <StageContent data={stageData} />
        </div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </section>
      
      <Checklist items={stageData.checklist} stageId={stageData.id} />
      <FAQ faqs={stageData.faqs} />
      <Footer />
    </main>
  );
}
