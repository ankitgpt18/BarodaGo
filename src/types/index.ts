export type IssueCategory =
  | 'pothole'
  | 'streetlight'
  | 'water_leak'
  | 'garbage'
  | 'stray_cattle'
  | 'live_wires'
  | 'drainage';

export type IssueStatus =
  | 'reported'
  | 'ai_verified'
  | 'dispatched'
  | 'in_progress'
  | 'resolved';

export type IssueUrgency = 'normal' | 'high' | 'hazard';

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  label: string;
}

export interface AiVisionAnalysis {
  detectedCategory: IssueCategory;
  categoryLabel: string;
  confidence: number;
  defectSummary: string;
  technicalDescription: string;
  urgency: IssueUrgency;
  hazardScore: number; // 1-100
  recommendedDepartment: string;
  estimatedResolutionHours: number;
  boundingBoxes: BoundingBox[];
  suggestedTags: string[];
}

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
  trackingNumber: string; // e.g. VMC-BDQ-8921
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
  imageUrl: string;
  afterImageUrl?: string;
  timeline: TimelineEvent[];
  aiAnalysis?: AiVisionAnalysis;
  reporterDetails: {
    name: string;
    phone: string;
    pointsAwarded: number;
  };
}

export interface RewardItem {
  id: string;
  title: string;
  partner: string;
  pointsCost: number;
  category: 'transit' | 'food' | 'tax_rebate' | 'culture' | 'eco';
  description: string;
  terms: string;
  imageUrl: string;
  discountValue: string;
}

export interface RedeemedVoucher {
  id: string;
  rewardId: string;
  title: string;
  partner: string;
  code: string;
  redeemedAt: string;
  discountValue: string;
  status: 'active' | 'used';
}

export interface CivicQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
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
  stops: Array<{
    id: string;
    name: string;
    hint: string;
    lat: number;
    lng: number;
    historicalNote: string;
    completed?: boolean;
  }>;
  joined?: boolean;
  progressPercent?: number;
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
