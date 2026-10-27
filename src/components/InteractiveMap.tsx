import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Issue, WardInfo } from '../types';
import { useCivicData } from '../context/CivicDataContext';
import { MapPin, Navigation, ThumbsUp, ShieldCheck, AlertTriangle, ChevronRight } from 'lucide-react';
import { CATEGORY_DETAILS, VADODARA_WARDS } from '../data/mockData';
import { sound } from '../utils/sound';
import AppColors from '../constants/colors';
import { FontFamily } from '../constants/typography';
import { useTheme } from '../context/ThemeContext';

interface InteractiveMapProps {
  onSelectIssue: (issue: Issue) => void;
}

// Controller component to smoothly pan map when ward changes
const MapRecenter: React.FC<{ center: [number, number]; zoom?: number }> = ({ center, zoom = 14 }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Custom Leaflet DivIcon with Sayaji Civic aesthetics
const createCustomIcon = (status: string, urgency: string, category: string) => {
  let pinBg = '#163828'; // Banyan Green default
  let ringBg = 'rgba(22, 56, 40, 0.25)';

  if (status === 'resolved') {
    pinBg = '#065F46'; // Emerald
    ringBg = 'rgba(6, 95, 70, 0.25)';
  } else if (urgency === 'hazard') {
    pinBg = '#D83120'; // Gulal Red
    ringBg = 'rgba(216, 49, 32, 0.35)';
  } else if (status === 'in_progress') {
    pinBg = '#E69D1E'; // Haldi Gold
    ringBg = 'rgba(230, 157, 30, 0.3)';
  }

  const html = `
    <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background-color: ${ringBg}; animation: pulse 2s infinite;"></div>
      <div style="position: relative; width: 26px; height: 26px; border-radius: 9999px; background-color: ${pinBg}; border: 2.5px solid #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
        <div style="width: 7px; height: 7px; border-radius: 9999px; background-color: #FFFFFF;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'sayaji-civic-pin',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectIssue }) => {
  const { theme, colors } = useTheme();
  const { filteredIssues, selectedWard, setSelectedWard, toggleUpvote } = useCivicData();
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.3072, 73.1812]); // Central Vadodara
  const [currentZoom, setCurrentZoom] = useState(13);

  // Focus on selected ward if matches coordinates
  const handleWardFocus = (ward: WardInfo) => {
    sound.playClick();
    setSelectedWard(ward.name);
    if (ward.lat && ward.lng) {
      setMapCenter([ward.lat, ward.lng]);
      setCurrentZoom(15);
    }
  };

  return (
    <div className="flex flex-col space-y-3 p-3 sm:p-4 transition-colors" style={{ backgroundColor: colors.surface }}>
      {/* 19 Wards Horizontal Quick-Picker */}
      <div className="rounded-2xl p-3 shadow-2xs space-y-2" style={{ backgroundColor: colors.surfaceCard, border: `1px solid ${colors.borderLight}` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-800"
              style={{ fontFamily: FontFamily.mono }}
            >
              VMC 19 WARDS RADAR
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#DCEEE3] text-[#163828]">
              All 19 Wards Active
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 font-medium">
            Tap ward to fly camera
          </span>
        </div>

        {/* Scrollable list of 19 wards */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              setSelectedWard('all');
              setMapCenter([22.3072, 73.1812]);
              setCurrentZoom(13);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedWard === 'all'
                ? 'bg-[#163828] text-white shadow-2xs'
                : 'bg-[#FAF8F5] text-neutral-700 border border-[#EFEAE0] hover:bg-[#EFEAE0]'
            }`}
            style={{ cursor: 'pointer', border: 'none' }}
          >
            All Vadodara
          </button>
          {VADODARA_WARDS.map((w) => {
            const isSelected = selectedWard === w.name;
            return (
              <button
                key={w.wardNumber}
                onClick={() => handleWardFocus(w)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#163828] text-white shadow-2xs'
                    : 'bg-[#FAF8F5] text-neutral-700 border border-[#EFEAE0] hover:bg-[#EFEAE0]'
                }`}
                style={{ cursor: 'pointer', border: 'none' }}
              >
                <span className="opacity-70 font-mono">W{w.wardNumber}</span>
                <span>{w.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Viewport Container */}
      <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden rounded-3xl border border-[#EFEAE0] shadow-md bg-[#E8E4DA]">
        <MapContainer
          center={mapCenter}
          zoom={currentZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapRecenter center={mapCenter} zoom={currentZoom} />

          {/* CartoDB Voyager tiles - warm, clean, developer-grade OSM tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={theme === 'dark'
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            }
          />

          {filteredIssues.map((issue) => {
            const icon = createCustomIcon(issue.status, issue.urgency, issue.category);

            return (
              <Marker
                key={issue.id}
                position={[issue.lat, issue.lng]}
                icon={icon}
              >
                <Popup className="sayaji-leaflet-popup" minWidth={260} maxWidth={300}>
                  <div className="p-1 font-sans">
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase">
                        #{issue.trackingNumber || issue.trackingCode || issue.id}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          issue.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : issue.urgency === 'hazard'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {issue.status.replace('_', ' ')}
                      </span>
                    </div>

                    <img
                      src={issue.status === 'resolved' && issue.afterImageUrl ? issue.afterImageUrl : issue.imageUrl}
                      alt={issue.title}
                      className="h-28 w-full rounded-xl object-cover mb-2 border border-neutral-200"
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
                        className="flex items-center space-x-1 text-xs text-neutral-700 hover:text-rose-700 font-semibold"
                        style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                      >
                        <ThumbsUp size={13} />
                        <span>{issue.upvotes}</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playClick();
                          onSelectIssue(issue);
                        }}
                        className="text-xs font-bold text-[#D83120] hover:underline flex items-center gap-0.5"
                        style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                      >
                        <span>Details</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] rounded-2xl backdrop-blur-md p-2.5 text-xs shadow-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(25,36,30,0.95)' : 'rgba(255,255,255,0.95)', border: `1px solid ${colors.borderLight}`, color: colors.textPrimary }}>
          <div
            className="font-black text-neutral-900 mb-1.5 text-[10px] uppercase tracking-wider"
            style={{ fontFamily: FontFamily.mono }}
          >
            SAYAJI INCIDENT PINS
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D83120]" />
              <span>Immediate Hazard</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E69D1E]" />
              <span>Work Dispatched</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#065F46]" />
              <span>Resolved & Photographed</span>
            </div>
          </div>
        </div>

        {/* Active counter badge */}
        <div
          className="absolute top-3 right-3 z-[1000] rounded-xl backdrop-blur-md px-3 py-1.5 text-xs font-bold shadow-md flex items-center gap-1.5"
          style={{ fontFamily: FontFamily.mono, backgroundColor: theme === 'dark' ? 'rgba(25,36,30,0.95)' : 'rgba(255,255,255,0.95)', border: `1px solid ${colors.borderLight}`, color: colors.textPrimary }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>{filteredIssues.length} active incidents</span>
        </div>
      </div>
    </div>
  );
};
