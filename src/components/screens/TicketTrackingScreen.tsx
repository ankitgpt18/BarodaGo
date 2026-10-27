import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  Check, 
  Navigation, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Star, 
  Bell, 
  AlertTriangle,
  LocateFixed
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

interface TicketTrackingScreenProps {
  trackingCode?: string;
  onBack?: () => void;
}

export const TicketTrackingScreen: React.FC<TicketTrackingScreenProps> = ({
  trackingCode = 'BG-24817',
  onBack,
}) => {
  const { theme, colors } = useTheme();
  const [showOriginalSubmission, setShowOriginalSubmission] = useState(false);

  const steps = [
    {
      title: 'Received',
      time: '10:14 AM',
      description: 'Ticket registered via Citizens Sayaji Portal',
      status: 'completed',
    },
    {
      title: 'Verified by Desk',
      time: '10:32 AM',
      description: 'Categorized as Category 1 Asphalt Depression',
      status: 'completed',
    },
    {
      title: 'Assigned to Field Crew',
      time: '11:05 AM (Active)',
      description: 'Ramesh Solanki en route with asphalt cold-mix vehicle',
      distanceBadge: '1.4 km from RC Dutt Junction',
      status: 'active',
    },
    {
      title: 'Work in Progress',
      time: 'Pending',
      description: 'Cordoning, leveling, and asphalt compression',
      status: 'pending',
    },
    {
      title: 'Resolved & Photo Proof',
      time: 'By 4:00 PM',
      description: 'Digital clearance sign-off with geo-tagged after photo',
      status: 'pending',
    },
  ];

  return (
    <div
      className="min-h-full flex flex-col pb-20 transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Top Header */}
      <header
        className="sticky top-0 z-30 px-4 py-3 border-b flex items-center justify-between transition-colors"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.borderLight,
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{
              cursor: 'pointer',
              border: `1px solid ${colors.borderLight}`,
              backgroundColor: colors.sand,
              color: colors.textPrimary,
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1
              className="text-base font-bold leading-tight transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Ticket Tracking
            </h1>
            <p className="text-[11px] font-medium" style={{ color: colors.textSecondary }}>
              VMC Sayaji Dispatch Protocol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              fontFamily: FontFamily.mono,
              backgroundColor: colors.sand,
              color: colors.textPrimary,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            #{trackingCode}
          </span>
        </div>
      </header>

      {/* 1. Simulated Live GPS Telemetry Map Banner */}
      <div
        className="relative w-full h-64 overflow-hidden border-b transition-colors"
        style={{
          backgroundColor: theme === 'dark' ? '#111713' : '#E8E4DA',
          borderColor: colors.borderLight,
        }}
      >
        {/* Map pattern background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: theme === 'dark'
              ? 'radial-gradient(#2A3C31 1.5px, transparent 1.5px), radial-gradient(#2A3C31 1.5px, #111713 1.5px)'
              : 'radial-gradient(#C4BEB1 1.5px, transparent 1.5px), radial-gradient(#C4BEB1 1.5px, #E8E4DA 1.5px)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />

        {/* Telemetry pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span style={{ fontFamily: FontFamily.mono }}>LIVE GPS TELEMETRY • Ward 9 Road Dept</span>
        </div>

        {/* Recenter button */}
        <button
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full shadow-md flex items-center justify-center active:scale-95 transition-all"
          style={{
            border: 'none',
            cursor: 'pointer',
            backgroundColor: colors.surfaceCard,
            color: colors.textPrimary,
          }}
          title="Recenter"
        >
          <LocateFixed size={18} />
        </button>

        {/* Target Incident Pin */}
        <div className="absolute top-12 right-16 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#D83120] text-white flex items-center justify-center shadow-lg animate-bounce">
            <AlertTriangle size={20} />
          </div>
          <span
            className="mt-1 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold tracking-tight shadow"
            style={{ fontFamily: FontFamily.mono }}
          >
            RC Dutt Road #{trackingCode}
          </span>
        </div>

        {/* En-route Vehicle Marker with Path */}
        <div className="absolute bottom-12 left-1/3 flex flex-col items-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163828] text-white text-[11px] font-bold shadow-lg mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Ramesh is 12 mins away • On route</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#163828] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Navigation size={18} className="rotate-45" />
          </div>
        </div>
      </div>

      {/* 2. Main Sheet Content */}
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 -mt-4 relative z-20 space-y-4">
        {/* Ticket Header Card */}
        <div
          className="rounded-3xl p-5 shadow-sm space-y-3 transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-base font-extrabold"
                style={{ fontFamily: FontFamily.mono, color: colors.textPrimary }}
              >
                #{trackingCode}
              </span>
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase"
                style={{
                  fontFamily: FontFamily.mono,
                  backgroundColor: theme === 'dark' ? '#3B1A17' : '#FFE4E6',
                  color: theme === 'dark' ? '#FDA4AF' : '#BE123C',
                  border: `1px solid ${theme === 'dark' ? '#7A271A' : '#FECDD3'}`,
                }}
              >
                HIGH PRIORITY
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: theme === 'dark' ? '#143021' : '#ECFDF5',
                color: theme === 'dark' ? '#6EE7B7' : '#065F46',
                border: `1px solid ${theme === 'dark' ? '#215338' : '#A7F3D0'}`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Assigned & En Route</span>
            </div>
          </div>

          <div>
            <h2
              className="text-xl sm:text-2xl font-bold leading-tight transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Ramesh Solanki is 12 minutes away
            </h2>
            <p
              className="text-xs mt-1 transition-colors"
              style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
            >
              Ward 9 Junior Road Maintenance Engineer on site inspection vehicle{' '}
              <strong style={{ color: colors.textPrimary }}>GJ-06-VM-4412</strong>
            </p>
          </div>

          {/* Officer Card */}
          <div
            className="rounded-2xl p-4 space-y-3 transition-colors"
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Officer Ramesh Solanki"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4
                    className="text-sm font-bold transition-colors"
                    style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                  >
                    Ramesh Solanki
                  </h4>
                  <ShieldCheck size={16} className="text-emerald-500" />
                </div>
                <p className="text-xs" style={{ color: colors.textSecondary }}>VMC Certified Field Officer</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold" style={{ color: colors.textPrimary }}>4.9</span>
                  <span style={{ color: colors.textSecondary }}>· 184 road fixes</span>
                </div>
              </div>
            </div>

            {/* Actions: Call Officer & Chat */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => alert('Connecting via VMC secure citizen relay: +91 265 2433111')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                style={{
                  cursor: 'pointer',
                  backgroundColor: colors.sand,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.borderLight}`,
                }}
              >
                <Phone size={14} />
                <span>Call Officer</span>
              </button>
              <button
                onClick={() => alert('VMC Live Support Chat initiated.')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-white text-xs font-bold active:scale-95 transition-all"
                style={{
                  cursor: 'pointer',
                  backgroundColor: colors.primary,
                  border: 'none',
                }}
              >
                <MessageSquare size={14} />
                <span>Chat via VMC</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Live Dispatch Stepper */}
        <div
          className="rounded-3xl p-5 shadow-sm space-y-4 transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-xs font-extrabold uppercase tracking-widest"
              style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
            >
              LIVE DISPATCH STEPPER
            </h3>
            <span
              className="text-xs font-bold text-emerald-500"
              style={{ fontFamily: FontFamily.mono }}
            >
              SLA: 4h Resolution
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6 relative pl-3">
            {/* Connecting Vertical Line */}
            <div
              className="absolute left-[17px] top-3 bottom-3 w-0.5"
              style={{ backgroundColor: colors.borderLight }}
            />

            {steps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div key={idx} className="flex items-start gap-4 relative">
                  {/* Step Icon Badge */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all"
                    style={{
                      backgroundColor: isCompleted
                        ? colors.primary
                        : isActive
                        ? colors.secondaryBright
                        : colors.sand,
                      color: isCompleted || isActive ? '#FFFFFF' : colors.textSecondary,
                    }}
                  >
                    {isCompleted ? (
                      <Check size={14} strokeWidth={2.8} />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.textSecondary }} />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h4
                        className="text-sm font-bold"
                        style={{
                          fontFamily: FontFamily.display,
                          color: isActive ? colors.secondaryBright : isCompleted ? colors.textPrimary : colors.textSecondary,
                        }}
                      >
                        {step.title}
                      </h4>
                      <span
                        className="text-xs font-medium"
                        style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
                      >
                        {step.time}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                      {step.description}
                    </p>

                    {step.distanceBadge && (
                      <div
                        className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
                        style={{
                          backgroundColor: colors.sand,
                          border: `1px solid ${colors.borderLight}`,
                          color: colors.textPrimary,
                        }}
                      >
                        <Navigation size={12} className="text-amber-500" />
                        <span>{step.distanceBadge}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Original Citizen Submission Accordion */}
        <div
          className="rounded-2xl overflow-hidden transition-colors"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <button
            onClick={() => setShowOriginalSubmission(!showOriginalSubmission)}
            className="w-full p-4 flex items-center justify-between text-left"
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <div>
              <h4
                className="text-sm font-bold transition-colors"
                style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
              >
                Original Citizen Submission
              </h4>
              <p className="text-xs" style={{ color: colors.textSecondary }}>Reported by you today at 10:14 AM</p>
            </div>
            {showOriginalSubmission ? (
              <ChevronUp size={18} style={{ color: colors.textSecondary }} />
            ) : (
              <ChevronDown size={18} style={{ color: colors.textSecondary }} />
            )}
          </button>

          {showOriginalSubmission && (
            <div
              className="px-4 pb-4 pt-1 border-t text-xs space-y-2"
              style={{
                borderColor: colors.borderLight,
                color: colors.textSecondary,
              }}
            >
              <p>
                <strong style={{ color: colors.textPrimary }}>Category:</strong> Asphalt Depression / Deep Pothole
              </p>
              <p>
                <strong style={{ color: colors.textPrimary }}>Location:</strong> Near RC Dutt Road Circle, Opp. Inox, Alkapuri
              </p>
              <p>
                <strong style={{ color: colors.textPrimary }}>Citizen Note:</strong> Deep crater causing two-wheelers to skid during evening rush.
              </p>
            </div>
          )}
        </div>

        {/* Footer SMS alerts notice */}
        <div
          className="pt-2 flex items-center justify-between text-xs"
          style={{ color: colors.textSecondary }}
        >
          <div className="flex items-center gap-1.5">
            <Bell size={13} style={{ color: colors.textSecondary }} />
            <span>SMS alerts active on +91 •••• 421</span>
          </div>
          <button
            onClick={() => alert('VMC Helpdesk Toll-Free: 1800 233 0265')}
            className="font-bold hover:underline"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.primary,
            }}
          >
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};
