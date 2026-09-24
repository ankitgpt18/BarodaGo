import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Upload,
  Camera,
  Scan,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  HardHat,
  RefreshCw,
  User,
  Phone
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { analyzeCivicImage } from '../utils/aiVisionSimulator';
import { AiVisionAnalysis } from '../types';
import { sound } from '../utils/sound';

interface SamplePhoto {
  id: string;
  name: string;
  category: string;
  url: string;
  landmark: string;
}

const DEMO_PHOTOS: SamplePhoto[] = [
  {
    id: 'pothole',
    name: 'Road Crater (RC Dutt Rd)',
    category: 'Roads & Potholes',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1000&q=80',
    landmark: 'RC Dutt Road, Opp. Inox Circle'
  },
  {
    id: 'cattle',
    name: 'Stray Cattle (Akota Flyover)',
    category: 'Cattle Hazard',
    url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Akota-Dandia Bazar Flyover Ramp'
  },
  {
    id: 'wire',
    name: 'Live Wires (Karelibaug)',
    category: 'Electrical Hazard',
    url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Bahucharaji Road, Near Amrapali'
  },
  {
    id: 'water',
    name: 'Pipeline Burst (Gotri)',
    category: 'Water Leak',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Harinagar Char Rasta, Gotri Tank'
  },
  {
    id: 'garbage',
    name: 'Overflowing Bin (Mandvi)',
    category: 'Garbage Dump',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Near Mandvi Gate, Old City'
  }
];

export const AiVisionReportSection: React.FC<{ onNavigateToTrack: (trackingNumber: string) => void }> = ({
  onNavigateToTrack
}) => {
  const { reportIssueWithAi, userName, userPhone, userWard, userPoints } = useCivicData();

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(DEMO_PHOTOS[0].url);
  const [selectedImageName, setSelectedImageName] = useState<string>(DEMO_PHOTOS[0].id);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [aiResult, setAiResult] = useState<AiVisionAnalysis | null>(null);
  const [landmark, setLandmark] = useState<string>(DEMO_PHOTOS[0].landmark);
  const [wardInfo, setWardInfo] = useState<{ name: string; number: number; lat: number; lng: number }>({
    name: 'Alkapuri',
    number: 1,
    lat: 22.3105,
    lng: 73.1704
  });
  const [customNote, setCustomNote] = useState<string>('');
  const [createdTicket, setCreatedTicket] = useState<{ code: string; points: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger initial analysis on mount
  React.useEffect(() => {
    runAnalysis(DEMO_PHOTOS[0].id);
  }, []);

  const runAnalysis = async (identifier: string, customUrl?: string) => {
    setIsScanning(true);
    setScanProgress(0);
    setAiResult(null);
    setCreatedTicket(null);
    sound.playClick();

    // Scan progress animation
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 60);

    const { analysis, landmark: detLandmark, ward } = await analyzeCivicImage(identifier);

    clearInterval(interval);
    setScanProgress(100);
    setIsScanning(false);
    setAiResult(analysis);
    setLandmark(detLandmark);
    setWardInfo(ward);
    sound.playSuccess();
  };

  const handleSelectSample = (sample: SamplePhoto) => {
    setSelectedImageUrl(sample.url);
    setSelectedImageName(sample.id);
    runAnalysis(sample.id, sample.url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setSelectedImageUrl(url);
        setSelectedImageName(file.name);
        runAnalysis(file.name, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDispatchTicket = () => {
    if (!aiResult) return;

    sound.playSuccess();
    const newIssue = reportIssueWithAi({
      imageUrl: selectedImageUrl,
      aiAnalysis: aiResult,
      landmark,
      wardName: wardInfo.name,
      wardNumber: wardInfo.number,
      customNote
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    setCreatedTicket({
      code: newIssue.trackingNumber,
      points: newIssue.reporterDetails.pointsAwarded
    });
  };

  return (
    <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#0F141F] to-[#0A0D14] p-4 sm:p-8 shadow-2xl space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-950/40 px-3 py-1 text-xs text-orange-300 mb-2">
            <Scan className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
            <span>AI Computer Vision Municipal Scanner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Upload City Issue. AI Analyzes & Dispatches.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Snap potholes, stray cattle on flyovers, exposed wires, leaking pipes, or garbage piles. Our vision model automatically identifies defect severity, assigns GPS coordinates, and routes direct work orders to VMC ward engineers.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 self-start md:self-auto">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Citizen Rewards</div>
            <div className="text-lg font-black font-mono text-amber-400">{userPoints} pts</div>
            <div className="text-[10px] text-emerald-400">Earn +75 pts per report</div>
          </div>
        </div>
      </div>

      {/* Instant Demo Presets Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Quick Sample Scenarios (Click to test instantly):
          </span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload My Own Image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {DEMO_PHOTOS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`group relative overflow-hidden rounded-xl border p-2 text-left transition-all ${
                selectedImageName === sample.id
                  ? 'border-orange-500 bg-orange-950/30 ring-2 ring-orange-500/40'
                  : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
              }`}
            >
              <div className="relative h-16 w-full rounded-lg overflow-hidden mb-1.5 bg-neutral-950">
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="font-bold text-[11px] text-white line-clamp-1">
                {sample.name}
              </div>
              <div className="text-[10px] text-neutral-400 line-clamp-1">
                {sample.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Viewport with AI Bounding Box HUD */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-950 shadow-2xl">
            {/* Base Image */}
            <img
              src={selectedImageUrl}
              alt="Citizen issue scan"
              className="h-full w-full object-cover"
            />

            {/* Scanner Laser Animation Overlay */}
            {isScanning && (
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] transition-all duration-75"
                style={{ top: `${scanProgress}%` }}
              />
            )}

            {/* AI HUD Overlay Elements */}
            <div className="absolute top-3 left-3 flex items-center space-x-2">
              <span className="rounded-md bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-white border border-neutral-700 flex items-center space-x-1.5">
                <span className={`h-2 w-2 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span>{isScanning ? `ANALYZING (${scanProgress}%)` : 'AI VISION LOCKED'}</span>
              </span>

              {aiResult && !isScanning && (
                <span className="rounded-md bg-emerald-950/80 backdrop-blur-md px-2 py-1 text-xs font-mono font-bold text-emerald-300 border border-emerald-700">
                  {aiResult.confidence.toFixed(1)}% CONFIDENCE
                </span>
              )}
            </div>

            {/* Bounding Box HUD */}
            {aiResult && !isScanning && aiResult.boundingBoxes.map((box, idx) => (
              <div
                key={idx}
                className="absolute border-2 border-orange-500 bg-orange-500/10 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)] pointer-events-none transition-all duration-300"
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`
                }}
              >
                <div className="absolute -top-6 left-0 rounded bg-orange-600 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow">
                  {box.label}
                </div>
                {/* Corner crosshairs */}
                <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-white" />
                <div className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-white" />
                <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-white" />
                <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-white" />
              </div>
            ))}

            {/* Bottom GPS Watermark */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/80 backdrop-blur-md p-2 text-xs font-mono text-neutral-300 border border-neutral-800">
              <span className="flex items-center space-x-1 truncate max-w-[70%]">
                <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <span className="truncate">{landmark} (Ward {wardInfo.number})</span>
              </span>
              <span className="text-[11px] text-neutral-400">
                GPS: {wardInfo.lat.toFixed(4)}°N, {wardInfo.lng.toFixed(4)}°E
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Model Diagnostic & Dispatch Terminal */}
        <div className="lg:col-span-5 space-y-4">
          {createdTicket ? (
            /* Success confirmation card */
            <div className="rounded-2xl border border-emerald-700 bg-emerald-950/30 p-6 text-center space-y-4 shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-700 uppercase">
                  Ticket Generated & Dispatched
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  #{createdTicket.code}
                </h3>
                <p className="text-xs text-neutral-300 mt-1">
                  Work order created and routed directly to{' '}
                  <strong className="text-white">{wardInfo.name} Ward Executive</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 text-xs text-left space-y-1.5">
                <div className="flex justify-between text-neutral-400">
                  <span>Points Awarded:</span>
                  <strong className="text-amber-400 font-mono">+{createdTicket.points} Civic Points</strong>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Reporter:</span>
                  <span className="text-neutral-200">{userName} ({userPhone})</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Assigned SLA:</span>
                  <span className="text-white font-mono">{aiResult?.estimatedResolutionHours} Hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => onNavigateToTrack(createdTicket.code)}
                  className="flex-1 rounded-xl bg-orange-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-orange-500 transition-colors shadow flex items-center justify-center space-x-1.5"
                >
                  <span>Track Live Timeline</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setCreatedTicket(null)}
                  className="rounded-xl border border-neutral-700 bg-neutral-800 py-2.5 px-4 text-xs font-semibold text-neutral-300 hover:bg-neutral-700"
                >
                  Scan Another
                </button>
              </div>
            </div>
          ) : (
            /* AI Diagnostic Card */
            <div className="rounded-2xl border border-neutral-800 bg-[#0E131E] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  AI Model Diagnostic Breakdown
                </span>
                {aiResult && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      aiResult.urgency === 'hazard'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    HAZARD SCORE: {aiResult.hazardScore}/100
                  </span>
                )}
              </div>

              {isScanning ? (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin mx-auto" />
                  <div className="font-mono text-xs text-neutral-300">
                    Running neural vision model on image...
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Segmenting asphalt edges • Calculating severity index
                  </div>
                </div>
              ) : aiResult ? (
                <div className="space-y-3.5 text-xs">
                  {/* Category & Summary */}
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-mono">Detected Classification</div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {aiResult.categoryLabel}
                    </div>
                  </div>

                  {/* Technical Analysis Output */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-neutral-300 leading-relaxed text-xs">
                    <strong className="text-amber-400">AI Observation: </strong>
                    {aiResult.technicalDescription}
                  </div>

                  {/* Metadata pills */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-2">
                      <div className="text-neutral-500 font-mono">VMC Department</div>
                      <div className="font-semibold text-neutral-200 line-clamp-1 mt-0.5">
                        {aiResult.recommendedDepartment.split('(')[0]}
                      </div>
                    </div>
                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-2">
                      <div className="text-neutral-500 font-mono">Resolution SLA</div>
                      <div className="font-bold text-emerald-400 font-mono mt-0.5">
                        Within {aiResult.estimatedResolutionHours} Hours
                      </div>
                    </div>
                  </div>

                  {/* Reporter Details (Attached to ticket) */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3 space-y-1.5">
                    <div className="text-[10px] uppercase font-mono text-neutral-400 flex items-center justify-between">
                      <span>Citizen Reporter Attached</span>
                      <span className="text-amber-400 font-bold">+75 Points Reward</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1.5 text-neutral-200">
                        <User className="h-3 w-3 text-neutral-400" />
                        <span>{userName}</span>
                      </span>
                      <span className="flex items-center space-x-1.5 text-neutral-400 font-mono">
                        <Phone className="h-3 w-3 text-neutral-500" />
                        <span>{userPhone}</span>
                      </span>
                    </div>
                  </div>

                  {/* Dispatch Action Button */}
                  <button
                    onClick={handleDispatchTicket}
                    className="w-full rounded-xl bg-orange-600 py-3 text-xs font-black text-white hover:bg-orange-500 active:scale-95 transition-all shadow-xl shadow-orange-950/50 flex items-center justify-center space-x-2 border border-orange-400/30"
                  >
                    <HardHat className="h-4 w-4" />
                    <span>Generate Ticket & Dispatch Work Order</span>
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
