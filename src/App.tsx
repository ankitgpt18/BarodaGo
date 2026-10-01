import React, { useState } from 'react';
import { CivicDataProvider, useCivicData } from './context/CivicDataContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IssueReportSection } from './components/IssueReportSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { IssueCard } from './components/IssueCard';
import { InteractiveMap } from './components/InteractiveMap';
import { RewardsRedemptionStore } from './components/RewardsRedemptionStore';
import { CivicActivitiesSection } from './components/CivicActivitiesSection';
import { TicketTimelineView } from './components/TicketTimelineView';
import { IssueDetailsModal } from './components/IssueDetailsModal';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';
import { IssueStatus } from './types';
import {
  Activity,
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HardHat
} from 'lucide-react';
import { sound } from './utils/sound';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [trackingTargetCode, setTrackingTargetCode] = useState<string>('VMC-BDQ-8921');

  const {
    filteredIssues,
    selectedStatus,
    setSelectedStatus,
    activeIssue,
    setActiveIssue,
    selectedCategory,
    setSelectedCategory,
    selectedWard,
    setSelectedWard,
    searchQuery,
    setSearchQuery
  } = useCivicData();

  const handleNavigateToTrack = (code: string) => {
    sound.playClick();
    setTrackingTargetCode(code);
    setActiveTab('track');
  };

  const statusOptions: Array<{ id: IssueStatus | 'all'; label: string }> = [
    { id: 'all', label: 'All Incidents' },
    { id: 'ai_verified', label: 'Triage Verified' },
    { id: 'in_progress', label: 'Crew On-Site' },
    { id: 'dispatched', label: 'Work Order Issued' },
    { id: 'resolved', label: 'Resolved & Audited' }
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-neutral-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Floating Island Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Tab 0: Flagship SaaS Landing Page (CyFocus / TwelveMei / CoolFix / Keyvo) */}
        {activeTab === 'overview' && (
          <LandingPage
            onNavigateTab={(tab) => {
              sound.playClick();
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTrackTicket={(code) => {
              handleNavigateToTrack(code);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 1: Instant Grievance Reporting Console */}
        {activeTab === 'report' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-10">
            <IssueReportSection onNavigateToTrack={handleNavigateToTrack} />
            <BeforeAfterSlider />
          </div>
        )}

        {/* Tab 2: City Feed & Incident Radar */}
        {activeTab === 'feed' && (
          <div className="space-y-10 pb-16">
            <HeroSection
              onOpenMap={() => setActiveTab('map')}
              onOpenReport={() => setActiveTab('report')}
              onOpenTrack={(code) => handleNavigateToTrack(code)}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
              <BeforeAfterSlider />

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-orange-400" />
                    <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                      Vadodara Live Incident Stream
                    </h2>
                    <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 font-mono text-xs text-neutral-300">
                      {filteredIssues.length} Incidents
                    </span>
                  </div>

                  {/* Status Filter Pills */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {statusOptions.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedStatus(st.id);
                        }}
                        className={`whitespace-nowrap rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                          selectedStatus === st.id
                            ? 'bg-neutral-200 text-neutral-950 font-bold shadow'
                            : 'border border-white/[0.06] bg-[#0E131E]/80 text-neutral-400 hover:text-white hover:border-white/[0.14]'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter info banner */}
                {(selectedCategory !== 'all' || selectedWard !== 'all' || selectedStatus !== 'all' || searchQuery) && (
                  <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0E131E]/60 px-4 py-2.5 text-xs text-neutral-400">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-3.5 w-3.5 text-orange-400" />
                      <span>
                        Active Filters:{' '}
                        <strong className="text-white">
                          {selectedCategory !== 'all' ? selectedCategory : ''}{' '}
                          {selectedWard !== 'all' ? `Ward ${selectedWard}` : ''}{' '}
                          {selectedStatus !== 'all' ? selectedStatus : ''}{' '}
                          {searchQuery ? `"${searchQuery}"` : ''}
                        </strong>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedCategory('all');
                        setSelectedWard('all');
                        setSelectedStatus('all');
                        setSearchQuery('');
                      }}
                      className="text-orange-400 hover:underline font-bold text-xs"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}

                {/* Incident Cards Grid */}
                {filteredIssues.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIssues.map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        onOpenDetails={(i) => {
                          setActiveIssue(i);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/[0.08] bg-neutral-900/30 p-12 text-center space-y-3">
                    <Layers className="h-8 w-8 text-neutral-600 mx-auto" />
                    <h3 className="text-sm font-bold text-white">No reports match your current filter</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Clear your filters or snap an issue to file a direct report.
                    </p>
                    <button
                      onClick={() => setActiveTab('report')}
                      className="rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-500 shadow-md"
                    >
                      Snap & Report Issue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive GIS Map */}
        {activeTab === 'map' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
            <InteractiveMap onSelectIssue={(i) => setActiveIssue(i)} />
          </div>
        )}

        {/* Tab 4: Points & Rewards Redemption Store */}
        {activeTab === 'rewards' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            <RewardsRedemptionStore />
          </div>
        )}

        {/* Tab 5: Fun Civic Activities & Quests */}
        {activeTab === 'activities' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            <CivicActivitiesSection />
          </div>
        )}

        {/* Tab 6: Track Timeline */}
        {activeTab === 'track' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            <TicketTimelineView initialCode={trackingTargetCode} />
          </div>
        )}
      </main>

      {/* Global Details Modal */}
      <IssueDetailsModal
        issue={activeIssue}
        onClose={() => setActiveIssue(null)}
      />

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CivicDataProvider>
      <MainAppContent />
    </CivicDataProvider>
  );
}
