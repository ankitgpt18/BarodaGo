import {
  AuditLogItem,
  GeoCoordinate,
  IncidentRecord,
  IssueState,
  DefectCategory
} from '../models/types.js';
import { SpatialService } from './spatialService.js';
import { TriageEngine } from './triageEngine.js';
import { LedgerService } from './ledgerService.js';

export interface CreateIncidentDTO {
  citizenPhone: string;
  citizenName?: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  category?: DefectCategory;
  userNotes?: string;
  landmark?: string;
}

export class IncidentService {
  private static incidents: Map<string, IncidentRecord> = new Map();

  /**
   * Seed initial realistic records from Vadodara into store.
   */
  public static initSeed() {
    if (this.incidents.size > 0) return;

    const inc1 = this.createIncident({
      citizenPhone: '+91 98250 11223',
      citizenName: 'Ankit Gupta',
      imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
      latitude: 22.3105,
      longitude: 73.1704,
      category: 'pothole',
      landmark: 'RC Dutt Road, Opp. Inox Cinema, Alkapuri',
      userNotes: 'Dangerous pothole right in the center lane causing evening two-wheeler swerving.'
    });
    inc1.incident.trackingNumber = 'VMC-BDQ-8921';
    this.resolveIncident(
      'VMC-BDQ-8921',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'Rapid bitumen patch completed by Ward 1 Rapid Bitumen Squad.'
    );

    const inc2 = this.createIncident({
      citizenPhone: '+91 97129 44556',
      citizenName: 'Priya Dave',
      imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80',
      latitude: 22.2982,
      longitude: 73.1895,
      category: 'stray_cattle',
      landmark: 'Akota-Dandia Bazar Flyover Ramp',
      userNotes: 'Herd of cattle stationary on fast descent ramp.'
    });
    inc2.incident.trackingNumber = 'VMC-BDQ-7102';

    const inc3 = this.createIncident({
      citizenPhone: '+91 99241 88990',
      citizenName: 'Sanjay Shah',
      imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80',
      latitude: 22.3245,
      longitude: 73.2045,
      category: 'live_wires',
      landmark: 'Bahucharaji Road, Near Amrapali Complex, Karelibaug',
      userNotes: 'Sparking wire hanging at eye level after storm.'
    });
    inc3.incident.trackingNumber = 'VMC-BDQ-9240';
  }

  /**
   * High-concurrency intake endpoint for new citizen civic reports.
   * Performs automatic spatial deduplication, ward routing, triage, and double-entry ledger reward.
   */
  public static createIncident(dto: CreateIncidentDTO): {
    incident: IncidentRecord;
    isDuplicateMerged: boolean;
    pointsAwarded: number;
  } {
    const coords: GeoCoordinate = {
      latitude: dto.latitude,
      longitude: dto.longitude
    };

    const imageHash = TriageEngine.computeImageHash(dto.imageUrl);
    const triage = TriageEngine.analyzeCivicDefect(dto.imageUrl, coords, dto.category);

    // 1. Spatial Deduplication Check (25m threshold)
    const activeIncidents = Array.from(this.incidents.values()).map((i) => ({
      id: i.id,
      trackingNumber: i.trackingNumber,
      category: i.category,
      coordinates: i.coordinates,
      state: i.state
    }));

    const dupCheck = SpatialService.findSpatialDuplicate(
      coords,
      triage.defectCategory,
      activeIncidents,
      25 // 25 meters radius
    );

    // If duplicate detected within 25 meters, merge into existing ticket as corroboration
    if (dupCheck.isDuplicate && dupCheck.matchedIncidentId) {
      const existing = this.incidents.get(dupCheck.matchedIncidentId)!;
      existing.corroborationCount += 1;
      if (!existing.corroboratingCitizens.includes(dto.citizenPhone)) {
        existing.corroboratingCitizens.push(dto.citizenPhone);
      }

      const auditEntry: AuditLogItem = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        state: existing.state,
        actor: dto.citizenName || 'Citizen Corroborator',
        actorRole: 'Citizen Corroboration',
        note: `Corroborated by nearby citizen (${dupCheck.distanceMeters}m away). Urgency reinforced.`
      };
      existing.auditTrail.push(auditEntry);
      existing.updatedAt = new Date().toISOString();

      // Award +20 points for corroboration via double-entry ledger
      const idempotencyKey = `corrob_${existing.id}_${dto.citizenPhone}`;
      LedgerService.postTransaction({
        citizenPhone: dto.citizenPhone,
        citizenName: dto.citizenName,
        amount: 20,
        type: 'EARN_CORROBORATE',
        idempotencyKey,
        referenceId: existing.id,
        description: `Corroborated active incident #${existing.trackingNumber} (${existing.landmark})`
      });

      return {
        incident: existing,
        isDuplicateMerged: true,
        pointsAwarded: 20
      };
    }

    // 2. Ward Point-in-Polygon Resolution
    const assignedWard = SpatialService.resolveWardForCoordinates(coords);

    // 3. Construct Incident Record
    const incidentId = `inc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const trackingNumber = `VMC-BDQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const slaDeadline = new Date(
      now.getTime() + triage.slaTargetHours * 60 * 60 * 1000
    ).toISOString();

    const auditTrail: AuditLogItem[] = [
      {
        id: `aud_init_${Date.now()}`,
        timestamp: now.toISOString(),
        state: 'reported',
        actor: dto.citizenName || 'Citizen Intake',
        actorRole: 'Intake Reporter',
        note: `Incident uploaded with GPS coordinates (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}).`
      },
      {
        id: `aud_triage_${Date.now()}`,
        timestamp: new Date(now.getTime() + 1000).toISOString(),
        state: 'triage_verified',
        actor: 'BarodaGo Neural Triage Engine',
        actorRole: 'Automated AI Inspector',
        note: `Classified as ${triage.categoryLabel} (${triage.confidence}% confidence). Hazard score: ${triage.hazardScore}/100.`
      },
      {
        id: `aud_disp_${Date.now()}`,
        timestamp: new Date(now.getTime() + 2000).toISOString(),
        state: 'dispatched',
        actor: assignedWard.executiveEngineer,
        actorRole: `Executive Engineer - Ward ${assignedWard.wardNumber} (${assignedWard.zone} Zone)`,
        note: `Work order dispatched to VMC ${triage.recommendedDepartment}. SLA countdown: ${triage.slaTargetHours}h.`
      }
    ];

    const incident: IncidentRecord = {
      id: incidentId,
      trackingNumber,
      citizenPhone: dto.citizenPhone,
      citizenName: dto.citizenName || 'Citizen of Vadodara',
      title: `${triage.categoryLabel} near ${dto.landmark || assignedWard.name}`,
      description: dto.userNotes || triage.defectSummary,
      category: triage.defectCategory,
      urgency: triage.urgency,
      state: 'dispatched',
      coordinates: coords,
      wardNumber: assignedWard.wardNumber,
      wardName: assignedWard.name,
      zone: assignedWard.zone,
      assignedEngineer: assignedWard.executiveEngineer,
      assignedDepartment: triage.recommendedDepartment,
      landmark: dto.landmark || `${assignedWard.name} Sector`,
      address: `${assignedWard.name}, Vadodara, Gujarat 390007`,
      originalImageUrl: dto.imageUrl,
      imageHash,
      triage,
      auditTrail,
      corroborationCount: 1,
      corroboratingCitizens: [dto.citizenPhone],
      upvotes: 1,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      slaDeadline,
      isSlaBreached: false
    };

    this.incidents.set(incidentId, incident);

    // 4. Credit Citizen +50 Points via Double-Entry Ledger
    const idempotencyKey = `report_${incidentId}_${dto.citizenPhone}`;
    LedgerService.postTransaction({
      citizenPhone: dto.citizenPhone,
      citizenName: dto.citizenName,
      amount: 50,
      type: 'EARN_REPORT',
      idempotencyKey,
      referenceId: incidentId,
      description: `Reported civic defect #${trackingNumber} (${incident.landmark})`
    });

    return {
      incident,
      isDuplicateMerged: false,
      pointsAwarded: 50
    };
  }

  /**
   * Search / query incidents with high-performance filters.
   */
  public static queryIncidents(params: {
    category?: string;
    wardNumber?: number;
    state?: IssueState;
    search?: string;
    limit?: number;
  }): IncidentRecord[] {
    let result = Array.from(this.incidents.values());

    if (params.category && params.category !== 'all') {
      result = result.filter((i) => i.category === params.category);
    }

    if (params.wardNumber) {
      result = result.filter((i) => i.wardNumber === params.wardNumber);
    }

    if (params.state) {
      result = result.filter((i) => i.state === params.state);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.landmark.toLowerCase().includes(q) ||
          i.trackingNumber.toLowerCase().includes(q) ||
          i.assignedEngineer.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return result.slice(0, params.limit || 50);
  }

  /**
   * Lookup single incident by ticket tracking number (e.g. VMC-BDQ-8921).
   */
  public static findByTrackingNumber(code: string): IncidentRecord | undefined {
    for (const incident of this.incidents.values()) {
      if (incident.trackingNumber.toUpperCase() === code.toUpperCase()) {
        return incident;
      }
    }
    return undefined;
  }

  /**
   * Close and resolve an incident with photographic proof.
   */
  public static resolveIncident(
    trackingNumber: string,
    proofImageUrl: string,
    officerNotes: string
  ): IncidentRecord {
    const incident = this.findByTrackingNumber(trackingNumber);
    if (!incident) {
      throw new Error(`Incident #${trackingNumber} not found.`);
    }

    incident.state = 'resolved';
    incident.resolutionImageUrl = proofImageUrl;
    incident.resolvedAt = new Date().toISOString();
    incident.updatedAt = new Date().toISOString();

    incident.auditTrail.push({
      id: `aud_res_${Date.now()}`,
      timestamp: new Date().toISOString(),
      state: 'resolved',
      actor: incident.assignedEngineer,
      actorRole: `Executive Engineer Ward ${incident.wardNumber}`,
      note: officerNotes || 'Field verification approved. Photographed repair verified.',
      evidenceImageUrl: proofImageUrl
    });

    return incident;
  }
}
