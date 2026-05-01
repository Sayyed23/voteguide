import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />
      
      <section className="px-8 mt-12 mb-24 max-w-4xl mx-auto w-full flex-grow">
        <Link href="/registration" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-teal text-sm font-bold uppercase tracking-widest mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Registration Info
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Official Voter Application</h1>
          <p className="text-gray-400 text-lg">
            Complete the secure form below to register to vote or update your existing registration. It takes less than 5 minutes.
          </p>
        </div>

        <RegistrationForm />
      </section>

      <Footer />
    </main>
  );
}
