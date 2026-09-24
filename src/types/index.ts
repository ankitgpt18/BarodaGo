export type IssueCategory =
  | 'pothole'
  | 'streetlight'
  | 'drainage'
  | 'garbage'
  | 'stray_cattle'
  | 'heritage_parks'
  | 'traffic_signal';

export type IssueStatus =
  | 'reported'
  | 'verified'
  | 'dispatched'
  | 'in_progress'
  | 'resolved';

export type IssueUrgency = 'normal' | 'high' | 'hazard';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  status: IssueStatus;
  note: string;
  actor: string;
  actorRole: string;
  badge?: string;
}

export interface Issue {
  id: string;
  trackingNumber: string; // e.g. BDQ-2026-8921
  title: string;
  description: string;
  category: IssueCategory;
  wardName: string;
  wardNumber: number;
  landmark: string;
  address: string;
  lat: number;
  lng: number;
  status: IssueStatus;
  urgency: IssueUrgency;
  upvotes: number;
  userUpvoted?: boolean;
  corroborationsCount: number;
  createdAt: string;
  resolvedAt?: string;
  estimatedTurnaroundHours: number;
  assignedDepartment: string;
  assignedOfficer: string;
  beforeImageUrl: string;
  afterImageUrl?: string;
  timeline: TimelineEvent[];
  reporterKarmaAwarded: number;
}

export interface QuestStop {
  id: string;
  name: string;
  nameGujarati?: string;
  hint: string;
  lat: number;
  lng: number;
  historicalNote: string;
  completed?: boolean;
}

export interface HeritageQuest {
  id: string;
  title: string;
  titleGujarati: string;
  subtitle: string;
  description: string;
  distanceKm: number;
  estMinutes: number;
  startingPoint: string;
  stopsCount: number;
  karmaReward: number;
  difficulty: 'Easy' | 'Moderate' | 'Scenic Walk';
  imageUrl: string;
  stops: QuestStop[];
  joined?: boolean;
  progressPercent?: number;
}

export interface FoodHygieneSpot {
  id: string;
  name: string;
  area: string;
  specialty: string;
  hygieneRating: number; // e.g. 4.8 / 5
  cleanWaterVerified: boolean;
  dustbinAvailable: boolean;
  inspectedDate: string;
  crowdLevel: 'Low' | 'Moderate' | 'Brisk' | 'Packed';
  verifiedCount: number;
  recommendationNote: string;
  imageUrl: string;
}

export interface CommunityDrive {
  id: string;
  title: string;
  area: string;
  wardNumber: number;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  supportersCount: number;
  status: 'funding' | 'executing' | 'completed';
  organizer: string;
  organizerRole: string;
  vmcPermitNumber: string;
  impactMetrics: string;
  imageUrl: string;
  userPledged?: boolean;
}

export interface CitizenChampion {
  rank: number;
  name: string;
  ward: string;
  karma: number;
  issuesResolved: number;
  streakDays: number;
  badge: string;
  avatarUrl: string;
}

export interface WardInfo {
  wardNumber: number;
  name: string;
  nameGujarati: string;
  officeAddress: string;
  engineerName: string;
  engineerPhone: string;
  activeIssuesCount: number;
  resolvedThisMonth: number;
}
