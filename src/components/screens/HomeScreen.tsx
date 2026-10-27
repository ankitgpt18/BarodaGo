import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  Lightbulb, 
  Droplet, 
  Waves, 
  Trees, 
  ChevronRight, 
  SlidersHorizontal,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import AppColors from '../../constants/colors';
import { FontFamily } from '../../constants/typography';
import { useTheme } from '../../context/ThemeContext';
import { AreaScoreCard } from '../cards/AreaScoreCard';
import { FundingCard, FundingProject } from '../cards/FundingCard';
import { CivicIssueCard } from '../cards/CivicIssueCard';
import { useCivicData } from '../../context/CivicDataContext';
import { Issue } from '../../types';

interface HomeScreenProps {
  onSelectCategory?: (category: string) => void;
  onSelectIssue?: (issue: Issue) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenReport?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectCategory,
  onSelectIssue,
  onNavigateTab,
  onOpenReport,
}) => {
  const { theme, colors } = useTheme();
  const { filteredIssues, selectedCategory, setSelectedCategory } = useCivicData();
  const [selectedSort, setSelectedSort] = useState<'nearest' | 'urgent' | 'newest'>('nearest');
  const [pledgeToast, setPledgeToast] = useState<string | null>(null);

  // Sayaji Civic unified sage category icons (Exact Match to Mockup #9)
  const quickCategories = [
    { id: 'pothole', label: 'Pothole', icon: AlertTriangle },
    { id: 'garbage', label: 'Garbage', icon: Trash2 },
    { id: 'streetlight', label: 'Streetlight', icon: Lightbulb },
    { id: 'water_leak', label: 'Water leak', icon: Droplet },
    { id: 'drainage', label: 'Drain', icon: Waves },
    { id: 'parks', label: 'Gardens', icon: Trees },
  ];

  // Community Funding Projects with live state
  const [fundingProjects, setFundingProjects] = useState<FundingProject[]>([
    {
      id: 'fund-1',
      title: 'Footpath repair outside Gotri school',
      description: 'Paver blocks and tactile ramp installation for student safety',
      verifiedBy: 'Verified by ward office',
      currentAmount: 19500,
      targetAmount: 30000,
      contributorsCount: 42,
      contributorInitials: ['P', 'R', 'A'],
      suggestedContribution: 50,
    },
    {
      id: 'fund-2',
      title: 'Solar garden lamps at Sayaji Baug edge',
      description: '12 smart solar luminaires for evening walkers and children',
      verifiedBy: 'Verified by Parks Dept',
      currentAmount: 24600,
      targetAmount: 35000,
      contributorsCount: 56,
      contributorInitials: ['M', 'K', 'S'],
      suggestedContribution: 100,
    },
    {
      id: 'fund-3',
      title: 'Monsoon drain desilting near RC Dutt circle',
      description: 'Prevent flash waterlogging at vital junction',
      verifiedBy: 'Verified by Drainage Eng',
      currentAmount: 14200,
      targetAmount: 18000,
      contributorsCount: 38,
      contributorInitials: ['A', 'D', 'V'],
      suggestedContribution: 50,
    },
  ]);

  const handleContribute = (projectId: string, amount: number) => {
    setFundingProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedAmount = Math.min(p.targetAmount, p.currentAmount + amount);
          const hasAG = p.contributorInitials.includes('AG');
          return {
            ...p,
            currentAmount: updatedAmount,
            contributorsCount: hasAG ? p.contributorsCount : p.contributorsCount + 1,
            contributorInitials: hasAG ? p.contributorInitials : ['AG', ...p.contributorInitials],
          };
        }
        return p;
      })
    );

    const project = fundingProjects.find((p) => p.id === projectId);
    setPledgeToast(`🎉 You pledged ₹${amount} to ${project?.title || 'project'}! Ward 9 matches 1:1.`);
    setTimeout(() => setPledgeToast(null), 3500);
  };

  // Sort issues
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (selectedSort === 'urgent') {
      const urgencyScore = (urgency: string) => (urgency === 'hazard' ? 3 : urgency === 'high' ? 2 : 1);
      return urgencyScore(b.urgency) - urgencyScore(a.urgency);
    }
    if (selectedSort === 'newest') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return 0; // default order (nearest)
  });

  return (
    <div
      className="pb-32 px-4 sm:px-5 space-y-5 select-none min-h-full transition-colors duration-200"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Toast Notification */}
      {pledgeToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#163828] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl border border-emerald-500/30 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles size={14} className="text-amber-400" />
          <span>{pledgeToast}</span>
        </div>
      )}

      {/* 1. Greeting Section */}
      <div className="pt-2">
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors"
          style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
        >
          Hi, Ankit
        </h2>
        <p
          className="text-xs sm:text-sm font-medium mt-0.5 transition-colors"
          style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
        >
          14 issues fixed near you this week
        </p>
      </div>

      {/* 2. Quick Categories Horizontal Row (Unified Civic Sage, Mockup #9) */}
      <div>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? 'all' : (cat.id as any));
                  onSelectCategory?.(cat.id);
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95 group"
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <div
                  className="w-13 h-13 rounded-full flex items-center justify-center transition-all shadow-2xs group-hover:shadow-xs"
                  style={{
                    backgroundColor: isSelected
                      ? colors.primaryContainer
                      : theme === 'dark'
                      ? '#1C3125'
                      : '#DCEEE3',
                    color: isSelected
                      ? '#FFFFFF'
                      : theme === 'dark'
                      ? '#86EFAC'
                      : '#163828',
                    border: `1px solid ${isSelected ? colors.primary : colors.borderLight}`,
                  }}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <span
                  className="text-xs font-semibold tracking-tight transition-colors"
                  style={{
                    fontFamily: FontFamily.body,
                    color: isSelected ? colors.primary : colors.textPrimary,
                  }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Area Score Card */}
      <AreaScoreCard
        wardName="WARD 9"
        score={72}
        total={100}
        delta="+4 this week"
        rank={3}
        totalWards={19}
        onViewScorecard={() => onNavigateTab?.('impact')}
      />

      {/* 4. Fix It Together (Community Crowdfunded Improvements) */}
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h3
              className="text-lg font-bold leading-tight transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Fix it together
            </h3>
            <p
              className="text-xs mt-0.5 transition-colors"
              style={{ fontFamily: FontFamily.body, color: colors.textSecondary }}
            >
              Community funded civic improvements
            </p>
          </div>
          <button
            onClick={() => onNavigateTab?.('impact')}
            className="text-xs font-bold flex items-center gap-0.5 transition-colors"
            style={{
              fontFamily: FontFamily.body,
              color: colors.textSecondary,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
          >
            <span>See all</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {fundingProjects.map((project) => (
            <FundingCard
              key={project.id}
              project={project}
              onContribute={handleContribute}
            />
          ))}
        </div>
      </div>

      {/* 5. Near You Incident Feed */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3
              className="text-lg font-bold leading-tight transition-colors"
              style={{ fontFamily: FontFamily.display, color: colors.textPrimary }}
            >
              Near you
            </h3>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold transition-colors"
              style={{
                fontFamily: FontFamily.mono,
                backgroundColor: colors.sand,
                color: colors.textSecondary,
              }}
            >
              {sortedIssues.length} active
            </span>
          </div>

          {/* Sort Selector */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors"
            style={{
              backgroundColor: colors.sand,
              color: colors.textPrimary,
              border: `1px solid ${colors.borderLight}`,
            }}
          >
            <SlidersHorizontal size={12} />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-transparent border-none text-xs font-bold outline-none cursor-pointer"
              style={{
                fontFamily: FontFamily.body,
                color: colors.textPrimary,
              }}
            >
              <option value="nearest" style={{ backgroundColor: colors.surfaceCard, color: colors.textPrimary }}>
                Nearest
              </option>
              <option value="urgent" style={{ backgroundColor: colors.surfaceCard, color: colors.textPrimary }}>
                Urgent
              </option>
              <option value="newest" style={{ backgroundColor: colors.surfaceCard, color: colors.textPrimary }}>
                Most Confirmed
              </option>
            </select>
          </div>
        </div>

        {/* Issue Cards Stack */}
        <div className="space-y-3">
          {sortedIssues.map((issue) => (
            <CivicIssueCard
              key={issue.id}
              issue={issue}
              onSelect={(selected) => onSelectIssue?.(selected)}
              onTrack={(code) => {
                onNavigateTab?.('track');
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
