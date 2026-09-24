import React, { useState } from 'react';
import { CivicDataProvider, useCivicData } from './context/CivicDataContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiVisionReportSection } from './components/AiVisionReportSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { IssueCard } from './components/IssueCard';
import { InteractiveMap } from './components/InteractiveMap';
import { RewardsRedemptionStore } from './components/RewardsRedemptionStore';
import { CivicActivitiesSection } from './components/CivicActivitiesSection';
import { TicketTimelineView } from './components/TicketTimelineView';
import { IssueDetailsModal } from './components/IssueDetailsModal';
import { Footer } from './components/Footer';
import { IssueStatus } from './types';
import {
  Compass,
  Filter,
  Layers,
  Sparkles,
  Gift,
  Search,
  Scan,
  Coins
} from 'lucide-react';
import { sound } from './utils/sound';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('scanner');
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
    setSearchQuery,
    userPoints
  } = useCivicData();

  const handleNavigateToTrack = (code: string) => {
    sound.playClick();
    setTrackingTargetCode(code);
    setActiveTab('track');
  };

  const statusOptions: Array<{ id: IssueStatus | 'all'; label: string }> = [
    { id: 'all', label: 'All Incidents' },
    { id: 'ai_verified', label: 'AI Verified' },
    { id: 'in_progress', label: 'Crew On-Site' },
    { id: 'dispatched', label: 'Work Order Issued' },
    { id: 'resolved', label: 'Resolved & Audited' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Tab 1: AI Vision Scanner (Core upload & analyze intake) */}
        {activeTab === 'scanner' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
            <AiVisionReportSection onNavigateToTrack={handleNavigateToTrack} />
            <BeforeAfterSlider />
          </div>
        )}

        {/* Tab 2: Civic Radar / Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-10 pb-16">
            <HeroSection onOpenMap={() => setActiveTab('map')} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
              <BeforeAfterSlider />

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Compass className="h-4 w-4 text-orange-400" />
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Live Vadodara Citizen Stream
                    </h2>
                    <span className="rounded-full bg-neutral-800 px-2 py-0.5 font-mono text-xs text-neutral-300">
                      {filteredIssues.length} Incidents
                    </span>
                  </div>

                  {/* Status Pills */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {statusOptions.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedStatus(st.id);
                        }}
                        className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                          selectedStatus === st.id
                            ? 'bg-neutral-200 text-neutral-900 font-bold'
                            : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter banner */}
                {(selectedCategory !== 'all' || selectedWard !== 'all' || selectedStatus !== 'all' || searchQuery) && (
                  <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 px-3.5 py-2 text-xs text-neutral-400">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-3.5 w-3.5 text-amber-400" />
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
                      className="text-amber-400 hover:underline font-medium text-[11px]"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}

                {/* Grid */}
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
                  <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-12 text-center space-y-3">
                    <Layers className="h-8 w-8 text-neutral-600 mx-auto" />
                    <h3 className="text-sm font-bold text-white">No reports match your filter</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Use the AI Scanner to upload and file a new municipal report.
                    </p>
                    <button
                      onClick={() => setActiveTab('scanner')}
                      className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500 shadow"
                    >
                      Launch AI Scanner
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

      {/* Footer */}
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
