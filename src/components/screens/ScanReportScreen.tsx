import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  MapPin, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  Share2, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';
import { useCivicData } from '../../context/CivicDataContext';

interface ScanReportScreenProps {
  onReportComplete?: (trackingCode: string) => void;
  onNavigateToTrack?: (trackingCode: string) => void;
  onClose?: () => void;
}

export const ScanReportScreen: React.FC<ScanReportScreenProps> = ({
  onNavigateToTrack,
  onClose,
}) => {
  const { theme, colors } = useTheme();
  const { reportIssueWithAi } = useCivicData();

  const [step, setStep] = useState<'capture' | 'review' | 'submitted'>('capture');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('pothole');
  const [title, setTitle] = useState<string>('Deep pothole at RC Dutt circle causing traffic swerves');
  const [urgency, setUrgency] = useState<'normal' | 'high' | 'hazard'>('high');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<string>('BG-24817');

  const handleSimulateCapture = (imageUrl: string) => {
    setPhotoPreview(imageUrl);
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setIsAiAnalyzing(false);
      setStep('review');
    }, 900);
  };

  const handleSubmit = () => {
    const newCode = `BG-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedTicket(newCode);

    try {
      reportIssueWithAi({
        imageUrl: photoPreview || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
        landmark: 'Near RC Dutt Circle, Alkapuri',
        wardName: 'Alkapuri',
        wardNumber: 9,
        customNote: title,
        aiAnalysis: {
          detectedCategory: (category === 'pothole' ? 'pothole' : 'pothole') as any,
          categoryLabel: category.toUpperCase(),
          confidence: 96,
          defectSummary: title,
          technicalDescription: 'Road defect geo-tagged with Sayaji sensor',
          urgency: urgency,
          hazardScore: 78,
          recommendedDepartment: 'VMC Roads & Bridges',
          estimatedResolutionHours: 24,
          boundingBoxes: [],
          suggestedTags: ['asphalt', 'road_safety'],
        },
      });
    } catch (e) {
      console.warn('Report issue logged locally:', e);
    }

    setStep('submitted');
  };

  // 1. Submitted Success View (Stitch Mockup #23)
  if (step === 'submitted') {
    return (
      <div
        className="min-h-full p-4 sm:p-6 flex flex-col items-center justify-center relative select-none transition-colors duration-200"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #0A1710 0%, #11261B 100%)'
            : 'linear-gradient(135deg, #163828 0%, #1F4D37 100%)',
          color: '#FFFFFF',
        }}
      >
        {/* Citizen Dispatch Top Pill */}
        <div className="flex items-center justify-between w-full max-w-md mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span style={{ fontFamily: FontFamily.mono }}>CITIZEN SABHA DISPATCH</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
              style={{ border: 'none', cursor: 'pointer', color: '#FFFFFF' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Big Checkmark */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#163828] shadow-xl mb-4">
          <Check size={36} strokeWidth={3} />
        </div>

        {/* Header Text */}
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-center text-white"
          style={{ fontFamily: FontFamily.display }}
        >
          Report Submitted Successfully
        </h2>
        <p
          className="text-xs sm:text-sm text-center text-neutral-300 mt-1 max-w-xs"
          style={{ fontFamily: FontFamily.body }}
        >
          Dispatched directly into Ward 9 digital registry for rapid field verification.
        </p>

        {/* The Authentic Sayaji Perforated Ticket Stub (Mockup #23) */}
        <div
          className="w-full max-w-md rounded-3xl mt-6 overflow-hidden shadow-2xl relative transition-colors"
          style={{
            backgroundColor: theme === 'dark' ? '#19241E' : '#FEF9EF',
            border: `1px solid ${colors.borderLight}`,
            color: colors.textPrimary,
          }}
        >
          <div className="p-5">
            {/* Seva Sadan Seal & Coins Chip */}
            <div className="flex items-center justify-between">
              <div>
                <h4
                  className="text-xs font-extrabold tracking-wider uppercase"
                  style={{ fontFamily: FontFamily.mono, color: colors.textPrimary }}
                >
                  VADODARA MAHANAGAR SEVA SADAN
                </h4>
                <p className="text-[10px] font-medium" style={{ color: colors.textSecondary }}>
                  VMC CITIZEN CHARTER • ESTD. 1950
                </p>
              </div>

              <div
                className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                style={{
                  fontFamily: FontFamily.mono,
                  backgroundColor: theme === 'dark' ? '#2A2412' : '#FEEFC3',
                  color: theme === 'dark' ? '#FBBF24' : '#B06000',
                  border: `1px solid ${theme === 'dark' ? '#785A17' : '#FCD34D'}`,
                }}
              >
                <span>+25 COINS</span>
              </div>
            </div>

            {/* Ticket Identifier & Received Stamp */}
            <div
              className="relative mt-4 pt-3 border-t flex items-start justify-between"
              style={{ borderColor: colors.borderLight }}
            >
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
                >
                  LODGED ISSUE IDENTIFIER
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-2xl font-black"
                    style={{ fontFamily: FontFamily.mono, color: colors.textPrimary }}
                  >
                    {generatedTicket}
                  </span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(generatedTicket)}
                    className="p-1 rounded hover:opacity-75"
                    style={{ color: colors.textSecondary }}
                    title="Copy Code"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>

              {/* Tilted Received Stamp */}
              <div
                className="px-2.5 py-1 border-2 border-dashed font-black text-[9px] uppercase tracking-wider rounded rotate-[-6deg] shadow-2xs"
                style={{
                  fontFamily: FontFamily.mono,
                  borderColor: theme === 'dark' ? '#F87171' : '#FB7185',
                  backgroundColor: theme === 'dark' ? '#351B17' : '#FFF1F2',
                  color: theme === 'dark' ? '#FCA5A5' : '#BE123C',
                }}
              >
                <div>RECEIVED • VMC</div>
                <div className="text-[8px] opacity-80">WARD 09 ENG. DESK</div>
              </div>
            </div>

            {/* Issue Category Block */}
            <div
              className="mt-3.5 p-3 rounded-xl transition-colors"
              style={{
                backgroundColor: colors.surfaceCard,
                border: `1px solid ${colors.borderLight}`,
              }}
            >
              <div
                className="flex items-center gap-1.5 text-xs font-bold"
                style={{ color: colors.textPrimary }}
              >
                <AlertTriangle size={14} className="text-rose-600" />
                <span>Pothole (Road Infrastructure)</span>
              </div>
              <p
                className="text-[11px] mt-0.5 flex items-center gap-1"
                style={{ color: colors.textSecondary }}
              >
                <MapPin size={12} style={{ color: colors.textSecondary }} />
                <span>Ward 9 • Alkapuri Main Avenue, Vadodara</span>
              </p>
            </div>

            {/* Resolution Sequence */}
            <div className="mt-4 space-y-2.5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest block"
                style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
              >
                RESOLUTION SEQUENCE
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="font-bold" style={{ color: colors.textPrimary }}>Received & Logged</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded font-bold ml-auto"
                    style={{
                      backgroundColor: theme === 'dark' ? '#143021' : '#ECFDF5',
                      color: theme === 'dark' ? '#6EE7B7' : '#047857',
                    }}
                  >
                    Just now
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <span className="font-bold" style={{ color: colors.textPrimary }}>Triage & Officer Assignment</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded font-bold ml-auto"
                    style={{
                      backgroundColor: theme === 'dark' ? '#2F230D' : '#FEF3C7',
                      color: theme === 'dark' ? '#FBBF24' : '#B45309',
                    }}
                  >
                    Next step
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Perforated Dotted Divider with side circular cutouts */}
          <div className="relative flex items-center px-4">
            <div
              className="absolute -left-3 w-6 h-6 rounded-full"
              style={{ backgroundColor: theme === 'dark' ? '#0A1710' : '#163828' }}
            />
            <div
              className="w-full border-t-2 border-dashed"
              style={{ borderColor: colors.borderLight }}
            />
            <div
              className="absolute -right-3 w-6 h-6 rounded-full"
              style={{ backgroundColor: theme === 'dark' ? '#0A1710' : '#163828' }}
            />
          </div>

          {/* Guarantee Section */}
          <div
            className="p-4 text-xs transition-colors"
            style={{
              backgroundColor: colors.surfaceCard,
            }}
          >
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong
                  className="block font-bold text-[11px] uppercase tracking-wider"
                  style={{ color: colors.textPrimary }}
                >
                  MONSOON CHARTER SERVICE GUARANTEE
                </strong>
                <span className="text-[11px]" style={{ color: colors.textSecondary }}>
                  Resolution target: Within 72 hours under municipal protocol.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-2 mt-5">
          <button
            onClick={() => onNavigateToTrack?.(generatedTicket)}
            className="w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
            style={{
              fontFamily: FontFamily.body,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: colors.surfaceCard,
              color: colors.textPrimary,
            }}
          >
            <MapPin size={16} />
            <span>Track this report</span>
          </button>

          <button
            onClick={() => {
              setStep('capture');
              setPhotoPreview(null);
            }}
            className="w-full py-2.5 rounded-full bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/15 active:scale-98 transition-all"
            style={{ fontFamily: FontFamily.body, cursor: 'pointer', border: 'none' }}
          >
            <span>Report another issue</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `BarodaGo Ticket ${generatedTicket}`,
                  text: `My civic grievance ${generatedTicket} has been lodged with VMC Ward 9.`,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="w-full py-2 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:underline"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Share2 size={13} />
            <span>Share receipt on WhatsApp</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Review & Confirm View
  if (step === 'review') {
    return (
      <div
        className="min-h-full pb-24 px-4 sm:px-6 max-w-2xl mx-auto space-y-5 pt-4 transition-colors duration-200"
        style={{ backgroundColor: colors.surface }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('capture')}
            className="text-xs font-bold flex items-center gap-1 transition-colors"
            style={{
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              color: colors.textPrimary,
            }}
          >
            ← Retake photo
          </button>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
          >
            REPORT VERIFICATION
          </span>
        </div>

        {/* Captured Photo with AI Tag overlay */}
        <div
          className="relative w-full h-56 rounded-3xl overflow-hidden shadow-sm"
          style={{
            backgroundColor: colors.sand,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          {photoPreview && (
            <img src={photoPreview} alt="Captured preview" className="w-full h-full object-cover" />
          )}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold">
            <Sparkles size={13} className="text-amber-400" />
            <span>AI Verified: Asphalt Pothole (96%)</span>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md">
            <MapPin size={12} />
            <span>GPS: 22.3106° N, 73.1812° E (Ward 9)</span>
          </div>
        </div>

        {/* Category Selector */}
        <div
          className="rounded-3xl p-5 space-y-3 transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <label
            className="text-xs font-extrabold uppercase tracking-widest block"
            style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
          >
            CIVIC CATEGORY
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'pothole', label: 'Pothole' },
              { id: 'garbage', label: 'Garbage' },
              { id: 'streetlight', label: 'Streetlight' },
              { id: 'water', label: 'Water Leak' },
              { id: 'drainage', label: 'Drainage' },
              { id: 'parks', label: 'Gardens' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className="py-2 px-3 rounded-xl text-xs font-bold text-center transition-all active:scale-95"
                style={{
                  cursor: 'pointer',
                  fontFamily: FontFamily.body,
                  border: `1px solid ${category === cat.id ? colors.primary : colors.borderLight}`,
                  backgroundColor: category === cat.id ? colors.primary : colors.sand,
                  color: category === cat.id ? '#FFFFFF' : colors.textPrimary,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title Input */}
        <div
          className="rounded-3xl p-5 space-y-2 transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <label
            className="text-xs font-extrabold uppercase tracking-widest block"
            style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
          >
            DESCRIPTION / NOTE
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm font-medium outline-none transition-colors"
            style={{
              fontFamily: FontFamily.body,
              backgroundColor: colors.surface,
              border: `1px solid ${colors.borderLight}`,
              color: colors.textPrimary,
            }}
            placeholder="Add brief details for road engineers..."
          />
        </div>

        {/* Urgency Pill Selector */}
        <div
          className="rounded-3xl p-5 space-y-2 transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <label
            className="text-xs font-extrabold uppercase tracking-widest block"
            style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
          >
            PRIORITY ASSESSMENT
          </label>
          <div className="flex gap-2">
            {[
              { id: 'normal', label: 'Standard (48h)' },
              { id: 'high', label: 'High Priority (24h)' },
              { id: 'hazard', label: 'Immediate Hazard' },
            ].map((pri) => (
              <button
                key={pri.id}
                type="button"
                onClick={() => setUrgency(pri.id as any)}
                className="flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                style={{
                  cursor: 'pointer',
                  border: `1px solid ${urgency === pri.id ? colors.secondaryBright : colors.borderLight}`,
                  backgroundColor: urgency === pri.id ? colors.secondaryBright : colors.sand,
                  color: urgency === pri.id ? '#FFFFFF' : colors.textPrimary,
                }}
              >
                {pri.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          style={{
            fontFamily: FontFamily.body,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: colors.secondaryBright,
          }}
        >
          <span>Send Report to VMC Ward 9 Desk</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // 3. Initial Camera Capture View
  return (
    <div
      className="min-h-full pb-24 px-4 sm:px-6 max-w-2xl mx-auto space-y-5 pt-4 transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      <div className="text-center pt-2">
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors"
          style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
        >
          Report a Civic Issue
        </h2>
        <p
          className="text-xs sm:text-sm mt-0.5 transition-colors"
          style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
        >
          Capture a photo of the road hazard, trash overflow, or broken light.
        </p>
      </div>

      {/* Simulated Camera Viewfinder */}
      <div
        className="relative w-full aspect-4/3 rounded-3xl bg-neutral-900 overflow-hidden shadow-inner flex flex-col items-center justify-center text-white p-6"
        style={{
          border: `2px solid ${colors.borderLight}`,
        }}
      >
        {isAiAnalyzing ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
            <p className="text-sm font-bold text-amber-300">
              Sayaji AI analyzing road defect telemetry...
            </p>
          </div>
        ) : (
          <>
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-8 border border-white/25 rounded-2xl pointer-events-none" />
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white pointer-events-none" />

            <div className="text-center z-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto">
                <Camera size={32} className="text-white" />
              </div>
              <p className="text-xs text-neutral-300 max-w-xs">
                Position the defect inside the frame for automatic category and GPS geo-tagging.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Camera Trigger Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() =>
            handleSimulateCapture(
              'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80'
            )
          }
          className="w-full py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          style={{
            fontFamily: FontFamily.body,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: colors.secondaryBright,
          }}
        >
          <Camera size={18} />
          <span>Snap Photo & Analyze</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              handleSimulateCapture(
                'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80'
              )
            }
            className="flex-1 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-2xs"
            style={{
              cursor: 'pointer',
              backgroundColor: colors.surfaceCard,
              border: `1px solid ${colors.borderLight}`,
              color: colors.textPrimary,
            }}
          >
            <Upload size={14} />
            <span>Choose from Gallery</span>
          </button>
        </div>
      </div>
    </div>
  );
};
