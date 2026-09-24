import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Camera,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HardHat,
  ArrowRight,
  UploadCloud,
  Check
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { IssueCategory, IssueUrgency } from '../types';
import { CATEGORY_DETAILS, VADODARA_WARDS } from '../data/mockData';
import { sound } from '../utils/sound';

const PRESET_SAMPLE_PHOTOS: Array<{
  label: string;
  category: IssueCategory;
  url: string;
  landmark: string;
  wardName: string;
  wardNumber: number;
}> = [
  {
    label: 'Deep crater hole (RC Dutt Rd)',
    category: 'pothole',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    landmark: 'Opposite Inox Cinema, RC Dutt Road',
    wardName: 'Alkapuri',
    wardNumber: 1
  },
  {
    label: 'Blacked out streetlights',
    category: 'streetlight',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    landmark: 'Behind Vadodara Railway Station, Sayajigunj',
    wardName: 'Sayajigunj',
    wardNumber: 4
  },
  {
    label: 'Clogged drain / gutter flood',
    category: 'drainage',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
    landmark: 'Harinagar Char Rasta, Gotri',
    wardName: 'Gotri',
    wardNumber: 14
  },
  {
    label: 'Overflowing roadside garbage',
    category: 'garbage',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    landmark: 'Near MSU Pavilion Ground, Fatehgunj',
    wardName: 'Fatehgunj',
    wardNumber: 8
  }
];

export const IssueReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, reportIssue, setActiveIssue } = useCivicData();

  const [category, setCategory] = useState<IssueCategory>('pothole');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wardNumber, setWardNumber] = useState<number>(1);
  const [landmark, setLandmark] = useState('RC Dutt Road, Near Inox');
  const [urgency, setUrgency] = useState<IssueUrgency>('high');
  const [imageUrl, setImageUrl] = useState(PRESET_SAMPLE_PHOTOS[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ trackingNumber: string; id: string } | null>(null);

  if (!isReportModalOpen) return null;

  const currentWard = VADODARA_WARDS.find((w) => w.wardNumber === wardNumber) || VADODARA_WARDS[0];

  const handleSelectPreset = (preset: typeof PRESET_SAMPLE_PHOTOS[0]) => {
    sound.playClick();
    setImageUrl(preset.url);
    setCategory(preset.category);
    setLandmark(preset.landmark);
    setWardNumber(preset.wardNumber);
    if (!title) {
      setTitle(`${CATEGORY_DETAILS[preset.category].label} reported near ${preset.landmark}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    sound.playClick();

    setTimeout(() => {
      const created = reportIssue({
        title,
        description: description || `Citizen civic alert filed for ${currentWard.name}. Automated dispatch to VMC field division requested.`,
        category,
        wardName: currentWard.name.split(' ')[0],
        wardNumber: currentWard.wardNumber,
        landmark,
        address: `${landmark}, Ward ${currentWard.wardNumber}, Vadodara, Gujarat`,
        lat: 22.3072 + (Math.random() - 0.5) * 0.03,
        lng: 73.1812 + (Math.random() - 0.5) * 0.03,
        status: 'reported',
        urgency,
        estimatedTurnaroundHours: urgency === 'hazard' ? 12 : 36,
        assignedDepartment: `VMC Engineering Cell (Ward ${currentWard.wardNumber})`,
        assignedOfficer: currentWard.engineerName,
        beforeImageUrl: imageUrl
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      setSubmittedTicket({
        trackingNumber: created.trackingNumber,
        id: created.id
      });
    }, 600);
  };

  const handleClose = () => {
    sound.playClick();
    setIsReportModalOpen(false);
    setSubmittedTicket(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-700 bg-[#0E131E] shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#0A0D15] px-6 py-4">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Report Civic Issue • Vadodara
              </h2>
              <p className="text-xs text-neutral-400">
                Direct dispatch to VMC Ward Executive Engineers
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Success Confirmation State */}
        {submittedTicket ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 mb-4 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <span className="inline-block rounded-md bg-emerald-950 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300 border border-emerald-800 mb-2">
              DISPATCH ORDER CREATED
            </span>

            <h3 className="text-2xl font-extrabold text-white">
              Ticket #{submittedTicket.trackingNumber}
            </h3>

            <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto">
              Your civic report has been geocoded and routed to{' '}
              <span className="font-semibold text-white">
                {currentWard.engineerName} (Ward {currentWard.wardNumber})
              </span>
              . You earned <span className="text-amber-400 font-bold">+45 Civic Karma</span>.
            </p>

            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Estimated First Action:</span>
                <span className="font-mono text-white">Within 12-24 hours</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Assigned Ward Office:</span>
                <span className="text-neutral-200">{currentWard.officeAddress}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Ward Helpline:</span>
                <span className="font-mono text-amber-400">{currentWard.engineerPhone}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-3">
              <button
                onClick={() => {
                  handleClose();
                }}
                className="rounded-xl bg-orange-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-orange-500 transition-colors shadow-lg"
              >
                Back to Civic Radar
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Step 1: Category Picker */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                1. Select Issue Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  [
                    'pothole',
                    'streetlight',
                    'drainage',
                    'garbage',
                    'stray_cattle',
                    'heritage_parks'
                  ] as IssueCategory[]
                ).map((cat) => {
                  const details = CATEGORY_DETAILS[cat];
                  const isSelected = category === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCategory(cat);
                      }}
                      className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: details.color }}
                        />
                        <span className="text-xs font-bold">{details.label}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 line-clamp-1">
                        {details.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sample Photo Presets (Crucial for recruiter instant testing) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  2. Photo Attachment (Recruiter Demo Presets)
                </label>
                <span className="text-[11px] text-neutral-400">
                  Pick a sample photo or enter image URL
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {PRESET_SAMPLE_PHOTOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`group relative h-20 overflow-hidden rounded-xl border transition-all text-left ${
                      imageUrl === preset.url
                        ? 'border-amber-500 ring-2 ring-amber-500/50'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1.5 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-white leading-tight">
                        {preset.label}
                      </span>
                    </div>
                    {imageUrl === preset.url && (
                      <div className="absolute top-1 right-1 rounded-full bg-amber-500 p-0.5 text-black">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Ward & Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Vadodara Ward
                </label>
                <select
                  value={wardNumber}
                  onChange={(e) => {
                    sound.playClick();
                    setWardNumber(parseInt(e.target.value, 10));
                  }}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  {VADODARA_WARDS.map((w) => (
                    <option key={w.wardNumber} value={w.wardNumber}>
                      Ward {w.wardNumber}: {w.name}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Engineer: {currentWard.engineerName}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Nearest Landmark / Street
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Inox, RC Dutt Road"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Step 4: Title & Description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Issue Summary
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Deep subsidence hole right before circle junction"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            {/* Step 5: Urgency Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Urgency & Hazard Classification
              </label>
              <div className="flex space-x-2">
                {[
                  { id: 'normal', label: 'Normal Priority', sub: 'Standard 48h SLA' },
                  { id: 'high', label: 'High Priority', sub: '24h SLA response' },
                  { id: 'hazard', label: 'Immediate Hazard', sub: 'Emergency safety risk' }
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setUrgency(u.id as IssueUrgency);
                    }}
                    className={`flex-1 rounded-xl border p-2.5 text-left transition-colors ${
                      urgency === u.id
                        ? u.id === 'hazard'
                          ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                          : 'border-amber-500 bg-amber-950/40 text-amber-300'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{u.label}</div>
                    <div className="text-[10px] text-neutral-500">{u.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div className="text-xs text-neutral-400">
                <span>Earn </span>
                <span className="font-bold text-amber-400">+45 Karma</span>
                <span> for verified reports</span>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className="flex items-center space-x-2 rounded-xl bg-orange-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-orange-500 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-orange-950/40"
                >
                  {isSubmitting ? (
                    <span>Routing to VMC Ward...</span>
                  ) : (
                    <>
                      <span>Dispatch Civic Report</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
