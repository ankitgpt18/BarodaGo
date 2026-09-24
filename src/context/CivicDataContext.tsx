import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Issue,
  IssueCategory,
  IssueStatus,
  HeritageQuest,
  FoodHygieneSpot,
  CommunityDrive,
  CitizenChampion,
  WardInfo
} from '../types';
import {
  INITIAL_ISSUES,
  HERITAGE_QUESTS,
  FOOD_HYGIENE_SPOTS,
  COMMUNITY_DRIVES,
  CITIZEN_CHAMPIONS,
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
  setSearchQuery: (query: string) => void;
  
  // Single issue modal inspection
  activeIssue: Issue | null;
  setActiveIssue: (issue: Issue | null) => void;
  
  // Actions
  reportIssue: (newIssue: Omit<Issue, 'id' | 'trackingNumber' | 'createdAt' | 'upvotes' | 'timeline' | 'corroborationsCount' | 'reporterKarmaAwarded'>) => Issue;
  toggleUpvote: (issueId: string) => void;
  corroborateIssue: (issueId: string) => void;
  getIssueByTrackingNumber: (code: string) => Issue | undefined;
  
  // Quests
  quests: HeritageQuest[];
  toggleJoinQuest: (questId: string) => void;
  toggleStopComplete: (questId: string, stopId: string) => void;
  
  // Community Drives
  drives: CommunityDrive[];
  pledgeToDrive: (driveId: string, amount: number) => void;
  
  // Food spots
  foodSpots: FoodHygieneSpot[];
  
  // Leaderboard & Wards
  champions: CitizenChampion[];
  wards: WardInfo[];
  
  // User profile / karma
  userKarma: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  
  // UI modals
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isLookupModalOpen: boolean;
  setIsLookupModalOpen: (open: boolean) => void;
  lookupPresetCode: string;
  setLookupPresetCode: (code: string) => void;

  // City pulse metrics
  metrics: {
    totalOpen: number;
    totalResolved: number;
    avgHours: number;
    activeWards: number;
  };
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

const ISSUES_STORAGE_KEY = 'barodago_issues_v2';
const KARMA_STORAGE_KEY = 'barodago_karma_v2';
const QUESTS_STORAGE_KEY = 'barodago_quests_v2';
const DRIVES_STORAGE_KEY = 'barodago_drives_v2';

export const CivicDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(() => {
    try {
      const saved = localStorage.getItem(ISSUES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return INITIAL_ISSUES;
  });

  const [quests, setQuests] = useState<HeritageQuest[]>(() => {
    try {
      const saved = localStorage.getItem(QUESTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return HERITAGE_QUESTS;
  });

  const [drives, setDrives] = useState<CommunityDrive[]>(() => {
    try {
      const saved = localStorage.getItem(DRIVES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return COMMUNITY_DRIVES;
  });

  const [foodSpots] = useState<FoodHygieneSpot[]>(FOOD_HYGIENE_SPOTS);
  const [champions] = useState<CitizenChampion[]>(CITIZEN_CHAMPIONS);
  const [wards] = useState<WardInfo[]>(VADODARA_WARDS);

  const [userKarma, setUserKarma] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(KARMA_STORAGE_KEY);
      if (saved) return parseInt(saved, 10);
    } catch {
      // fallback
    }
    return 185;
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | 'all'>('all');
  const [selectedWard, setSelectedWard] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);
  const [lookupPresetCode, setLookupPresetCode] = useState<string>('');

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    sound.setEnabled(val);
  };

  useEffect(() => {
    try {
      localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));
    } catch {
      // localStorage quote limit safe catch
    }
  }, [issues]);

  useEffect(() => {
    try {
      localStorage.setItem(KARMA_STORAGE_KEY, userKarma.toString());
    } catch {
      // safe
    }
  }, [userKarma]);

  useEffect(() => {
    try {
      localStorage.setItem(QUESTS_STORAGE_KEY, JSON.stringify(quests));
    } catch {
      // safe
    }
  }, [quests]);

  useEffect(() => {
    try {
      localStorage.setItem(DRIVES_STORAGE_KEY, JSON.stringify(drives));
    } catch {
      // safe
    }
  }, [drives]);

  // Upvote an issue
  const toggleUpvote = (issueId: string) => {
    sound.playClick();
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          const userAlreadyUpvoted = !!item.userUpvoted;
          return {
            ...item,
            upvotes: userAlreadyUpvoted ? item.upvotes - 1 : item.upvotes + 1,
            userUpvoted: !userAlreadyUpvoted
          };
        }
        return item;
      })
    );
  };

  // Corroborate an issue ("I also face this")
  const corroborateIssue = (issueId: string) => {
    sound.playSuccess();
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          return {
            ...item,
            corroborationsCount: item.corroborationsCount + 1,
            upvotes: item.upvotes + 1,
            userUpvoted: true
          };
        }
        return item;
      })
    );
    setUserKarma((k) => k + 10);
  };

  // Report new issue
  const reportIssue = (
    newIssueData: Omit<
      Issue,
      'id' | 'trackingNumber' | 'createdAt' | 'upvotes' | 'timeline' | 'corroborationsCount' | 'reporterKarmaAwarded'
    >
  ): Issue => {
    sound.playSuccess();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `BDQ-2026-${randomSuffix}`;
    const id = `issue-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const createdIssue: Issue = {
      ...newIssueData,
      id,
      trackingNumber,
      createdAt: nowIso,
      upvotes: 1,
      userUpvoted: true,
      corroborationsCount: 1,
      reporterKarmaAwarded: 45,
      timeline: [
        {
          id: `t-${Date.now()}-1`,
          timestamp: 'Just now',
          status: 'reported',
          note: 'Logged via BarodaGO Citizen Portal with geotagged coordinates.',
          actor: 'Citizen App',
          actorRole: 'Citizen Submitter',
          badge: 'Logged'
        },
        {
          id: `t-${Date.now()}-2`,
          timestamp: 'In 3 mins',
          status: 'verified',
          note: `Queued for Ward ${newIssueData.wardNumber} (${newIssueData.wardName}) municipal dispatch.`,
          actor: 'VMC Smart Routing Desk',
          actorRole: 'Automated Dispatch'
        }
      ]
    };

    setIssues((prev) => [createdIssue, ...prev]);
    setUserKarma((prev) => prev + 45);
    return createdIssue;
  };

  const getIssueByTrackingNumber = (code: string): Issue | undefined => {
    const clean = code.trim().toUpperCase();
    return issues.find((i) => i.trackingNumber.toUpperCase() === clean);
  };

  // Toggle Quest Join
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

  // Toggle Stop Complete
  const toggleStopComplete = (questId: string, stopId: string) => {
    sound.playSuccess();
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const updatedStops = q.stops.map((st) => {
            if (st.id === stopId) {
              return { ...st, completed: !st.completed };
            }
            return st;
          });
          const completedCount = updatedStops.filter((st) => st.completed).length;
          const percent = Math.round((completedCount / updatedStops.length) * 100);
          return {
            ...q,
            stops: updatedStops,
            progressPercent: percent
          };
        }
        return q;
      })
    );
    setUserKarma((prev) => prev + 25);
  };

  // Pledge to Community Drive
  const pledgeToDrive = (driveId: string, amount: number) => {
    sound.playSuccess();
    setDrives((prev) =>
      prev.map((d) => {
        if (d.id === driveId) {
          const newRaised = Math.min(d.targetAmount, d.raisedAmount + amount);
          return {
            ...d,
            raisedAmount: newRaised,
            supportersCount: d.supportersCount + (d.userPledged ? 0 : 1),
            userPledged: true,
            status: newRaised >= d.targetAmount ? 'completed' : 'funding'
          };
        }
        return d;
      })
    );
    setUserKarma((prev) => prev + Math.floor(amount / 50));
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
      if (!matchText.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const totalOpen = issues.filter((i) => i.status !== 'resolved').length;
  const totalResolved = issues.filter((i) => i.status === 'resolved').length;

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
        reportIssue,
        toggleUpvote,
        corroborateIssue,
        getIssueByTrackingNumber,
        quests,
        toggleJoinQuest,
        toggleStopComplete,
        drives,
        pledgeToDrive,
        foodSpots,
        champions,
        wards,
        userKarma,
        soundEnabled,
        setSoundEnabled,
        isReportModalOpen,
        setIsReportModalOpen,
        isLookupModalOpen,
        setIsLookupModalOpen,
        lookupPresetCode,
        setLookupPresetCode,
        metrics: {
          totalOpen,
          totalResolved,
          avgHours: 24.8,
          activeWards: 19
        }
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivicData = () => {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error('useCivicData must be used within a CivicDataProvider');
  }
  return context;
};
