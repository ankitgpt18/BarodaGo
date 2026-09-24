import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Issue } from '../types';
import { useCivicData } from '../context/CivicDataContext';
import { MapPin, Navigation, ThumbsUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { CATEGORY_DETAILS } from '../data/mockData';
import { sound } from '../utils/sound';

interface InteractiveMapProps {
  onSelectIssue: (issue: Issue) => void;
}

// Custom Leaflet DivIcon generator
const createCustomIcon = (status: string, urgency: string, category: string) => {
  let bgColor = '#3b82f6';
  let ringColor = 'rgba(59, 130, 246, 0.4)';

  if (status === 'resolved') {
    bgColor = '#10b981';
    ringColor = 'rgba(16, 185, 129, 0.4)';
  } else if (urgency === 'hazard') {
    bgColor = '#ef4444';
    ringColor = 'rgba(239, 68, 68, 0.5)';
  } else if (status === 'in_progress') {
    bgColor = '#f59e0b';
    ringColor = 'rgba(245, 158, 11, 0.4)';
  }

  const categoryColor = CATEGORY_DETAILS[category]?.color || '#ffffff';

  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background-color: ${ringColor}; animation: pulse 2s infinite;"></div>
      <div style="position: relative; width: 26px; height: 26px; border-radius: 9999px; background-color: #0b0f17; border: 2px solid ${bgColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
        <div style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${categoryColor};"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-civic-pin',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectIssue }) => {
  const { filteredIssues, selectedWard, setSelectedWard, wards, toggleUpvote } = useCivicData();
  const [mapCenter] = useState<[number, number]>([22.3072, 73.1812]); // Vadodara center

  const hotspots = [
    { name: 'Alkapuri / RC Dutt Rd', coords: [22.3105, 73.1704] },
    { name: 'Sayajigunj / Station', coords: [22.3114, 73.1895] },
    { name: 'Sursagar Lake / Mandvi', coords: [22.3023, 73.204] },
    { name: 'Akota / Dandia Bazar', coords: [22.2965, 73.167] },
    { name: 'Gotri Medical Road', coords: [22.3188, 73.1432] },
    { name: 'Karelibaug', coords: [22.3245, 73.2045] }
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Top Map Filter and Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-[#0F141F] p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-950/80 border border-sky-800/60 text-sky-400">
            <Navigation className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Vadodara Real-time Civic GIS Map
            </h2>
            <p className="text-xs text-neutral-400">
              Live geocoded reports plotted across municipal boundaries
            </p>
          </div>
        </div>

        {/* Hotspot quick jumps */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-[11px] font-mono text-neutral-400 whitespace-nowrap">
            Focus zone:
          </span>
          {hotspots.map((h) => (
            <button
              key={h.name}
              onClick={() => {
                sound.playClick();
                setSelectedWard(h.name.split(' ')[0]);
              }}
              className="whitespace-nowrap rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 text-xs text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Viewport Container */}
      <div className="relative h-[550px] w-full overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          {/* CartoDB Dark Matter tiles (clean, high contrast, zero AI slop, developer-grade) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {filteredIssues.map((issue) => {
            const icon = createCustomIcon(issue.status, issue.urgency, issue.category);

            return (
              <Marker
                key={issue.id}
                position={[issue.lat, issue.lng]}
                icon={icon}
              >
                <Popup className="custom-leaflet-popup" minWidth={260} maxWidth={320}>
                  <div className="p-1">
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">
                        {issue.trackingNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          issue.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : issue.urgency === 'hazard'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {issue.status.toUpperCase()}
                      </span>
                    </div>

                    <img
                      src={issue.status === 'resolved' && issue.afterImageUrl ? issue.afterImageUrl : issue.imageUrl}
                      alt={issue.title}
                      className="h-28 w-full rounded-md object-cover mb-2"
                    />

                    <h4 className="font-bold text-xs text-neutral-900 line-clamp-2 leading-snug mb-1">
                      {issue.title}
                    </h4>

                    <p className="text-[11px] text-neutral-600 mb-2">
                      <strong className="text-neutral-800">Ward {issue.wardNumber}:</strong> {issue.landmark}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-neutral-200">
                      <button
                        onClick={() => toggleUpvote(issue.id)}
                        className="flex items-center space-x-1 text-xs text-neutral-700 hover:text-amber-600 font-semibold"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{issue.upvotes}</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectIssue(issue);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                      >
                        Inspect Audit Log &rarr;
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-neutral-800 bg-[#0B0F17]/90 backdrop-blur-md p-3 text-xs shadow-xl text-neutral-300">
          <div className="font-semibold text-neutral-200 mb-2 text-[11px] uppercase tracking-wider">
            Marker Legend
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-rose-500/40" />
              <span>Critical Hazard / Immediate Attention</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-500/40" />
              <span>In Progress / Field Crew Dispatched</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/40" />
              <span>Resolved & Photographically Verified</span>
            </div>
          </div>
        </div>

        {/* Active counter pill */}
        <div className="absolute top-4 right-4 z-[1000] rounded-xl border border-neutral-800 bg-[#0B0F17]/90 backdrop-blur-md px-3 py-1.5 text-xs font-mono shadow-xl text-neutral-300">
          <span className="text-amber-400 font-bold">{filteredIssues.length}</span> reports visible in current filter
        </div>
      </div>
    </div>
  );
};
