'use client';

import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
};

const defaultCenter = {
  lat: 40.7128, // Default to New York, or somewhere relevant
  lng: -74.0060
};

// Mock Data for now, we can update this to fetch real data later if we want
const locations = [
  { id: 1, name: "Downtown Library", type: "Early Voting", address: "123 Main St, Civic Center", waitTime: "15 mins", position: { lat: 40.7128, lng: -74.0060 } },
  { id: 2, name: "Community Center South", type: "Election Day", address: "456 Oak Avenue", waitTime: "5 mins", position: { lat: 40.7150, lng: -74.0100 } },
  { id: 3, name: "City Hall Drop Box", type: "Drop Box", address: "1 Municipal Plaza", waitTime: "None", position: { lat: 40.7100, lng: -74.0000 } },
];

export default function LocationsPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use environment variable
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

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
              <div 
                key={loc.id} 
                className="p-5 border border-white/5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => setCenter(loc.position)} // Center map on click
              >
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

        {/* Real Google Map Integration */}
        <div className="lg:w-2/3 min-h-[500px] glass-card rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/10 p-2">
           {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                 styles: [
                  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  // Add more custom dark mode styles as needed to match the brand
                 ],
                 disableDefaultUI: true, // cleaner look
                 zoomControl: true,
              }}
            >
              { /* Add markers for our locations */ }
              {locations.map((loc) => (
                <Marker 
                  key={loc.id} 
                  position={loc.position} 
                  title={loc.name}
                  // We could add custom SVG icons here for different types!
                />
              ))}
              
            </GoogleMap>
        ) : (
          <div className="text-brand-teal animate-pulse">Loading Map...</div>
        )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
