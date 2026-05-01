'use client';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock Data
const candidates = [
  { id: 1, name: "Eleanor Sterling", role: "Mayor", party: "Independent", image: "/images/candidate_1.jpg", platform: "Infrastructure & Education" },
  { id: 2, name: "Marcus Vance", role: "City Council", party: "Progressive", image: "/images/candidate_2.jpg", platform: "Affordable Housing" },
  { id: 3, name: "Sarah Chen", role: "District Attorney", party: "Democratic", image: "/images/candidate_3.jpg", platform: "Criminal Justice Reform" },
];

export default function CandidatesPage() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check localStorage for registration data on mount
    const data = localStorage.getItem('voterRegistration');
    if (data) {
      setUserData(JSON.parse(data));
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }, []);

  // Loading state while checking localStorage to prevent hydration mismatch
  if (isRegistered === null) {
    return (
      <main className="min-h-screen flex flex-col bg-brand-dark">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
           <div className="w-10 h-10 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />
      
      <section className="px-8 mt-12 max-w-7xl mx-auto w-full flex-grow">
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-teal mb-2 block">DIRECTORY</span>
          
          {isRegistered && userData ? (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Candidates for {userData.city}, {userData.state}</h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Based on your registration address, here are the candidates running for local and state office on your specific ballot.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Candidate Profiles</h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Explore the candidates running for local and state office. Review their platforms, voting histories, and key endorsements.
              </p>
            </>
          )}
        </div>

        {!isRegistered ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-white/10 relative overflow-hidden mb-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-brand-navy rounded-2xl flex items-center justify-center text-gray-400 mb-6 border border-white/10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Registration Required</h2>
              <p className="text-gray-400 text-lg max-w-md mb-8">
                To view the exact candidates and measures that will appear on your ballot, please complete your voter registration profile first.
              </p>
              <Link href="/registration/apply" className="btn-primary">
                Register to Unlock Ballot
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Filters Mock */}
            <div className="flex flex-wrap gap-4 mb-10 pb-6 border-b border-white/10">
              <button className="px-4 py-2 rounded-full bg-brand-teal text-brand-dark font-bold text-sm">Your Ballot</button>
              <button className="px-4 py-2 rounded-full border border-white/20 text-gray-300 font-bold text-sm hover:border-brand-teal transition-colors">Mayoral</button>
              <button className="px-4 py-2 rounded-full border border-white/20 text-gray-300 font-bold text-sm hover:border-brand-teal transition-colors">City Council</button>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-brand-teal/50 transition-all">
                  <div className="h-48 bg-gray-800 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy to-brand-dark opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider">{candidate.party}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">{candidate.role}</span>
                    <h3 className="text-2xl font-bold mt-1 mb-2 group-hover:text-brand-teal transition-colors">{candidate.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">Focus: {candidate.platform}</p>
                    <Link href={`/candidates/${candidate.id}`} className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-white">
                      View Profile
                      <svg className="w-4 h-4 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      
      <Footer />
    </main>
  );
}
