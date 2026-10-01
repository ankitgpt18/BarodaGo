import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  HardHat,
  User,
  Phone,
  Check
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { analyzeCivicImage } from '../utils/aiVisionSimulator';
import { AiVisionAnalysis, IssueCategory, IssueUrgency } from '../types';
import { CATEGORY_DETAILS, VADODARA_WARDS } from '../data/mockData';
import { sound } from '../utils/sound';

interface SamplePhoto {
  id: string;
  name: string;
  category: IssueCategory;
  url: string;
  landmark: string;
}

const DEMO_PHOTOS: SamplePhoto[] = [
  {
    id: 'pothole',
    name: 'Road Crater (RC Dutt Rd)',
    category: 'pothole',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1000&q=80',
    landmark: 'RC Dutt Road, Opp. Inox Circle'
  },
  {
    id: 'cattle',
    name: 'Stray Cattle (Akota Flyover)',
    category: 'stray_cattle',
    url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Akota-Dandia Bazar Flyover Ramp'
  },
  {
    id: 'wire',
    name: 'Live Wires (Karelibaug)',
    category: 'live_wires',
    url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Bahucharaji Road, Near Amrapali'
  },
  {
    id: 'water',
    name: 'Pipeline Burst (Gotri)',
    category: 'water_leak',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Harinagar Char Rasta, Gotri Tank'
  },
  {
    id: 'garbage',
    name: 'Overflowing Bin (Mandvi)',
    category: 'garbage',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
    landmark: 'Near Mandvi Gate, Old City'
  }
];

export const IssueReportSection: React.FC<{ onNavigateToTrack: (trackingNumber: string) => void }> = ({
  onNavigateToTrack
}) => {
  const { reportIssueWithAi, userName, userPhone, userPoints, wards } = useCivicData();

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(DEMO_PHOTOS[0].url);
  const [selectedImageName, setSelectedImageName] = useState<string>(DEMO_PHOTOS[0].id);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AiVisionAnalysis | null>(null);
  const [landmark, setLandmark] = useState<string>(DEMO_PHOTOS[0].landmark);
  const [wardNumber, setWardNumber] = useState<number>(1);
  const [customNote, setCustomNote] = useState<string>('');
  const [createdTicket, setCreatedTicket] = useState<{ code: string; points: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    runDetection(DEMO_PHOTOS[0].id);
  }, []);

  const runDetection = async (identifier: string) => {
    setIsProcessing(true);
    setAnalysisResult(null);
    setCreatedTicket(null);
    sound.playClick();

    const { analysis, landmark: detLandmark, ward } = await analyzeCivicImage(identifier);

    setIsProcessing(false);
    setAnalysisResult(analysis);
    setLandmark(detLandmark);
    setWardNumber(ward.number);
    sound.playSuccess();
  };

  const handleSelectSample = (sample: SamplePhoto) => {
    setSelectedImageUrl(sample.url);
    setSelectedImageName(sample.id);
    runDetection(sample.id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setSelectedImageUrl(url);
        setSelectedImageName(file.name);
        runDetection(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDispatchTicket = () => {
    if (!analysisResult) return;

    sound.playSuccess();
    const currentWard = wards.find((w) => w.wardNumber === wardNumber) || wards[0];

    const newIssue = reportIssueWithAi({
      imageUrl: selectedImageUrl,
      aiAnalysis: analysisResult,
      landmark,
      wardName: currentWard.name.split(' ')[0],
      wardNumber: currentWard.wardNumber,
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
    <section className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0F141F] to-[#0A0D14] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.06] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs text-orange-300">
              <Camera className="h-3.5 w-3.5 text-orange-400" />
              <span>Municipal Grievance Dispatch Console</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Report Civic Issue in Vadodara
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Snap a road crater, roaming cattle on flyovers, exposed wires, leaking pipes, or garbage overflow. We automatically classify the defect, tag the coordinates, and route it to your VMC Ward Executive Engineer.
            </p>
          </div>

          <div className="flex items-center space-x-3.5 bg-neutral-900/90 p-4 rounded-2xl border border-white/[0.08] self-start md:self-auto shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">Your Civic Balance</div>
              <div className="text-xl font-bold font-mono text-white">{userPoints} pts</div>
              <div className="text-[11px] text-emerald-400 font-medium">+75 pts per verified report</div>
            </div>
          </div>
        </div>

        {/* Quick Sample Presets (No file needed to test) */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Click a sample defect to test instantly:
            </span>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-1.5 text-xs text-orange-400 hover:text-orange-300 font-bold transition-colors"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload Your Own Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {DEMO_PHOTOS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`group relative overflow-hidden rounded-2xl border p-2 text-left transition-all ${
                  selectedImageName === sample.id
                    ? 'border-orange-500 bg-orange-950/20 ring-2 ring-orange-500/40 shadow-lg'
                    : 'border-white/[0.06] bg-[#0c1017]/80 hover:border-white/[0.14]'
                }`}
              >
                <div className="relative h-20 w-full rounded-xl overflow-hidden mb-2 bg-neutral-950">
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {selectedImageName === sample.id && (
                    <div className="absolute top-1.5 right-1.5 rounded-full bg-orange-600 p-0.5 text-white shadow">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="font-bold text-xs text-white line-clamp-1">
                  {sample.name}
                </div>
                <div className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                  {sample.landmark}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form & Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Image Viewport with Geotag HUD */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-80 sm:h-[460px] w-full rounded-3xl overflow-hidden border border-white/[0.08] bg-[#06080D] shadow-2xl">
            <img
              src={selectedImageUrl}
              alt="Citizen issue"
              className="h-full w-full object-cover"
            />

            {/* Top Status Pill */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <span className="rounded-xl bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono font-bold text-white border border-white/10 flex items-center space-x-2 shadow-lg">
                <span className={`h-2 w-2 rounded-full ${isProcessing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span>{isProcessing ? 'ANALYZING DEFECT...' : 'VERIFIED LOCATION'}</span>
              </span>

              {analysisResult && (
                <span className="rounded-xl bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono font-bold text-emerald-300 border border-emerald-500/30">
                  {analysisResult.confidence.toFixed(1)}% CONFIDENCE
                </span>
              )}
            </div>

            {/* Bounding box on defect */}
            {analysisResult && analysisResult.boundingBoxes.map((box, idx) => (
              <div
                key={idx}
                className="absolute border-2 border-orange-500 bg-orange-500/15 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.5)] pointer-events-none"
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`
                }}
              >
                <div className="absolute -top-6 left-0 rounded-md bg-orange-600 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow">
                  {box.label}
                </div>
              </div>
            ))}

            {/* Bottom Coordinates & Landmark Banner */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-black/85 backdrop-blur-md p-3 text-xs font-mono text-neutral-300 border border-white/10 shadow-lg">
              <span className="flex items-center space-x-1.5 truncate max-w-[70%]">
                <MapPin className="h-4 w-4 text-orange-400 shrink-0" />
                <span className="truncate font-semibold text-white">{landmark}</span>
              </span>
              <span className="text-[11px] text-neutral-400">
                Ward {wardNumber} • Vadodara
              </span>
            </div>
          </div>
        </div>

        {/* Right: Dispatch Details & Work Order Creator */}
        <div className="lg:col-span-5 space-y-4">
          {createdTicket ? (
            /* Success confirmation card */
            <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-[#0A0D14] p-6 text-center space-y-5 shadow-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-inner">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div>
                <span className="rounded-full bg-emerald-950 px-3 py-1 text-[11px] font-mono font-bold text-emerald-300 border border-emerald-800 uppercase tracking-wider">
                  Work Order Dispatched
                </span>
                <h3 className="font-display font-extrabold text-3xl text-white mt-2">
                  #{createdTicket.code}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto">
                  Your civic issue has been logged into the VMC municipal dispatch queue. Assigned to Ward {wardNumber} Executive Engineer.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-4 text-xs text-left space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Karma Reward:</span>
                  <strong className="text-amber-400 font-mono text-sm">+{createdTicket.points} Points Earned</strong>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Citizen Submitter:</span>
                  <span className="text-neutral-200">{userName} ({userPhone})</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Target Resolution:</span>
                  <span className="text-white font-mono font-bold">{analysisResult?.estimatedResolutionHours} Hours SLA</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onNavigateToTrack(createdTicket.code)}
                  className="flex-1 rounded-xl bg-orange-600 py-3 px-4 text-xs font-bold text-white hover:bg-orange-500 transition-colors shadow-lg flex items-center justify-center space-x-1.5"
                >
                  <span>Track Live Timeline</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCreatedTicket(null)}
                  className="rounded-xl border border-white/[0.1] bg-neutral-900 py-3 px-4 text-xs font-semibold text-neutral-300 hover:bg-neutral-800"
                >
                  Report Another
                </button>
              </div>
            </div>
          ) : (
            /* Dispatch Form */
            <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A] p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Defect Inspection & Ward Routing
                </span>
                {analysisResult && (
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      analysisResult.urgency === 'hazard'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    HAZARD SCORE: {analysisResult.hazardScore}/100
                  </span>
                )}
              </div>

              {analysisResult && (
                <div className="space-y-4 text-xs">
                  {/* Category Pill */}
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Problem Classification
                    </label>
                    <div className="text-base font-bold text-white">
                      {analysisResult.categoryLabel}
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-3.5 text-neutral-300 leading-relaxed text-xs">
                    <strong className="text-orange-400">Technical Note: </strong>
                    {analysisResult.technicalDescription}
                  </div>

                  {/* Ward & Landmark Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Vadodara Ward
                      </label>
                      <select
                        value={wardNumber}
                        onChange={(e) => {
                          sound.playClick();
                          setWardNumber(parseInt(e.target.value, 10));
                        }}
                        className="w-full rounded-xl border border-white/[0.1] bg-[#080B11] px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                      >
                        {wards.map((w) => (
                          <option key={w.wardNumber} value={w.wardNumber}>
                            Ward {w.wardNumber}: {w.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Nearest Landmark
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full rounded-xl border border-white/[0.1] bg-[#080B11] px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* VMC Department */}
                  <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-3 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-neutral-500">Auto-Assigned VMC Department</div>
                    <div className="font-semibold text-neutral-200">
                      {analysisResult.recommendedDepartment}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      Target Turnaround: Within {analysisResult.estimatedResolutionHours} Hours
                    </div>
                  </div>

                  {/* Citizen Contact Attached */}
                  <div className="rounded-xl border border-white/[0.06] bg-[#080B11] p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-orange-400" />
                      <div>
                        <div className="font-bold text-white">{userName}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">{userPhone}</div>
                      </div>
                    </div>
                    <span className="text-amber-400 font-bold font-mono">+75 pts</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleDispatchTicket}
                    className="w-full rounded-2xl bg-orange-600 py-3.5 text-xs font-black text-white hover:bg-orange-500 active:scale-98 transition-all shadow-xl shadow-orange-950/60 flex items-center justify-center space-x-2 border border-orange-400/40"
                  >
                    <HardHat className="h-4 w-4" />
                    <span>Submit to VMC Ward Engineer</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
