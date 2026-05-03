/**
 * @fileoverview Polling locations page with Google Maps integration.
 * Renders an interactive map showing early voting centers, election day
 * polling places, and ballot drop boxes. Uses `@react-google-maps/api`
 * with custom dark-mode styling. Uses dynamic imports for performance.
 */

'use client';

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useJsApiLoader, Marker } from '@react-google-maps/api';

/**
 * Dynamically import GoogleMap to reduce initial bundle size.
 * Maps are heavy and not needed for initial paint.
 */
const GoogleMap = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.GoogleMap),
  { ssr: false, loading: () => <div className="text-brand-teal animate-pulse">Loading Map Engine...</div> }
);

/** Map container dimensions */
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
} as const;

/** Default center coordinates (New York City) */
const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
} as const;

/** Shape of a polling location entry */
interface PollLocation {
  /** Unique identifier */
  id: number;
  /** Display name */
  name: string;
  /** Type of location (Early Voting, Election Day, Drop Box) */
  type: string;
  /** Street address */
  address: string;
  /** Estimated wait time */
  waitTime: string;
  /** GPS coordinates */
  position: google.maps.LatLngLiteral;
}

/** Mock dataset — can be replaced with live API data */
const locations: readonly PollLocation[] = [
  { id: 1, name: "Downtown Library", type: "Early Voting", address: "123 Main St, Civic Center", waitTime: "15 mins", position: { lat: 40.7128, lng: -74.0060 } },
  { id: 2, name: "Community Center South", type: "Election Day", address: "456 Oak Avenue", waitTime: "5 mins", position: { lat: 40.7150, lng: -74.0100 } },
  { id: 3, name: "City Hall Drop Box", type: "Drop Box", address: "1 Municipal Plaza", waitTime: "None", position: { lat: 40.7100, lng: -74.0000 } },
] as const;

/** Custom dark-mode map styling to match brand aesthetic */
const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
];

/**
 * LocationsPage renders the polling location finder with an interactive
 * Google Map and sidebar list of nearby voting locations.
 */
export default function LocationsPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);

  /** Handle map instance load event */
  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, [center]);

  /** Center the map on a selected location */
  const handleLocationClick = useCallback((position: google.maps.LatLngLiteral) => {
    setCenter(position);
  }, []);

  /** Memoize marker rendering to prevent unnecessary re-calculatons */
  const renderedMarkers = useMemo(() => (
    locations.map((loc) => (
      <Marker 
        key={loc.id} 
        position={loc.position} 
        title={loc.name}
      />
    ))
  ), []);

  return (
    <main className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden" role="main" aria-label="Polling Locations">
      <Navbar />
      
      <section className="px-8 mt-12 max-w-7xl mx-auto w-full flex-grow flex flex-col lg:flex-row gap-12 mb-16" aria-label="Location finder">
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
              aria-label="Enter your ZIP code to find nearby polling locations"
              className="bg-transparent border-none outline-none text-white flex-grow px-2"
            />
            <button className="bg-brand-teal text-brand-dark px-4 py-2 rounded-xl font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:scale-105 transition-transform" type="button">
              Search
            </button>
          </div>

          {/* Results List */}
          <div className="space-y-4" role="list" aria-label="Nearby polling locations">
            {locations.map(loc => (
              <div 
                key={loc.id} 
                className="p-5 border border-white/5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => handleLocationClick(loc.position)}
                onKeyDown={(e) => e.key === 'Enter' && handleLocationClick(loc.position)}
                role="listitem"
                tabIndex={0}
                aria-label={`${loc.name} — ${loc.type}, ${loc.address}`}
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

          {/* Cross-links */}
          <div className="mt-8 space-y-3">
            <Link href="/registration" className="flex items-center justify-between p-4 bg-brand-teal/5 border border-brand-teal/20 rounded-xl hover:bg-brand-teal/10 transition-colors group">
              <span className="text-sm font-semibold text-gray-300 group-hover:text-brand-teal transition-colors">Not registered yet? Start here →</span>
            </Link>
            <Link href="/my-ballot" className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-brand-teal/30 transition-colors group">
              <span className="text-sm font-semibold text-gray-400 group-hover:text-brand-teal transition-colors">Review your personalized ballot →</span>
            </Link>
          </div>
        </div>

        {/* Google Map */}
        <div className="lg:w-2/3 min-h-[500px] glass-card rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/10 p-2">
           {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
              onLoad={onLoad}
              options={{
                 styles: darkMapStyles,
                 disableDefaultUI: true,
                 zoomControl: true,
              }}
            >
              {renderedMarkers}
            </GoogleMap>
        ) : (
          <div className="text-brand-teal animate-pulse" aria-label="Loading map">Loading Map...</div>
        )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
