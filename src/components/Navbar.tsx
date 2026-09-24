import React from 'react';
import {
  Compass,
  MapPin,
  Camera,
  Search,
  Volume2,
  VolumeX,
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    userKarma,
    soundEnabled,
    setSoundEnabled,
    setIsReportModalOpen,
    setIsLookupModalOpen,
    setLookupPresetCode
  } = useCivicData();

  const handleTabChange = (tab: string) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      {/* Top micro-bar: Municipal service status */}
      <div className="border-b border-neutral-800/50 bg-[#080B11] px-4 py-1.5 text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 font-medium text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Vadodara Municipal Corporation (VMC) Civic Network</span>
            </span>
            <span className="hidden sm:inline-block text-neutral-600">•</span>
            <span className="hidden sm:inline-block text-neutral-400 font-mono text-[11px]">
              19 Wards Active • East, West, North & South Zones Online
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setLookupPresetCode('BDQ-2026-8921');
                setIsLookupModalOpen(true);
              }}
              className="text-neutral-400 hover:text-emerald-400 font-mono text-[11px] underline underline-offset-2 transition-colors"
            >
              Demo Ticket: BDQ-2026-8921
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Disable audio cues' : 'Enable audio cues'}
              className="flex items-center space-x-1 text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-neutral-400" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-neutral-600" />
              )}
              <span className="hidden md:inline text-[10px] uppercase font-mono tracking-wider">
                {soundEnabled ? 'Sound ON' : 'Mute'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div
            onClick={() => handleTabChange('feed')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-sm tracking-tight shadow-md shadow-orange-950/40 border border-orange-400/30 group-hover:scale-105 transition-transform">
              BDQ
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  BarodaGO
                </span>
                <span className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                  CITIZEN
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium hidden sm:block">
                Vadodara Civic OS & Neighborhood Radar
              </p>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-neutral-900/60 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => handleTabChange('feed')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'feed'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>Civic Radar</span>
          </button>

          <button
            onClick={() => handleTabChange('map')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'map'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => handleTabChange('quests')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'quests'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Heritage Quests</span>
          </button>

          <button
            onClick={() => handleTabChange('food')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'food'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-rose-400" />
            <span>Food & Hygiene</span>
          </button>

          <button
            onClick={() => handleTabChange('community')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'community'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
            }`}
          >
            <span>Micro-Drives</span>
          </button>

          <button
            onClick={() => handleTabChange('leaderboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-yellow-400" />
            <span>Champions</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Ticket Lookup */}
          <button
            onClick={() => {
              sound.playClick();
              setIsLookupModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-mono text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
            title="Track ticket by reference ID"
          >
            <Search className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Track</span>
            <kbd className="hidden md:inline rounded bg-neutral-800 px-1 py-0.2 font-sans text-[10px] text-neutral-400">
              BDQ#
            </kbd>
          </button>

          {/* Citizen Karma Badge */}
          <div
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 text-xs font-medium text-amber-300"
            title="Your current Civic Karma points"
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono font-semibold">{userKarma}</span>
            <span className="hidden sm:inline text-amber-400/80 text-[11px]">pts</span>
          </div>

          {/* Primary Action: Snap & Report */}
          <button
            onClick={() => {
              sound.playClick();
              setIsReportModalOpen(true);
            }}
            className="flex items-center space-x-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-orange-950/50 hover:bg-orange-500 active:scale-95 transition-all border border-orange-400/30"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Snap & Report</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-neutral-800/60 bg-neutral-950/70 px-4 py-2 space-x-2 scrollbar-none">
        {[
          { id: 'feed', label: 'Civic Radar' },
          { id: 'map', label: 'Live Map' },
          { id: 'quests', label: 'Quests' },
          { id: 'food', label: 'Food Hygiene' },
          { id: 'community', label: 'Micro-Drives' },
          { id: 'leaderboard', label: 'Champions' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-neutral-800 text-amber-400 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
