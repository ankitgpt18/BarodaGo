import React from 'react';
import {
  Scan,
  Compass,
  MapPin,
  Gift,
  Sparkles,
  Search,
  Volume2,
  VolumeX,
  Coins
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    userPoints,
    soundEnabled,
    setSoundEnabled,
    setIsLookupModalOpen,
    setLookupPresetCode
  } = useCivicData();

  const handleTabChange = (tab: string) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#0B0F17]/95 backdrop-blur-md">
      {/* Top micro municipal service status */}
      <div className="border-b border-neutral-800/50 bg-[#080B11] px-4 py-1.5 text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium text-neutral-300">
              Vadodara Municipal Corporation (VMC) Civic Network
            </span>
            <span className="hidden sm:inline-block text-neutral-600">•</span>
            <span className="hidden sm:inline-block text-neutral-400 font-mono text-[11px]">
              AI Vision Automated Triage Active across 19 Wards
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <button
              onClick={() => {
                setLookupPresetCode('VMC-BDQ-8921');
                handleTabChange('track');
              }}
              className="text-neutral-400 hover:text-amber-400 transition-colors hidden sm:inline"
            >
              Demo Ticket: VMC-BDQ-8921
            </button>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
              className="flex items-center space-x-1 text-neutral-400 hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-neutral-400" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-neutral-600" />
              )}
              <span className="text-[10px] uppercase font-mono">
                {soundEnabled ? 'Sound' : 'Muted'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div
          onClick={() => handleTabChange('scanner')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white font-black text-sm tracking-tight shadow-md border border-orange-400/30 group-hover:scale-105 transition-transform">
            BDQ
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                BarodaGO
              </span>
              <span className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                AI CITIZEN OS
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium hidden sm:block">
              Vision Defect Triage & Points Redemption
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-neutral-900/70 p-1 rounded-2xl border border-neutral-800">
          <button
            onClick={() => handleTabChange('scanner')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'scanner'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Scan className="h-3.5 w-3.5" />
            <span>AI Vision Report</span>
          </button>

          <button
            onClick={() => handleTabChange('feed')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'feed'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>Civic Feed</span>
          </button>

          <button
            onClick={() => handleTabChange('map')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'map'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            <span>Vadodara GIS Map</span>
          </button>

          <button
            onClick={() => handleTabChange('rewards')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'rewards'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Gift className="h-3.5 w-3.5 text-emerald-400" />
            <span>Redeem Store</span>
          </button>

          <button
            onClick={() => handleTabChange('activities')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'activities'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
            <span>Fun & Quests</span>
          </button>

          <button
            onClick={() => handleTabChange('track')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'track'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Search className="h-3.5 w-3.5 text-neutral-400" />
            <span>Track Timeline</span>
          </button>
        </nav>

        {/* Right side: Points & Quick Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Points Pill (Clickable -> opens Redeem store) */}
          <button
            onClick={() => handleTabChange('rewards')}
            className="flex items-center space-x-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 transition-all shadow"
            title="Click to redeem points"
          >
            <Coins className="h-4 w-4 text-amber-400" />
            <div className="flex items-baseline space-x-1 font-mono">
              <span className="font-extrabold text-sm">{userPoints}</span>
              <span className="text-[10px] uppercase font-sans text-amber-400/80">pts</span>
            </div>
            <span className="hidden sm:inline-block rounded bg-amber-400/20 px-1.5 py-0.2 text-[9px] font-bold uppercase text-amber-300">
              Redeem
            </span>
          </button>

          {/* Quick Scan Action */}
          <button
            onClick={() => handleTabChange('scanner')}
            className="flex items-center space-x-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-orange-500 shadow-lg shadow-orange-950/40 active:scale-95 transition-all"
          >
            <Scan className="h-3.5 w-3.5" />
            <span>Scan Issue</span>
          </button>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-neutral-800/60 bg-neutral-950/80 px-4 py-2 space-x-2 scrollbar-none">
        {[
          { id: 'scanner', label: 'AI Scanner' },
          { id: 'feed', label: 'Civic Feed' },
          { id: 'map', label: 'Live Map' },
          { id: 'rewards', label: 'Redeem Store' },
          { id: 'activities', label: 'Fun & Quests' },
          { id: 'track', label: 'Track Ticket' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
