export type DefectCategory =
  | 'pothole'
  | 'stray_cattle'
  | 'live_wires'
  | 'water_leak'
  | 'garbage'
  | 'drainage'
  | 'streetlight';

export type UrgencyTier = 'hazard' | 'urgent' | 'normal' | 'low';

export type IssueState =
  | 'reported'
  | 'triage_verified'
  | 'dispatched'
  | 'in_progress'
  | 'resolved'
  | 'rejected'
  | 'duplicate_merged';

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
}

export interface WardBoundary {
  wardNumber: number;
  name: string;
  zone: 'East' | 'West' | 'North' | 'South' | 'Central';
  executiveEngineer: string;
  contactEmail: string;
  depotLocation: string;
  polygon: Array<[number, number]>; // Array of [lat, lng]
}

export interface BoundingBoxDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export interface VisionTriageResult {
  defectCategory: DefectCategory;
  categoryLabel: string;
  confidence: number;
  defectSummary: string;
  technicalDescription: string;
  urgency: UrgencyTier;
  hazardScore: number; // 0 - 100
  recommendedDepartment: string;
  slaTargetHours: number;
  boundingBoxes: BoundingBoxDetection[];
  suggestedTags: string[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  state: IssueState;
  actor: string;
  actorRole: string;
  note: string;
  evidenceImageUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface IncidentRecord {
  id: string;
  trackingNumber: string;
  citizenPhone: string;
  citizenName: string;
  title: string;
  description: string;
  category: DefectCategory;
  urgency: UrgencyTier;
  state: IssueState;
  coordinates: GeoCoordinate;
  wardNumber: number;
  wardName: string;
  zone: string;
  assignedEngineer: string;
  assignedDepartment: string;
  landmark: string;
  address: string;
  originalImageUrl: string;
  resolutionImageUrl?: string;
  imageHash: string; // Perceptual hash for deduplication
  triage: VisionTriageResult;
  auditTrail: AuditLogItem[];
  corroborationCount: number;
  corroboratingCitizens: string[];
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  slaDeadline: string;
  isSlaBreached: boolean;
}

export interface LedgerTransaction {
  id: string;
  citizenPhone: string;
  amount: number;
  balanceAfter: number;
  type: 'EARN_REPORT' | 'EARN_CORROBORATE' | 'EARN_QUIZ' | 'SPEND_REDEEM' | 'ADMIN_ADJUST';
  idempotencyKey: string;
  referenceId: string;
  description: string;
  timestamp: string;
}

export interface CitizenAccount {
  phone: string;
  name: string;
  pointsBalance: number;
  totalEarned: number;
  totalReports: number;
  totalCorroborations: number;
  badges: string[];
  createdAt: string;
}

export interface RewardVoucher {
  id: string;
  voucherCode: string;
  citizenPhone: string;
  rewardId: string;
  rewardTitle: string;
  pointsPaid: number;
  qrPayload: string;
  status: 'active' | 'used' | 'expired';
  expiresAt: string;
  createdAt: string;
}
