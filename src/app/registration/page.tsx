import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />
      
      <section className="px-8 mt-12 max-w-7xl mx-auto w-full flex-grow mb-16">
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-teal mb-2 block">STAGE 02</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Registration Info</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Everything you need to know to ensure you are eligible to vote. Check your status, register for the first time, or update your information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Action Cards */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-brand-teal/50 transition-colors group">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Check Registration Status</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Not sure if you're registered? Have you moved recently? Verify your current voter registration status through the official portal.
            </p>
            <Link href="/stage/verification" className="text-brand-teal font-bold uppercase tracking-wider text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
              Verify Status <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-brand-teal/50 transition-colors group bg-gradient-to-br from-white/5 to-brand-teal/5">
            <div className="w-12 h-12 bg-brand-teal rounded-2xl flex items-center justify-center text-brand-dark mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(79,209,197,0.4)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Register to Vote</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              New voter? Register online in less than 5 minutes. You'll need your state ID or driver's license number.
            </p>
            <Link href="/registration/apply" className="inline-block text-center bg-brand-teal text-brand-dark px-6 py-3 rounded-full font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:scale-105 transition-transform">
              Start Application
            </Link>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="bg-brand-navy border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl" />
          
          <h2 className="text-3xl font-bold mb-8 relative z-10">What You Need to Register</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div>
              <h3 className="font-bold text-lg mb-2 text-white/90">1. Eligibility</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> U.S. Citizen
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> 18 years old on or before Election Day
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> Resident of your state
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2 text-white/90">2. Identification</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> State Driver's License OR
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> State Non-Driver ID OR
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> Last 4 digits of SSN
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2 text-white/90">3. Deadlines</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> <strong className="text-white">Online:</strong> 15 days before
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> <strong className="text-white">By Mail:</strong> Postmarked 15 days before
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-teal">•</span> <strong className="text-white">In Person:</strong> Election Day (Same-Day Reg)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
