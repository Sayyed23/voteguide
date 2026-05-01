import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { StageContent } from "@/components/StageContent";
import { Sidebar } from "@/components/Sidebar";
import { Checklist } from "@/components/Checklist";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { stagesData } from "@/data/timelineData";
import { notFound } from "next/navigation";

export default function StagePage({ params }: { params: { slug: string } }) {
  const stageData = stagesData.find(s => s.slug === params.slug);

  if (!stageData) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />
      <Hero activeStageId={stageData.id} />
      <Timeline activeStageId={stageData.id} />
      
      {/* Content Grid */}
      <section className="px-8 mt-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
        <div className="lg:col-span-2">
          <StageContent data={stageData} />
        </div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </section>
      
      {stageData.checklist && stageData.checklist.length > 0 && (
        <Checklist items={stageData.checklist} />
      )}
      
      {stageData.faqs && stageData.faqs.length > 0 && (
        <FAQ faqs={stageData.faqs} />
      )}
      
      <Footer />
    </main>
  );
}
