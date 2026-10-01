import React from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Activity,
  MapPin,
  Gift,
  Sparkles,
  Search,
  Volume2,
  VolumeX,
  Coins,
  Compass
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
    setLookupPresetCode
  } = useCivicData();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'report', label: 'Report Defect', icon: Camera },
    { id: 'feed', label: 'City Radar', icon: Activity },
    { id: 'map', label: '19 Wards GIS', icon: MapPin },
    { id: 'rewards', label: 'Redeem Perks', icon: Gift },
    { id: 'activities', label: 'Civic Quests', icon: Sparkles },
    { id: 'track', label: 'Audit Trail', icon: Search }
  ];

  const handleTabChange = (tab: string) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#080B11]/85 backdrop-blur-xl">
      {/* Top municipal service bar */}
      <div className="border-b border-white/[0.04] bg-[#05070C] px-4 py-1.5 text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium text-neutral-300">
              Vadodara Municipal Corporation (VMC) Citizen Network
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-400">
              19 Wards Active • East, West, North & South Zones
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <button
              onClick={() => {
                setLookupPresetCode('VMC-BDQ-8921');
                handleTabChange('track');
              }}
              className="text-neutral-400 hover:text-orange-400 transition-colors hidden sm:inline underline underline-offset-2"
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
                <Volume2 className="h-3.5 w-3.5 text-neutral-300" />
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

      {/* Main navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div
          onClick={() => handleTabChange('overview')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-sm tracking-tight shadow-lg shadow-orange-950/40 border border-orange-400/30 group-hover:scale-105 transition-transform">
            <span>BG</span>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#080B11]"></span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-orange-400 transition-colors">
                BarodaGo
              </span>
              <span className="rounded bg-neutral-800/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-orange-400 border border-orange-500/20">
                CITIZEN
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium hidden sm:block">
              Vadodara Civic Action & Community Radar
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs with Sliding Pill */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[#0E131E]/90 p-1.5 rounded-2xl border border-white/[0.08] shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-orange-600 shadow-md shadow-orange-950/50"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <Icon className={`relative z-10 h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side: Points pill & Action */}
        <div className="flex items-center space-x-3">
          {/* Points Pill (Clickable -> opens Redeem store) */}
          <button
            onClick={() => handleTabChange('rewards')}
            className="group flex items-center space-x-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-sm"
            title="Redeem points for Vadodara perks"
          >
            <Coins className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <div className="flex items-baseline space-x-1 font-mono">
              <span className="font-bold text-sm text-white">{userPoints}</span>
              <span className="text-[10px] uppercase font-sans text-amber-300/80">pts</span>
            </div>
            <span className="hidden sm:inline-block rounded bg-amber-400/20 px-1.5 py-0.2 text-[9px] font-bold uppercase text-amber-300">
              Redeem
            </span>
          </button>

          {/* Report Button */}
          <button
            onClick={() => handleTabChange('report')}
            className="flex items-center space-x-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-950/50 hover:bg-orange-500 active:scale-95 transition-all border border-orange-400/30"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Snap Issue</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-white/[0.06] bg-[#0A0D15]/95 px-4 py-2 space-x-1.5 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-orange-600 text-white font-bold'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
