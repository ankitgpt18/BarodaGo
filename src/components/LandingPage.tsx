import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  Zap,
  HardHat,
  ChevronRight,
  Activity,
  SlidersHorizontal,
  Flame,
  Search,
  Gift,
  Award,
  Sparkles,
  Layers,
  Check,
  Building2,
  Compass,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCivicData } from '../context/CivicDataContext';
import { SpotlightCard } from './SpotlightCard';
import { TiltCard } from './TiltCard';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { sound } from '../utils/sound';
import { CATEGORY_DETAILS } from '../data/mockData';

interface LandingPageProps {
  onNavigateTab: (tab: string) => void;
  onTrackTicket: (code: string) => void;
}

interface DemoScenario {
  id: string;
  name: string;
  category: string;
  ward: string;
  wardNumber: number;
  officer: string;
  location: string;
  coords: string;
  confidence: number;
  defect: string;
  sla: string;
  urgency: 'hazard' | 'urgent' | 'normal';
  imageUrl: string;
  badgeText: string;
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'pothole',
    name: 'RC Dutt Road Crater',
    category: 'Roads & Bitumen',
    ward: 'Ward 1 • West Zone',
    wardNumber: 1,
    officer: 'Er. Rajesh Parmar (Exec. Engineer)',
    location: 'Near Inox Circle, Alkapuri',
    coords: '22.3105° N, 73.1704° E',
    confidence: 96.4,
    defect: 'Severe Bitumen Crater with Aggregate Subsidence (14cm Depth)',
    sla: '24h Standard Protocol',
    urgency: 'hazard',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    badgeText: 'High Collision Risk'
  },
  {
    id: 'cattle',
    name: 'Akota Flyover Cattle',
    category: 'Stray Cattle Hazard',
    ward: 'Ward 6 • West Zone',
    wardNumber: 6,
    officer: 'CNCD Flying Squad #2',
    location: 'Akota-Dandia Bazar Flyover Ramp',
    coords: '22.2982° N, 73.1895° E',
    confidence: 98.1,
    defect: 'Multiple Unattended Bovine Obstructing Fast-Moving Flyover Lane',
    sla: '4h Rapid Impound SLA',
    urgency: 'hazard',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80',
    badgeText: 'Emergency Impound Alert'
  },
  {
    id: 'wire',
    name: 'Karelibaug Live Wire',
    category: 'Electrical Hazard',
    ward: 'Ward 7 • North Zone',
    wardNumber: 7,
    officer: 'MGVCL & VMC Emergency Unit',
    location: 'Bahucharaji Road, Near Amrapali',
    coords: '22.3245° N, 73.2045° E',
    confidence: 97.5,
    defect: 'Dangling 440V Overhead Cable at 1.7m Pedestrian Height',
    sla: '6h Critical Safety Protocol',
    urgency: 'hazard',
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80',
    badgeText: 'Electrocution Risk'
  },
  {
    id: 'water',
    name: 'Gotri Pipeline Burst',
    category: 'Water Works',
    ward: 'Ward 10 • West Zone',
    wardNumber: 10,
    officer: 'VMC Water Supply Division',
    location: 'Harinagar Char Rasta, Gotri',
    coords: '22.3168° N, 73.1492° E',
    confidence: 95.8,
    defect: 'Pressurized Treated Water Main Rupture (Est. 4,200 L/hr Loss)',
    sla: '12h Pressure Gate Shutdown',
    urgency: 'urgent',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
    badgeText: 'Resource Depletion'
  },
  {
    id: 'garbage',
    name: 'Mandvi Refuse Overflow',
    category: 'Solid Waste',
    ward: 'Ward 4 • Central Zone',
    wardNumber: 4,
    officer: 'VMC Solid Waste Cell (Central)',
    location: 'Near Mandvi Gate, Old City',
    coords: '22.2995° N, 73.2082° E',
    confidence: 94.7,
    defect: 'Municipal Dumpster Overflow with 45% Street Spill Spillage',
    sla: '24h Hydraulic Compactor Run',
    urgency: 'normal',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80',
    badgeText: 'Sanitation Notice'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateTab,
  onTrackTicket
}) => {
  const { issues, userPoints, rewards } = useCivicData();
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [isSimulatingDispatch, setIsSimulatingDispatch] = useState<boolean>(false);
  const [simulatedTicket, setSimulatedTicket] = useState<string | null>(null);

  const totalOpen = issues.filter((i) => i.status !== 'resolved').length;
  const totalResolved = issues.filter((i) => i.status === 'resolved').length;

  const handleSimulateDispatch = () => {
    sound.playSuccess();
    setIsSimulatingDispatch(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      const generatedCode = `VMC-BDQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setSimulatedTicket(generatedCode);
      setIsSimulatingDispatch(false);
    }, 600);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION (CyFocus + TwelveMei Style) */}
      <section className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Subtle radial ambient glows - engineered dark aesthetic (no purple AI slop) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-500/[0.07] via-amber-500/[0.05] to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-0 right-10 w-[400px] h-[250px] bg-sky-500/[0.04] blur-3xl pointer-events-none rounded-full" />

        {/* Top Status Capsule */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-white/[0.1] bg-[#0E131E]/90 px-4 py-1.5 text-xs text-neutral-300 shadow-xl shadow-black/40 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">BARODAGO OPERATING SYSTEM</span>
            <span className="text-neutral-600">•</span>
            <span className="font-mono text-[11px] text-amber-400">19 VMC Wards Live</span>
            <span className="text-neutral-600">•</span>
            <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline">18m Avg Triage</span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            <span className="hidden sm:inline">Vadodara Municipal Corporation (VMC) Grid Sync</span>
          </div>
        </div>

        {/* Main Headline & Value Statement */}
        <div className="max-w-4xl space-y-6">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
            The Civic Operating System for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              Vadodara.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 max-w-3xl leading-relaxed font-normal">
            Spot a crater on RC Dutt Road, roaming cattle on Akota Flyover, or a burst water line in Gotri? Snap a photo. BarodaGo’s neural computer vision extracts coordinates, calculates hazard depth, and dispatches directly to the Ward Executive Engineer. Zero red tape. Track the crew live.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('report');
              }}
              className="group relative inline-flex items-center space-x-2.5 rounded-2xl bg-orange-600 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-orange-950/60 hover:bg-orange-500 active:scale-95 transition-all border border-orange-400/40 cursor-pointer"
            >
              <Camera className="h-5 w-5" />
              <span>Snap & Report Defect</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('map');
              }}
              className="inline-flex items-center space-x-2 rounded-2xl border border-white/[0.12] bg-[#0E131E]/90 px-6 py-4 text-sm sm:text-base font-semibold text-neutral-200 hover:bg-neutral-800 hover:border-white/25 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <MapPin className="h-5 w-5 text-sky-400" />
              <span>Explore 19-Ward Radar</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onTrackTicket('VMC-BDQ-8921');
              }}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-mono text-neutral-400 hover:text-amber-400 px-3 py-3 transition-colors cursor-pointer group"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Inspect Live Audit #VMC-BDQ-8921</span>
              <ChevronRight className="h-3.5 w-3.5 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2. THE HERO CENTERPIECE: TwelveMei + CyFocus Interactive Inspector Console */}
        <div className="mt-14">
          <div className="rounded-3xl border border-white/[0.1] bg-[#0A0D15]/95 p-4 sm:p-7 shadow-2xl shadow-black/80 backdrop-blur-2xl">
            {/* Console Bar Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                  Interactive Defect Neural Inspector
                </span>
                <span className="rounded bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 text-[10px] font-mono text-orange-400 font-semibold">
                  LIVE DEMO PRESETS
                </span>
              </div>

              {/* Scenario Switcher Tabs */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none">
                {DEMO_SCENARIOS.map((scen) => {
                  const isActive = activeScenario.id === scen.id;
                  return (
                    <button
                      key={scen.id}
                      onClick={() => {
                        sound.playClick();
                        setActiveScenario(scen);
                        setSimulatedTicket(null);
                      }}
                      className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-neutral-200 text-neutral-950 font-bold shadow'
                          : 'border border-white/[0.06] bg-[#0E131E] text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {scen.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Console Screen Body */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: Optical Viewfinder & Image Preview (SpaceUI crosshairs) */}
              <div className="lg:col-span-7 relative group">
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#05070C]">
                  <img
                    src={activeScenario.imageUrl}
                    alt={activeScenario.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D15] via-transparent to-black/30 pointer-events-none" />

                  {/* Optical Viewfinder HUD Brackets (spaceui style) */}
                  <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-orange-400/80 pointer-events-none" />
                  <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-orange-400/80 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-orange-400/80 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-orange-400/80 pointer-events-none" />

                  {/* Center Optical Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-10 w-10 border border-orange-500/40 rounded-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Tactical Bounding Box Tag (skecher-ui style) */}
                  <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-dashed border-orange-400/90 rounded-lg pointer-events-none flex flex-col justify-between p-2 bg-orange-500/[0.04]">
                    <div className="self-start rounded bg-neutral-950/90 border border-orange-500/50 px-2 py-0.5 text-[10px] font-mono text-orange-300 font-bold">
                      DETECTION: {activeScenario.id.toUpperCase()} [{activeScenario.confidence}%]
                    </div>
                    <div className="self-end rounded bg-neutral-950/90 border border-amber-500/50 px-1.5 py-0.5 text-[9px] font-mono text-amber-300">
                      GPS LOCKED: {activeScenario.coords}
                    </div>
                  </div>

                  {/* Bottom Bar Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="h-3 w-3 text-orange-400" />
                      <span>{activeScenario.location}</span>
                    </span>
                    <span className="text-amber-400 font-semibold">{activeScenario.badgeText}</span>
                  </div>
                </div>
              </div>

              {/* Right: Telemetry & Automated Ward Dispatch Panel */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E131E]/90 p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="text-xs font-mono text-neutral-400">CLASSIFICATION ENGINE</span>
                    <span className="inline-flex items-center space-x-1 text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                      <Check className="h-3 w-3" />
                      <span>{activeScenario.confidence}% Confidence</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                      Identified Civic Defect
                    </h4>
                    <p className="text-sm font-semibold text-white mt-1 leading-snug">
                      {activeScenario.defect}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-2.5">
                      <span className="text-[10px] font-mono text-neutral-400 block">WARD JURISDICTION</span>
                      <span className="text-xs font-bold text-white mt-0.5 block">
                        {activeScenario.ward}
                      </span>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-2.5">
                      <span className="text-[10px] font-mono text-neutral-400 block">ASSIGNED ENGINEER</span>
                      <span className="text-xs font-bold text-amber-400 mt-0.5 block truncate">
                        {activeScenario.officer}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-400" />
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400">EMERGENCY RESPONSE TARGET</div>
                        <div className="text-xs font-bold font-mono text-white">{activeScenario.sla}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">VMC Standard</span>
                  </div>

                  {/* Interactive Action Simulation */}
                  <div className="pt-2">
                    {simulatedTicket ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-3.5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-emerald-400 font-bold flex items-center space-x-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Work Order Dispatched</span>
                          </span>
                          <span className="text-xs font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded border border-emerald-500/30">
                            #{simulatedTicket}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300">
                          Field crew pinged. Route optimized. Citizen earned <strong className="text-amber-400">+50 Civic Points</strong>!
                        </p>
                        <button
                          onClick={() => {
                            sound.playClick();
                            onTrackTicket(simulatedTicket);
                          }}
                          className="w-full text-center text-xs font-mono font-bold text-orange-400 hover:text-orange-300 pt-1 underline underline-offset-2"
                        >
                          View Full Municipal Timeline →
                        </button>
                      </motion.div>
                    ) : (
                      <button
                        onClick={handleSimulateDispatch}
                        disabled={isSimulatingDispatch}
                        className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 py-3 text-xs sm:text-sm font-bold text-white shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer border border-orange-400/40"
                      >
                        <Zap className="h-4 w-4 text-yellow-300" />
                        <span>{isSimulatingDispatch ? 'Synthesizing Ticket...' : 'Simulate Triage & Ward Dispatch'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MUNICIPAL KPI TELEMETRY STRIP (CyFocus Style) */}
      <section className="border-y border-white/[0.08] bg-[#0A0D15]/80 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-1 sm:border-r sm:border-white/[0.08] sm:pr-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>AVG TRIAGE SLA</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                18.4 <span className="text-xl text-neutral-400 font-sans">min</span>
              </div>
              <p className="text-xs text-neutral-400">
                Citizen photo to VMC work order generation.
              </p>
            </div>

            <div className="space-y-1 lg:border-r lg:border-white/[0.08] lg:pr-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-orange-400" />
                <span>ACTIVE COVERAGE</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                19 / 19 <span className="text-xl text-emerald-400 font-sans">Wards</span>
              </div>
              <p className="text-xs text-neutral-400">
                Alkapuri, Gotri, Karelibaug, Manjalpur & beyond.
              </p>
            </div>

            <div className="space-y-1 sm:border-r sm:border-white/[0.08] sm:pr-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>VERIFIED AUDITS</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                14,890+
              </div>
              <p className="text-xs text-neutral-400">
                Photographic before/after proof recorded.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                <span>CITIZEN CHARGE</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                ₹0.00
              </div>
              <p className="text-xs text-neutral-400">
                100% Free Public Civic Infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COOLFIX-STYLE 4-STEP DISPATCH PROTOCOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-orange-400">
            <span>ENGINEERED FOR SPEED</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            How Municipal Dispatch Works
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            No bureaucratic delays. No waiting at Khanderao Market. Four clockwork steps from civic defect to asphalt roller.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <SpotlightCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-orange-400">01</span>
              <span className="rounded-lg bg-neutral-800/80 p-2 text-neutral-300">
                <Camera className="h-5 w-5 text-orange-400" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Optical Citizen Capture
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Citizen takes a quick photo on street. BarodaGo automatically embeds precision GPS coordinates and compass bearing.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-orange-400" />
              <span>Vadodara GIS Geo-Lock</span>
            </div>
          </SpotlightCard>

          {/* Step 2 */}
          <SpotlightCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-amber-400">02</span>
              <span className="rounded-lg bg-neutral-800/80 p-2 text-neutral-300">
                <Zap className="h-5 w-5 text-amber-400" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Neural Vision Triage
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Computer vision scans bounding boxes, classifies defect urgency (bitumen, water, wire, cattle), and rejects duplicate reports.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center space-x-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>96.4% Precision Model</span>
            </div>
          </SpotlightCard>

          {/* Step 3 */}
          <SpotlightCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-sky-400">03</span>
              <span className="rounded-lg bg-neutral-800/80 p-2 text-neutral-300">
                <HardHat className="h-5 w-5 text-sky-400" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Ward Engineer Route
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ticket automatically routed to the designated Ward Executive Engineer with an SLA timer (4h for live wires/cattle, 24h for potholes).
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center space-x-1.5">
              <Building2 className="h-3.5 w-3.5 text-sky-400" />
              <span>Ward 1 to 19 Direct Feed</span>
            </div>
          </SpotlightCard>

          {/* Step 4 */}
          <SpotlightCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-emerald-400">04</span>
              <span className="rounded-lg bg-neutral-800/80 p-2 text-neutral-300">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Before/After Proof
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Repair crew must upload timestamped completion photo to close ticket. Citizen receives audit notification & +50 Civic Points.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center space-x-1.5">
              <Gift className="h-3.5 w-3.5 text-amber-400" />
              <span>Perks & Points Unlocked</span>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE/AFTER REPAIR PROOF (CoolFix Inspiration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-400 mb-2">
                <span>AUDITED RESOLUTION PROOF</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                Inspect Real Civic Repairs
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Every ticket closed in Vadodara requires photographic evidence verified by Ward Executive Engineers.
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onTrackTicket('VMC-BDQ-8921');
              }}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-orange-400 hover:text-orange-300 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>Inspect Audit Trail for #VMC-BDQ-8921</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Interactive Split-Screen Slider */}
          <BeforeAfterSlider />
        </div>
      </section>

      {/* 6. BENTO GRID ARCHITECTURE (Keyvo + TwelveMei + spaceui) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/[0.1] bg-[#0E131E] px-3.5 py-1 text-xs font-mono font-semibold text-neutral-300">
            <span>PLATFORM ECOSYSTEM</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Built for 2.3 Million Citizens
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Everything you need to improve your neighborhood, earn municipal rewards, and hold authorities accountable.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento 1: Instant Defect Scanner (Spans 7 cols) */}
          <div className="md:col-span-7 rounded-3xl border border-white/[0.08] bg-[#0D111A] p-7 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                Module 01 • Optical AI Vision
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Zero Typing. Zero Form Filling.
              </h3>
              <p className="text-sm text-neutral-400 max-w-md">
                Simply point your smartphone camera at any municipal defect. Our computer vision extracts the landmark, maps it to the exact VMC ward, and estimates severity in under 800 milliseconds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#080B11] p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-400 border-b border-white/[0.06] pb-2">
                <span>TELEMETRY PAYLOAD</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="text-neutral-400 text-[11px]">
                LAT: 22.3105° N | LNG: 73.1704° E | CONFIDENCE: 96.4%
              </div>
              <div className="text-neutral-200">
                AUTOROUTE → VMC West Zone (Ward 1 Alkapuri Div.)
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('report');
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-orange-400 hover:text-orange-300 self-start group cursor-pointer"
            >
              <span>Launch Defect Scanner</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bento 2: 19-Ward GIS Spatial Radar (Spans 5 cols) */}
          <div className="md:col-span-5 rounded-3xl border border-white/[0.08] bg-[#0D111A] p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Module 02 • Spatial GIS Radar
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Interactive Ward Radar
              </h3>
              <p className="text-sm text-neutral-400">
                Explore live incident heatmaps across all 19 wards. See where road crews are currently patching bitumen or impounding cattle.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#080B11] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">ALREADY RESOLVED TODAY</span>
                <span className="text-emerald-400 font-bold">42 TICKETS</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Sayajigunj Ward 2</span>
                  <span className="font-mono text-neutral-400">12 mins ago</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Gotri Ward 10</span>
                  <span className="font-mono text-neutral-400">28 mins ago</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('map');
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-sky-400 hover:text-sky-300 self-start group cursor-pointer"
            >
              <span>Open Full GIS Radar</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bento 3: Citizen Rewards & Local Perks Vault (Spans 6 cols) */}
          <div className="md:col-span-6 rounded-3xl border border-white/[0.08] bg-[#0D111A] p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Module 03 • Gamified Civic Economy
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Redeem for Real Vadodara Perks
              </h3>
              <p className="text-sm text-neutral-400">
                Every verified civic report earns Civic Points. Exchange them for free VMC city bus passes, Sayaji Baug Planetarium tickets, Mahakali Sev Usal vouchers, or Duliram Peda boxes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-3">
                <div className="text-xs font-bold text-white">Mahakali Sev Usal</div>
                <div className="text-[11px] text-amber-400 font-mono mt-1">80 Points</div>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-3">
                <div className="text-xs font-bold text-white">VMC Bus 10-Pass</div>
                <div className="text-[11px] text-amber-400 font-mono mt-1">150 Points</div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('rewards');
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 self-start group cursor-pointer"
            >
              <span>Explore Rewards Vault</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bento 4: Civic Activities & Sayaji Quests (Spans 6 cols) */}
          <div className="md:col-span-6 rounded-3xl border border-white/[0.08] bg-[#0D111A] p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Module 04 • Civic Engagement
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Daily Quizzes & Heritage Quests
              </h3>
              <p className="text-sm text-neutral-400">
                Test your knowledge of Vadodara municipal governance, solve hazard puzzles, and explore Gaekwad heritage trails across Kamati Baug and Mandvi Gate.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Today’s Vadodara Civic Quiz</div>
                  <div className="text-[11px] text-neutral-400">Earn +25 Bonus Points</div>
                </div>
              </div>
              <span className="rounded bg-emerald-950 px-2 py-1 text-[10px] font-mono text-emerald-400 font-bold border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('activities');
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 self-start group cursor-pointer"
            >
              <span>Play Civic Quests</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. CITIZEN REWARDS 3D TILT SHOWCASE (useplanes Inspiration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-amber-400 mb-2">
              <span>LOCAL ECONOMIC PARTNERSHIPS</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Turn Action into Vadodara Perks
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Sponsored by Vadodara businesses, cultural institutions, and the VMC transit department.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab('rewards');
            }}
            className="inline-flex items-center space-x-2 rounded-xl bg-[#0E131E] border border-white/[0.1] px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-800 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>View All Rewards Catalog</span>
            <ArrowRight className="h-3.5 w-3.5 text-orange-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.slice(0, 3).map((item) => (
            <TiltCard key={item.id} className="h-full">
              <div className="h-full rounded-3xl border border-white/[0.08] bg-[#0D111A] p-6 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-colors shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-neutral-800/80 px-2 py-0.5 text-[10px] font-mono text-neutral-300 uppercase">
                      {item.category}
                    </span>
                    <span className="flex items-center space-x-1 font-mono text-xs font-bold text-amber-400">
                      <Gift className="h-3.5 w-3.5" />
                      <span>{item.pointsCost} Points</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {item.discountValue}
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onNavigateTab('rewards');
                    }}
                    className="text-xs font-bold text-white bg-neutral-800 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 8. HIGH-CONVERSION CITIZEN ACTION CALLOUT (TwelveMei + CyFocus Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-orange-500/30 bg-gradient-to-br from-[#121724] via-[#0E131E] to-[#0A0D15] p-8 sm:p-14 overflow-hidden shadow-2xl shadow-orange-950/40">
          {/* Subtle warm accent light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/[0.08] blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-bold text-orange-400">
              <Flame className="h-3.5 w-3.5" />
              <span>COMMUNITY ACTION NETWORK</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Ready to clean up your street in Vadodara?
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Every pothole fixed, every cattle hazard cleared, and every broken streetlamp restored makes our city safer for everyone. Join thousands of Barodians today.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('report');
                }}
                className="inline-flex items-center space-x-2 rounded-2xl bg-orange-600 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-orange-950/60 hover:bg-orange-500 active:scale-95 transition-all cursor-pointer border border-orange-400/40"
              >
                <Camera className="h-5 w-5" />
                <span>Report Your First Defect Now</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('feed');
                }}
                className="inline-flex items-center space-x-2 rounded-2xl border border-white/[0.12] bg-[#0E131E]/90 px-6 py-4 text-sm sm:text-base font-semibold text-neutral-200 hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <Activity className="h-5 w-5 text-emerald-400" />
                <span>Watch City Feed</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
