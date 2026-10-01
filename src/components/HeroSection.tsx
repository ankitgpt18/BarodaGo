import React from 'react';
import {
  Camera,
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  Search,
  SlidersHorizontal,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { IssueCategory } from '../types';
import { CATEGORY_DETAILS } from '../data/mockData';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onOpenMap: () => void;
  onOpenReport: () => void;
  onOpenTrack: (code: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMap,
  onOpenReport,
  onOpenTrack
}) => {
  const {
    issues,
    selectedCategory,
    setSelectedCategory,
    selectedWard,
    setSelectedWard,
    searchQuery,
    setSearchQuery,
    wards
  } = useCivicData();

  const totalOpen = issues.filter((i) => i.status !== 'resolved').length;
  const totalResolved = issues.filter((i) => i.status === 'resolved').length;

  const categories: Array<{ id: IssueCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Incidents' },
    { id: 'pothole', label: 'Roads & Potholes' },
    { id: 'streetlight', label: 'Streetlights & Grid' },
    { id: 'water_leak', label: 'Water Leaks' },
    { id: 'garbage', label: 'Waste Dumps' },
    { id: 'stray_cattle', label: 'Cattle Hazards' },
    { id: 'live_wires', label: 'Live Wires' },
    { id: 'drainage', label: 'Drainage & Gutter' }
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0D121D] via-[#0A0D15] to-[#080B11] pt-8 pb-12">
      {/* Subtle ambient light grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/[0.1] bg-[#0E131E]/90 px-3.5 py-1 text-xs text-neutral-300 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-semibold text-white">BarodaGo</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">Vadodara Civic Action Platform</span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>24h Emergency Response Target across 19 VMC Wards</span>
          </div>
        </div>

        {/* Hero Headline & Subhead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Fix what’s broken in Baroda.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
                Direct to Ward Engineers.
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Spot a pothole on RC Dutt Road, a blackout in Sayajigunj, or roaming cattle on Akota Bridge? Snap it, upload it, and we route it straight to your VMC ward office. Track resolution live and redeem civic points for local perks.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenReport();
                }}
                className="inline-flex items-center space-x-2 rounded-2xl bg-orange-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-orange-950/50 hover:bg-orange-500 active:scale-95 transition-all border border-orange-400/40"
              >
                <Camera className="h-4 w-4" />
                <span>Snap & Report Issue</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenMap();
                }}
                className="inline-flex items-center space-x-2 rounded-2xl border border-white/[0.1] bg-[#0E131E]/90 px-5 py-3.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:bg-neutral-800 hover:border-white/20 transition-all"
              >
                <MapPin className="h-4 w-4 text-sky-400" />
                <span>Open Vadodara GIS Map</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTrack('VMC-BDQ-8921');
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 px-3 py-2 underline underline-offset-4 transition-colors"
              >
                <span>Track #VMC-BDQ-8921</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bento Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/95 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Vadodara City Pulse
                </span>
                <span className="flex items-center text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-800/50">
                  <Flame className="h-3 w-3 mr-1 text-emerald-400" />
                  Live Sync
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/50 p-3">
                  <div className="flex items-center space-x-1.5 text-neutral-400 text-xs mb-1">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>Open Issues</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {totalOpen}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Under active triage
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/50 p-3">
                  <div className="flex items-center space-x-1.5 text-neutral-400 text-xs mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Fixed & Audited</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {totalResolved}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Before/after verified
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/50 p-3">
                  <div className="flex items-center space-x-1.5 text-neutral-400 text-xs mb-1">
                    <TrendingUp className="h-3.5 w-3.5 text-sky-400" />
                    <span>Avg Response</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    24h
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Emergency target
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/50 p-3">
                  <div className="flex items-center space-x-1.5 text-neutral-400 text-xs mb-1">
                    <MapPin className="h-3.5 w-3.5 text-orange-400" />
                    <span>Active Wards</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    19 / 19
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Vadodara coverage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0E131E]/95 p-4 sm:p-5 shadow-2xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by road, landmark, or ticket ID (e.g. Alkapuri, Dairy Den, Gotri)..."
                className="w-full rounded-2xl border border-white/[0.1] bg-[#080B11] py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative min-w-[200px]">
                <select
                  value={selectedWard}
                  onChange={(e) => {
                    sound.playClick();
                    setSelectedWard(e.target.value);
                  }}
                  className="w-full appearance-none rounded-2xl border border-white/[0.1] bg-[#080B11] py-3 pl-4 pr-9 text-xs font-semibold text-neutral-200 focus:border-orange-500 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Vadodara Wards</option>
                  {wards.map((w) => (
                    <option key={w.wardNumber} value={w.name.split(' ')[0]}>
                      Ward {w.wardNumber}: {w.name}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="mt-3.5 flex overflow-x-auto pb-1 pt-1 space-x-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const catDetail = cat.id !== 'all' ? CATEGORY_DETAILS[cat.id] : null;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`inline-flex items-center whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-neutral-200 text-neutral-950 shadow font-bold'
                      : 'border border-white/[0.06] bg-[#080B11]/80 text-neutral-400 hover:border-white/[0.14] hover:text-neutral-200'
                  }`}
                >
                  {catDetail && (
                    <span
                      className="mr-1.5 h-2 w-2 rounded-full"
                      style={{ backgroundColor: catDetail.color }}
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
