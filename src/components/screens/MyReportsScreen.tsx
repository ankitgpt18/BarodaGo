import React, { useState } from 'react';
import { 
  Navigation, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Camera, 
  Check, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';

interface MyReportItem {
  id: string;
  trackingCode: string;
  title: string;
  category: string;
  status: 'in_progress' | 'verified' | 'resolved' | 'submitted';
  location: string;
  timeAgo: string;
  assignedTo: string;
  assignedRole: string;
  currentStage: number;
  totalStages: number;
  stageName: string;
  stagePercentage: number;
  expectedFix: string;
  imageUrl: string;
  photosCount: number;
}

interface MyReportsScreenProps {
  onSelectTicket?: (trackingCode: string) => void;
  onOpenReport?: () => void;
}

export const MyReportsScreen: React.FC<MyReportsScreenProps> = ({
  onSelectTicket,
  onOpenReport,
}) => {
  const { theme, colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'active' | 'resolved' | 'all'>('active');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const myReports: MyReportItem[] = [
    {
      id: 'rep-1',
      trackingCode: 'BG-24817',
      title: 'Large pothole at RC Dutt Road circle',
      category: 'Pothole',
      status: 'in_progress',
      location: 'RC Dutt Rd, Alkapuri',
      timeAgo: '25m ago',
      assignedTo: 'Ramesh Solanki',
      assignedRole: 'JE',
      currentStage: 2,
      totalStages: 3,
      stageName: 'Asphalt Crew Dispatched',
      stagePercentage: 66,
      expectedFix: 'Today by 4:00 PM',
      imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      photosCount: 1,
    },
    {
      id: 'rep-2',
      trackingCode: 'BG-24790',
      title: 'Flickering high-mast lamp near Inox',
      category: 'Streetlight',
      status: 'verified',
      location: 'Race Course Rd',
      timeAgo: '2h ago',
      assignedTo: 'Work Order #8812',
      assignedRole: 'Electrical Dept',
      currentStage: 1,
      totalStages: 3,
      stageName: 'Work Order Generated',
      stagePercentage: 33,
      expectedFix: 'Tomorrow by 11:00 AM',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
      photosCount: 1,
    },
  ];

  const filtered = myReports.filter((r) => {
    if (activeTab === 'resolved') return r.status === 'resolved';
    if (activeTab === 'active') return r.status !== 'resolved';
    return true;
  });

  return (
    <div
      className="pb-28 px-4 sm:px-6 max-w-2xl mx-auto space-y-5 pt-2 min-h-full transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* 1. Header with Ward & Live Sync */}
      <div className="pt-2 flex items-start justify-between">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors"
            style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
          >
            My Reports
          </h2>
          <div
            className="flex items-center gap-1.5 text-xs font-medium mt-0.5 transition-colors"
            style={{ color: colors.textSecondary }}
          >
            <Navigation size={12} style={{ color: colors.textSecondary }} />
            <span>Ward 9 · Central Vadodara</span>
          </div>
        </div>

        {/* Live Sync badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
          style={{
            backgroundColor: theme === 'dark' ? '#143021' : '#ECFDF5',
            color: theme === 'dark' ? '#6EE7B7' : '#065F46',
            border: `1px solid ${theme === 'dark' ? '#215338' : '#A7F3D0'}`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span style={{ fontFamily: FontFamily.mono }}>LIVE SYNC</span>
        </div>
      </div>

      {/* 2. Status Tabs: Active, Resolved, All */}
      <div
        className="flex items-center gap-2 p-1 rounded-2xl transition-colors"
        style={{
          backgroundColor: colors.sand,
          border: `1px solid ${colors.borderLight}`,
        }}
      >
        {[
          { id: 'active', label: 'Active', count: 2 },
          { id: 'resolved', label: 'Resolved', count: 11 },
          { id: 'all', label: 'All', count: 13 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
              style={{
                backgroundColor: isActive ? colors.primary : 'transparent',
                color: isActive ? '#FFFFFF' : colors.textPrimary,
                fontFamily: FontFamily.body,
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <span>{tab.label}</span>
              <span
                className="px-1.5 py-0.2 rounded-full text-[10px]"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)',
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setSelectedCategory('all')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95"
          style={{
            fontFamily: FontFamily.body,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: selectedCategory === 'all' ? colors.primary : colors.sand,
            color: selectedCategory === 'all' ? '#FFFFFF' : colors.textPrimary,
          }}
        >
          <SlidersHorizontal size={12} />
          <span>All Categories</span>
        </button>
        {['Potholes', 'Garbage', 'Streetlights', 'Drainage'].map((cat) => {
          const isSelected = selectedCategory === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toLowerCase())}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95"
              style={{
                fontFamily: FontFamily.body,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: isSelected ? colors.primary : colors.sand,
                color: isSelected ? '#FFFFFF' : colors.textPrimary,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 4. Ticket Cards with Perforated Ticket Stub Design */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectTicket?.(report.trackingCode)}
              className="rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all cursor-pointer relative"
              style={{
                backgroundColor: colors.surfaceCard,
                border: `1px solid ${colors.borderLight}`,
              }}
            >
              {/* Top part of ticket */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold"
                      style={{
                        fontFamily: FontFamily.mono,
                        backgroundColor: colors.sand,
                        color: colors.textPrimary,
                      }}
                    >
                      #{report.trackingCode}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold"
                      style={{
                        fontFamily: FontFamily.mono,
                        backgroundColor: theme === 'dark' ? '#3B1A17' : '#FFE4E6',
                        color: theme === 'dark' ? '#FDA4AF' : '#BE123C',
                        border: `1px solid ${theme === 'dark' ? '#7A271A' : '#FECDD3'}`,
                      }}
                    >
                      {report.category}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div
                    className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                    style={{
                      backgroundColor: theme === 'dark' ? '#33230C' : '#FEF3C7',
                      color: theme === 'dark' ? '#FBBF24' : '#B45309',
                      border: `1px solid ${theme === 'dark' ? '#785315' : '#FCD34D'}`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>In Progress</span>
                  </div>
                </div>

                {/* Content row */}
                <div className="flex items-start gap-3 mt-3">
                  <div
                    className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden"
                    style={{
                      border: `1px solid ${colors.borderLight}`,
                      backgroundColor: colors.sand,
                    }}
                  >
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-white text-[9px] font-bold">
                      {report.photosCount} PHOTO
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-base font-bold line-clamp-1 transition-colors"
                      style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
                    >
                      {report.title}
                    </h4>
                    <p
                      className="text-xs mt-0.5 flex items-center gap-1 transition-colors"
                      style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
                    >
                      <span>{report.location}</span>
                      <span>·</span>
                      <span>{report.timeAgo}</span>
                    </p>

                    {/* Assigned Officer / Department */}
                    <div
                      className="mt-2 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5"
                      style={{
                        backgroundColor: colors.sand,
                        border: `1px solid ${colors.borderLight}`,
                        color: colors.textPrimary,
                      }}
                    >
                      <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                      <span className="truncate">
                        Assigned: <strong>{report.assignedRole} {report.assignedTo}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforated Dotted Divider with side notches */}
              <div className="relative flex items-center my-0 px-4">
                <div
                  className="absolute -left-2 w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: colors.surface,
                    borderRight: `1px solid ${colors.borderLight}`,
                  }}
                />
                <div
                  className="w-full border-t border-dashed"
                  style={{ borderColor: colors.borderLight }}
                />
                <div
                  className="absolute -right-2 w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: colors.surface,
                    borderLeft: `1px solid ${colors.borderLight}`,
                  }}
                />
              </div>

              {/* Bottom part of ticket: Progress & SLA */}
              <div
                className="p-4"
                style={{
                  backgroundColor: theme === 'dark' ? '#141D17' : '#FDFAF3',
                }}
              >
                <div
                  className="flex items-center justify-between text-xs font-semibold"
                  style={{ fontFamily: FontFamily.body, color: colors.textPrimary }}
                >
                  <span>
                    Stage {report.currentStage} of {report.totalStages}: {report.stageName}
                  </span>
                  <span
                    className="font-bold text-emerald-500"
                    style={{ fontFamily: FontFamily.mono }}
                  >
                    {report.stagePercentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full h-2 rounded-full overflow-hidden mt-2"
                  style={{ backgroundColor: colors.sand }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${report.stagePercentage}%`,
                      backgroundColor: colors.primary,
                    }}
                  />
                </div>

                {/* Footer SLA & Audit Trail link */}
                <div className="flex items-center justify-between mt-3 text-xs">
                  <div
                    className="flex items-center gap-1.5 font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    <Clock size={13} className="text-amber-500" />
                    <span>
                      Expected fix: <strong>{report.expectedFix}</strong>
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-0.5 font-bold hover:underline cursor-pointer"
                    style={{ color: colors.primary }}
                  >
                    <span>Audit Trail</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="rounded-3xl p-8 text-center space-y-4"
          style={{
            backgroundColor: colors.surfaceCard,
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{
              backgroundColor: colors.sand,
              border: `2px solid ${colors.borderLight}`,
              color: colors.primary,
            }}
          >
            <Sparkles size={36} />
          </div>
          <div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              No open reports right now.
            </h3>
            <p
              className="text-xs sm:text-sm mt-1.5 max-w-sm mx-auto"
              style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
            >
              Your street is looking good! Spotted something amiss on your morning commute? Tap Scan below.
            </p>
          </div>
          <button
            onClick={onOpenReport}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white active:scale-95 transition-all shadow-sm"
            style={{
              fontFamily: FontFamily.body,
              cursor: 'pointer',
              backgroundColor: colors.secondaryBright,
              border: 'none',
            }}
          >
            <Camera size={16} />
            <span>Log a new issue</span>
          </button>
        </div>
      )}

      {/* 5. Ward 9 Resolution SLA banner */}
      <div
        className="rounded-2xl p-4 flex items-center justify-between"
        style={{
          backgroundColor: theme === 'dark' ? '#143021' : '#F0FDF4',
          border: `1px solid ${theme === 'dark' ? '#215338' : '#BBF7D0'}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundColor: theme === 'dark' ? '#1A432F' : '#DCFCE7',
              color: theme === 'dark' ? '#6EE7B7' : '#166534',
            }}
          >
            <Check size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h5
              className="text-sm font-bold"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Ward 9 Resolution SLA
            </h5>
            <p
              className="text-xs"
              style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
            >
              Avg. turnaround: <strong>18.4 hrs</strong> this week
            </p>
          </div>
        </div>
        <div className="text-right">
          <span
            className="text-lg font-black text-emerald-500"
            style={{ fontFamily: FontFamily.mono }}
          >
            94%
          </span>
          <p
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ fontFamily: FontFamily.mono, color: colors.textSecondary }}
          >
            ON-TIME
          </p>
        </div>
      </div>
    </div>
  );
};
