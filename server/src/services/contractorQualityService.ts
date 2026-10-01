import { GeoCoordinate } from '../models/types.js';
import { SpatialService } from './spatialService.js';

export interface ContractorRecord {
  id: string;
  name: string;
  division: string;
  wardNumber: number;
  totalRepairs: number;
  prematureFailures: number;
  averageCitizenRating: number; // 1.0 - 5.0
  qualityScore: number; // 0 - 100
  status: 'active' | 'probation' | 'blacklisted';
}

export class ContractorQualityService {
  private static contractors: Map<string, ContractorRecord> = new Map();

  public static initSeed() {
    if (this.contractors.size > 0) return;

    this.contractors.set('cont-west-bitumen', {
      id: 'cont-west-bitumen',
      name: 'Gujarat Bitumen Infrastructure Ltd. (West Zone Partner)',
      division: 'Roads & Bridges Division',
      wardNumber: 1,
      totalRepairs: 142,
      prematureFailures: 3,
      averageCitizenRating: 4.6,
      qualityScore: 92,
      status: 'active'
    });

    this.contractors.set('cont-north-grid', {
      id: 'cont-north-grid',
      name: 'Baroda Lumens & Grid Services',
      division: 'Streetlight Maintenance Division',
      wardNumber: 7,
      totalRepairs: 89,
      prematureFailures: 1,
      averageCitizenRating: 4.8,
      qualityScore: 96,
      status: 'active'
    });
  }

  /**
   * Scans previous resolved history to detect premature road collapse within 15m radius in 90 days.
   */
  public static checkPrematureFailure(
    coords: GeoCoordinate,
    resolvedIncidents: Array<{
      id: string;
      trackingNumber: string;
      coordinates: GeoCoordinate;
      resolvedAt?: string;
      assignedDepartment: string;
    }>
  ): { isPrematureFailure: boolean; matchedIncidentNumber?: string; daysSinceResolution?: number } {
    const now = Date.now();
    const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

    for (const incident of resolvedIncidents) {
      if (!incident.resolvedAt) continue;

      const resolvedTime = new Date(incident.resolvedAt).getTime();
      const ageMs = now - resolvedTime;

      // Within 90-day warranty window
      if (ageMs <= NINETY_DAYS_MS) {
        const distance = SpatialService.haversineDistanceMeters(coords, incident.coordinates);

        // Within 15m of previous patch
        if (distance <= 15) {
          const daysSinceResolution = Math.round(ageMs / (1000 * 60 * 60 * 24));
          return {
            isPrematureFailure: true,
            matchedIncidentNumber: incident.trackingNumber,
            daysSinceResolution
          };
        }
      }
    }

    return { isPrematureFailure: false };
  }

  /**
   * Incorporates citizen post-resolution feedback into contractor quality rating.
   */
  public static applyCitizenFeedback(
    contractorId: string,
    rating: number, // 1 to 5
    isIssueFullyResolved: boolean
  ): void {
    const contractor = this.contractors.get(contractorId);
    if (!contractor) return;

    contractor.totalRepairs += 1;
    if (!isIssueFullyResolved) {
      contractor.prematureFailures += 1;
    }

    // Weighted moving average for rating
    contractor.averageCitizenRating =
      (contractor.averageCitizenRating * (contractor.totalRepairs - 1) + rating) /
      contractor.totalRepairs;

    // Quality Score formula factoring failures and citizen rating
    const failurePenalty = (contractor.prematureFailures / contractor.totalRepairs) * 50;
    const ratingContribution = (contractor.averageCitizenRating / 5.0) * 50;

    contractor.qualityScore = Math.max(0, Math.round(ratingContribution - failurePenalty + 50));

    if (contractor.qualityScore < 60) {
      contractor.status = 'probation';
    }
  }

  public static getContractorList(): ContractorRecord[] {
    return Array.from(this.contractors.values());
  }
}
