import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Timeline } from "@/components/ui/Timeline";
import { StageContent } from "@/components/layout/StageContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { Checklist } from "@/components/ui/Checklist";
import { FAQ } from "@/components/ui/FAQ";
import { Footer } from "@/components/layout/Footer";
import { stagesData } from "@/data/timelineData";
import { notFound } from "next/navigation";

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stageData = stagesData.find(s => s.slug === slug);

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
        <Checklist items={stageData.checklist} stageId={stageData.id} />
      )}
      
      {stageData.faqs && stageData.faqs.length > 0 && (
        <FAQ faqs={stageData.faqs} />
      )}
      
      <Footer />
    </main>
  );
}
