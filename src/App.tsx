import React, { useState } from 'react';
import { CivicDataProvider, useCivicData } from './context/CivicDataContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { IssueCard } from './components/IssueCard';
import { InteractiveMap } from './components/InteractiveMap';
import { HeritageQuestsSection } from './components/HeritageQuestsSection';
import { FoodAndHygieneSection } from './components/FoodAndHygieneSection';
import { CommunityDrivesSection } from './components/CommunityDrivesSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { IssueReportModal } from './components/IssueReportModal';
import { IssueDetailsModal } from './components/IssueDetailsModal';
import { TicketLookupModal } from './components/TicketLookupModal';
import { Footer } from './components/Footer';
import { Issue, IssueStatus } from './types';
import {
  Compass,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  Filter,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
  HardHat
} from 'lucide-react';
import { sound } from './utils/sound';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('feed');
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
    setIsReportModalOpen
  } = useCivicData();

  const statusOptions: Array<{ id: IssueStatus | 'all'; label: string; count?: number }> = [
    { id: 'all', label: 'All Incidents' },
    { id: 'reported', label: 'Triage Pending' },
    { id: 'in_progress', label: 'Crew On-Site' },
    { id: 'dispatched', label: 'Work Order Issued' },
    { id: 'resolved', label: 'Resolved & Audited' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'feed' && (
          <div className="space-y-10 pb-16">
            {/* Hero Section */}
            <HeroSection onOpenMap={() => setActiveTab('map')} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
              {/* Featured Showcase: Interactive Before/After Repair Slider */}
              <BeforeAfterSlider />

              {/* Live Incident Stream & Filter Bar */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Compass className="h-4 w-4 text-orange-400" />
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Live Vadodara Citizen Stream
                    </h2>
                    <span className="rounded-full bg-neutral-800 px-2 py-0.5 font-mono text-xs text-neutral-300">
                      {filteredIssues.length} Active
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

                {/* Filter info banner if filters are active */}
                {(selectedCategory !== 'all' || selectedWard !== 'all' || selectedStatus !== 'all' || searchQuery) && (
                  <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 px-3.5 py-2 text-xs text-neutral-400">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-3.5 w-3.5 text-amber-400" />
                      <span>
                        Filtered by:{' '}
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

                {/* Issues Grid */}
                {filteredIssues.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIssues.map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        onOpenDetails={(i) => setActiveIssue(i)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-12 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400">
                      <Layers className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      No civic reports match your filter
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Try clearing search parameters or submit a new report for your Vadodara neighborhood.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedWard('all');
                        setSelectedStatus('all');
                        setSearchQuery('');
                      }}
                      className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Quick Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
                <div
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('quests');
                  }}
                  className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-[#0F141F] to-[#121927] p-5 cursor-pointer hover:border-emerald-600/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Sayaji Quests</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    Gaekwad Heritage Walking Trails
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    Walk royal century monuments, log heritage banyans in Sayajibaug, and earn civic discovery karma.
                  </p>
                </div>

                <div
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('food');
                  }}
                  className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-[#0F141F] to-[#121927] p-5 cursor-pointer hover:border-rose-600/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-1.5 text-xs font-semibold text-rose-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Food Cleanliness</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-rose-400 transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    Sev Usal & Peda Hygiene Radar
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    Citizen and health inspector audits for dustbins, clean water, and fresh oil rotation across Mandvi and Raopura.
                  </p>
                </div>

                <div
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('community');
                  }}
                  className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-[#0F141F] to-[#121927] p-5 cursor-pointer hover:border-sky-600/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-1.5 text-xs font-semibold text-sky-400">
                      <HardHat className="h-3.5 w-3.5" />
                      <span>Citizen Micro-Drives</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    Crowdfund Blind-Curve Mirrors
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    Small municipal projects funded collaboratively by residents and sanctioned by VMC engineers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Map Tab */}
        {activeTab === 'map' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
            <InteractiveMap onSelectIssue={(i) => setActiveIssue(i)} />
          </div>
        )}

        {/* Heritage Quests Tab */}
        {activeTab === 'quests' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
            <HeritageQuestsSection />
          </div>
        )}

        {/* Food & Hygiene Tab */}
        {activeTab === 'food' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
            <FoodAndHygieneSection />
          </div>
        )}

        {/* Community Drives Tab */}
        {activeTab === 'community' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
            <CommunityDrivesSection />
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
            <LeaderboardSection />
          </div>
        )}
      </main>

      {/* Global Interactive Modals */}
      <IssueReportModal />
      <IssueDetailsModal
        issue={activeIssue}
        onClose={() => setActiveIssue(null)}
      />
      <TicketLookupModal
        onInspectIssue={(i) => setActiveIssue(i)}
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
