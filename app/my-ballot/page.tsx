import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Mock Data
const ballotMeasures = [
  { id: 1, type: "Proposition", number: "12", title: "Public School Funding", description: "Authorizes $500M in bonds for public school renovations and technology upgrades.", stance: null },
  { id: 2, type: "Measure", number: "A", title: "City Transit Expansion", description: "Increases sales tax by 0.5% to fund light rail expansion and electric bus fleet.", stance: "yes" },
];

export default function MyBallotPage() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />
      
      <section className="px-8 mt-12 max-w-7xl mx-auto w-full flex-grow mb-16">
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-teal mb-2 block">YOUR VOTE</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">My Personalized Ballot</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Review the specific candidates and measures that will appear on your ballot. Make your choices here to bring as a guide to the polls.
          </p>
        </div>

        {/* Address configuration */}
        <div className="bg-brand-navy border border-brand-teal/30 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 mb-12 shadow-[0_0_30px_rgba(79,209,197,0.1)]">
          <div>
            <h3 className="font-bold text-lg mb-1">Showing ballot for:</h3>
            <p className="text-gray-400 text-sm">District 4, 123 Main St, Civic Center</p>
          </div>
          <button className="px-6 py-2 border border-brand-teal text-brand-teal rounded-full font-bold text-sm hover:bg-brand-teal hover:text-brand-dark transition-colors">
            Update Address
          </button>
        </div>

        {/* Ballot Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Measures */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold border-b border-white/10 pb-4">State & Local Measures</h2>
            
            <div className="space-y-6">
              {ballotMeasures.map(measure => (
                <div key={measure.id} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-teal opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-brand-teal text-[10px] font-bold uppercase tracking-widest">{measure.type} {measure.number}</span>
                      <h3 className="text-xl font-bold mt-1">{measure.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {measure.description}
                  </p>
                  
                  <div className="flex gap-4">
                    <button className={`flex-1 py-3 rounded-xl font-bold border transition-all ${measure.stance === 'yes' ? 'bg-brand-teal text-brand-dark border-brand-teal shadow-[0_0_15px_rgba(79,209,197,0.3)]' : 'border-white/10 text-gray-400 hover:border-brand-teal/50 hover:text-white'}`}>
                      Vote YES
                    </button>
                    <button className={`flex-1 py-3 rounded-xl font-bold border transition-all ${measure.stance === 'no' ? 'bg-red-500 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10 text-gray-400 hover:border-red-500/50 hover:text-white'}`}>
                      Vote NO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Candidates Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Candidates</h2>
            
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <p className="text-sm text-gray-400 mb-4">You haven't saved any candidate choices yet.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors text-white">
                Browse Candidates
              </button>
            </div>
            
            <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-6 mt-6">
              <h3 className="font-bold text-brand-teal mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                Save & Print
              </h3>
              <p className="text-sm text-gray-400 mb-4">Print your personalized ballot to bring with you to the voting booth. Note: Mobile phones are not permitted in some polling locations.</p>
              <button className="w-full py-3 bg-brand-teal text-brand-dark rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:scale-105 transition-transform">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
