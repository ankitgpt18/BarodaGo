import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Issue,
  IssueCategory,
  IssueStatus,
  RewardItem,
  RedeemedVoucher,
  CivicQuizQuestion,
  HeritageQuest,
  WardInfo,
  AiVisionAnalysis
} from '../types';
import {
  INITIAL_ISSUES,
  REWARD_ITEMS,
  CIVIC_QUIZ_QUESTIONS,
  HERITAGE_QUESTS,
  VADODARA_WARDS
} from '../data/mockData';
import { sound } from '../utils/sound';

interface CivicContextType {
  issues: Issue[];
  filteredIssues: Issue[];
  selectedCategory: IssueCategory | 'all';
  setSelectedCategory: (cat: IssueCategory | 'all') => void;
  selectedStatus: IssueStatus | 'all';
  setSelectedStatus: (status: IssueStatus | 'all') => void;
  selectedWard: string | 'all';
  setSelectedWard: (ward: string | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Active Issue
  activeIssue: Issue | null;
  setActiveIssue: (issue: Issue | null) => void;

  // Points & Profile
  userPoints: number;
  userName: string;
  userPhone: string;
  userWard: string;
  updateUserProfile: (name: string, phone: string, ward: string) => void;

  // Actions
  reportIssueWithAi: (params: {
    imageUrl: string;
    aiAnalysis: AiVisionAnalysis;
    landmark: string;
    wardName: string;
    wardNumber: number;
    customNote?: string;
  }) => Issue;
  toggleUpvote: (issueId: string) => void;
  corroborateIssue: (issueId: string) => void;
  getIssueByTrackingNumber: (code: string) => Issue | undefined;

  // Rewards Store
  rewards: RewardItem[];
  redeemedVouchers: RedeemedVoucher[];
  redeemReward: (reward: RewardItem) => { success: boolean; voucher?: RedeemedVoucher; error?: string };

  // Fun Activities & Quests
  quizzes: CivicQuizQuestion[];
  answeredQuizIds: string[];
  answerQuiz: (quizId: string, selectedIdx: number) => { isCorrect: boolean; pointsAwarded: number };
  quests: HeritageQuest[];
  toggleJoinQuest: (questId: string) => void;
  toggleStopComplete: (questId: string, stopId: string) => void;

  // Audio & Modals
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isLookupModalOpen: boolean;
  setIsLookupModalOpen: (open: boolean) => void;
  lookupPresetCode: string;
  setLookupPresetCode: (code: string) => void;
  selectedVoucherModal: RedeemedVoucher | null;
  setSelectedVoucherModal: (v: RedeemedVoucher | null) => void;

  // Wards
  wards: WardInfo[];
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

const ISSUES_KEY = 'barodago_issues_v3';
const POINTS_KEY = 'barodago_points_v3';
const VOUCHERS_KEY = 'barodago_vouchers_v3';
const PROFILE_KEY = 'barodago_profile_v3';
const QUIZ_KEY = 'barodago_quiz_v3';

export const CivicDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(() => {
    try {
      const saved = localStorage.getItem(ISSUES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ISSUES;
  });

  const [userPoints, setUserPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(POINTS_KEY);
      if (saved) return parseInt(saved, 10);
    } catch {}
    return 245;
  });

  const [userProfile, setUserProfile] = useState<{ name: string; phone: string; ward: string }>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { name: 'Ankit Gupta', phone: '+91 98250 18400', ward: 'Alkapuri (Ward 1)' };
  });

  const [redeemedVouchers, setRedeemedVouchers] = useState<RedeemedVoucher[]>(() => {
    try {
      const saved = localStorage.getItem(VOUCHERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [answeredQuizIds, setAnsweredQuizIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [quests, setQuests] = useState<HeritageQuest[]>(HERITAGE_QUESTS);
  const [rewards] = useState<RewardItem[]>(REWARD_ITEMS);
  const [quizzes] = useState<CivicQuizQuestion[]>(CIVIC_QUIZ_QUESTIONS);
  const [wards] = useState<WardInfo[]>(VADODARA_WARDS);

  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | 'all'>('all');
  const [selectedWard, setSelectedWard] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);
  const [lookupPresetCode, setLookupPresetCode] = useState<string>('');
  const [selectedVoucherModal, setSelectedVoucherModal] = useState<RedeemedVoucher | null>(null);

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    sound.setEnabled(val);
  };

  useEffect(() => {
    try {
      localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
    } catch {}
  }, [issues]);

  useEffect(() => {
    try {
      localStorage.setItem(POINTS_KEY, userPoints.toString());
    } catch {}
  }, [userPoints]);

  useEffect(() => {
    try {
      localStorage.setItem(VOUCHERS_KEY, JSON.stringify(redeemedVouchers));
    } catch {}
  }, [redeemedVouchers]);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_KEY, JSON.stringify(answeredQuizIds));
    } catch {}
  }, [answeredQuizIds]);

  const updateUserProfile = (name: string, phone: string, ward: string) => {
    setUserProfile({ name, phone, ward });
  };

  // Upvote
  const toggleUpvote = (issueId: string) => {
    sound.playClick();
    setIssues((prev) =>
      prev.map((i) => {
        if (i.id === issueId) {
          const userAlready = !!i.userUpvoted;
          return {
            ...i,
            upvotes: userAlready ? i.upvotes - 1 : i.upvotes + 1,
            userUpvoted: !userAlready
          };
        }
        return i;
      })
    );
  };

  // Corroborate
  const corroborateIssue = (issueId: string) => {
    sound.playSuccess();
    setIssues((prev) =>
      prev.map((i) => {
        if (i.id === issueId) {
          return {
            ...i,
            corroborationsCount: i.corroborationsCount + 1,
            upvotes: i.upvotes + 1,
            userUpvoted: true
          };
        }
        return i;
      })
    );
    setUserPoints((p) => p + 15);
  };

  // Report Issue With AI
  const reportIssueWithAi = ({
    imageUrl,
    aiAnalysis,
    landmark,
    wardName,
    wardNumber,
    customNote
  }: {
    imageUrl: string;
    aiAnalysis: AiVisionAnalysis;
    landmark: string;
    wardName: string;
    wardNumber: number;
    customNote?: string;
  }): Issue => {
    sound.playSuccess();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `VMC-BDQ-${randomSuffix}`;
    const id = `issue-${Date.now()}`;
    const nowIso = new Date().toISOString();
    const pointsAwarded = aiAnalysis.hazardScore > 80 ? 75 : 50;

    const newIssue: Issue = {
      id,
      trackingNumber,
      title: `${aiAnalysis.categoryLabel} near ${landmark}`,
      description: customNote || aiAnalysis.defectSummary,
      category: aiAnalysis.detectedCategory,
      wardName,
      wardNumber,
      landmark,
      address: `${landmark}, Ward ${wardNumber}, Vadodara, Gujarat`,
      lat: 22.3072 + (Math.random() - 0.5) * 0.04,
      lng: 73.1812 + (Math.random() - 0.5) * 0.04,
      status: 'ai_verified',
      urgency: aiAnalysis.urgency,
      upvotes: 1,
      userUpvoted: true,
      corroborationsCount: 1,
      createdAt: nowIso,
      estimatedTurnaroundHours: aiAnalysis.estimatedResolutionHours,
      assignedDepartment: aiAnalysis.recommendedDepartment,
      assignedOfficer: `Er. VMC Ward ${wardNumber} Lead`,
      imageUrl,
      timeline: [
        {
          id: `t-${Date.now()}-1`,
          timestamp: 'Just now',
          status: 'reported',
          note: 'Photo captured and geolocated by citizen via BarodaGO.',
          actor: userProfile.name,
          actorRole: 'Citizen Submitter',
          badge: 'Logged'
        },
        {
          id: `t-${Date.now()}-2`,
          timestamp: '1 second ago',
          status: 'ai_verified',
          note: `AI Vision classified defect: ${aiAnalysis.categoryLabel} (${aiAnalysis.confidence.toFixed(1)}% confidence). Auto-routed to ${aiAnalysis.recommendedDepartment}.`,
          actor: 'BarodaGO Vision AI',
          actorRole: 'Automated Inspection',
          badge: 'AI Verified'
        }
      ],
      aiAnalysis,
      reporterDetails: {
        name: userProfile.name,
        phone: userProfile.phone,
        pointsAwarded
      }
    };

    setIssues((prev) => [newIssue, ...prev]);
    setUserPoints((prev) => prev + pointsAwarded);
    return newIssue;
  };

  const getIssueByTrackingNumber = (code: string): Issue | undefined => {
    const clean = code.trim().toUpperCase();
    return issues.find((i) => i.trackingNumber.toUpperCase() === clean);
  };

  // Redeem Reward
  const redeemReward = (reward: RewardItem): { success: boolean; voucher?: RedeemedVoucher; error?: string } => {
    if (userPoints < reward.pointsCost) {
      return { success: false, error: `Insufficient points! You need ${reward.pointsCost - userPoints} more points.` };
    }

    sound.playSuccess();
    const voucherCode = `BDQ-${reward.category.toUpperCase().slice(0, 3)}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newVoucher: RedeemedVoucher = {
      id: `vouch-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      partner: reward.partner,
      code: voucherCode,
      redeemedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      discountValue: reward.discountValue,
      status: 'active'
    };

    setUserPoints((p) => p - reward.pointsCost);
    setRedeemedVouchers((prev) => [newVoucher, ...prev]);
    return { success: true, voucher: newVoucher };
  };

  // Answer Quiz
  const answerQuiz = (quizId: string, selectedIdx: number) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz || answeredQuizIds.includes(quizId)) {
      return { isCorrect: false, pointsAwarded: 0 };
    }

    const isCorrect = selectedIdx === quiz.correctIndex;
    setAnsweredQuizIds((prev) => [...prev, quizId]);

    if (isCorrect) {
      sound.playSuccess();
      setUserPoints((p) => p + quiz.points);
      return { isCorrect: true, pointsAwarded: quiz.points };
    } else {
      sound.playClick();
      return { isCorrect: false, pointsAwarded: 0 };
    }
  };

  // Quests
  const toggleJoinQuest = (questId: string) => {
    sound.playClick();
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const newJoined = !q.joined;
          return {
            ...q,
            joined: newJoined,
            progressPercent: newJoined ? (q.progressPercent || 0) : 0
          };
        }
        return q;
      })
    );
  };

  const toggleStopComplete = (questId: string, stopId: string) => {
    sound.playSuccess();
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const updated = q.stops.map((st) => (st.id === stopId ? { ...st, completed: !st.completed } : st));
          const completedCount = updated.filter((st) => st.completed).length;
          const percent = Math.round((completedCount / updated.length) * 100);
          return {
            ...q,
            stops: updated,
            progressPercent: percent
          };
        }
        return q;
      })
    );
    setUserPoints((p) => p + 25);
  };

  // Filtered issues
  const filteredIssues = issues.filter((issue) => {
    if (selectedCategory !== 'all' && issue.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus !== 'all' && issue.status !== selectedStatus) {
      return false;
    }
    if (selectedWard !== 'all' && issue.wardName.toLowerCase() !== selectedWard.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${issue.title} ${issue.description} ${issue.landmark} ${issue.wardName} ${issue.trackingNumber}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  return (
    <CivicContext.Provider
      value={{
        issues,
        filteredIssues,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedWard,
        setSelectedWard,
        searchQuery,
        setSearchQuery,
        activeIssue,
        setActiveIssue,
        userPoints,
        userName: userProfile.name,
        userPhone: userProfile.phone,
        userWard: userProfile.ward,
        updateUserProfile,
        reportIssueWithAi,
        toggleUpvote,
        corroborateIssue,
        getIssueByTrackingNumber,
        rewards,
        redeemedVouchers,
        redeemReward,
        quizzes,
        answeredQuizIds,
        answerQuiz,
        quests,
        toggleJoinQuest,
        toggleStopComplete,
        soundEnabled,
        setSoundEnabled,
        isReportModalOpen,
        setIsReportModalOpen,
        isLookupModalOpen,
        setIsLookupModalOpen,
        lookupPresetCode,
        setLookupPresetCode,
        selectedVoucherModal,
        setSelectedVoucherModal,
        wards
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivicData = () => {
  const ctx = useContext(CivicContext);
  if (!ctx) throw new Error('useCivicData must be used within CivicDataProvider');
  return ctx;
};
