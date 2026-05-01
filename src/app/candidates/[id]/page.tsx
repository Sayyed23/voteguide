'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

// Same mock data as the parent page — in a real app this would come from a shared store or API
const candidates = [
  { id: 1, name: "Eleanor Sterling", role: "Mayor", party: "Independent", image: "/images/candidate_1.jpg", platform: "Infrastructure & Education", bio: "Eleanor Sterling has served as City Council President for two terms and is running on a platform of modernizing public infrastructure and expanding education funding. She has championed the city's green energy initiative and authored key legislation on affordable broadband access.", positions: ["Invest $200M in road and bridge repairs", "Expand public pre-K programs", "Create a city-wide broadband network", "Establish a community college scholarship fund"] },
  { id: 2, name: "Marcus Vance", role: "City Council", party: "Progressive", image: "/images/candidate_2.jpg", platform: "Affordable Housing", bio: "Marcus Vance is a community organizer and tenant advocate who has spent 15 years fighting for affordable housing in the city's fastest-growing neighborhoods. He founded the Community Land Trust Initiative and has worked with nonprofits to build over 500 affordable units.", positions: ["Cap rent increases at 3% annually", "Build 2,000 new affordable units by 2028", "Reform zoning to allow mixed-use development", "Expand renter assistance programs"] },
  { id: 3, name: "Sarah Chen", role: "District Attorney", party: "Democratic", image: "/images/candidate_3.jpg", platform: "Criminal Justice Reform", bio: "Sarah Chen is a former public defender who has spent her career advocating for the wrongly convicted. She has won landmark cases on evidence reform and built bipartisan support for restorative justice programs in neighboring counties.", positions: ["End cash bail for non-violent offenses", "Launch a conviction integrity unit", "Expand diversion programs for juveniles", "Increase transparency in prosecutorial decisions"] },
];

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = Number(params.id);
  const candidate = candidates.find(c => c.id === candidateId);

  if (!candidate) {
    return (
      <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
        <Navbar />
        <section className="flex-grow flex items-center justify-center px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-4">Candidate Not Found</h1>
            <p className="text-gray-400 mb-8">The candidate you're looking for doesn't exist or has been removed.</p>
            <Link href="/candidates" className="btn-primary">
              ← Back to All Candidates
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />

      <section className="px-8 mt-12 max-w-4xl mx-auto w-full flex-grow mb-16">
        {/* Back Link */}
        <Link href="/candidates" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-teal text-sm font-bold uppercase tracking-widest mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to All Candidates
        </Link>

        {/* Header */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 mb-8">
          <div className="h-48 bg-gradient-to-tr from-brand-navy to-brand-dark relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/10 to-transparent" />
            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
              <div>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">{candidate.party}</span>
                <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{candidate.name}</h1>
              </div>
              <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-brand-teal/10 px-3 py-1.5 rounded-full">{candidate.role}</span>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-teal mb-3">Platform Focus: {candidate.platform}</h2>
            <p className="text-gray-400 leading-relaxed">{candidate.bio}</p>
          </div>
        </div>

        {/* Key Positions */}
        <div className="bg-brand-navy border border-white/5 rounded-3xl p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Positions</h2>
          <div className="grid gap-4">
            {candidate.positions.map((position, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors">
                <div className="w-8 h-8 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal font-bold text-sm flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link href="/my-ballot" className="btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Add to My Ballot
          </Link>
          <Link href="/candidates" className="btn-outline">
            View Other Candidates
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
