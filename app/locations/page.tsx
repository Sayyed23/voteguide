import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Mock Data
const locations = [
  { id: 1, name: "Downtown Library", type: "Early Voting", address: "123 Main St, Civic Center", waitTime: "15 mins" },
  { id: 2, name: "Community Center South", type: "Election Day", address: "456 Oak Avenue", waitTime: "5 mins" },
  { id: 3, name: "City Hall Drop Box", type: "Drop Box", address: "1 Municipal Plaza", waitTime: "None" },
];

export default function LocationsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
      <Navbar />
      
      <section className="px-8 mt-12 max-w-7xl mx-auto w-full flex-grow flex flex-col lg:flex-row gap-12 mb-16">
        <div className="lg:w-1/3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-teal mb-2 block">LOGISTICS</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Polling Locations</h1>
          <p className="text-gray-400 text-lg mb-8">
            Find the nearest early voting centers, election day polling places, and official ballot drop boxes.
          </p>

          {/* Search Box */}
          <div className="bg-brand-navy border border-white/10 rounded-2xl p-4 flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder="Enter your ZIP code..." 
              className="bg-transparent border-none outline-none text-white flex-grow px-2"
            />
            <button className="bg-brand-teal text-brand-dark px-4 py-2 rounded-xl font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:scale-105 transition-transform">
              Search
            </button>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {locations.map(loc => (
              <div key={loc.id} className="p-5 border border-white/5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal px-2 py-1 bg-brand-teal/10 rounded">
                    {loc.type}
                  </span>
                  <span className="text-xs text-gray-400">Wait: {loc.waitTime}</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-brand-teal transition-colors">{loc.name}</h3>
                <p className="text-gray-400 text-sm">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Mock Widget */}
        <div className="lg:w-2/3 min-h-[500px] glass-card rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/10">
          <div className="absolute inset-0 bg-[#0a0f1c] opacity-80" />
          
          {/* Mock Map grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Mock Map Markers */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-brand-teal rounded-full shadow-[0_0_20px_rgba(79,209,197,0.8)] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-brand-teal/50 rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

          <div className="relative z-10 text-center">
            <svg className="w-12 h-12 text-brand-teal mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-gray-400 font-medium tracking-wide">Interactive Map Interface</p>
            <p className="text-gray-600 text-sm mt-1">Mock representation for development</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
