import { IncidentService } from './incidentService.js';
import { LedgerService } from './ledgerService.js';
import { ContractorQualityService } from './contractorQualityService.js';
import { EventStreamService } from './eventStreamService.js';

export interface SubmitFeedbackDTO {
  trackingNumber: string;
  citizenPhone: string;
  rating: number; // 1 to 5
  isSatisfied: boolean;
  qualityTag: 'smooth_finish' | 'patch_uneven' | 'debris_left' | 'issue_persists' | 'exemplary';
  comment?: string;
  disputePhotoUrl?: string;
}

export interface FeedbackRecord {
  id: string;
  trackingNumber: string;
  citizenPhone: string;
  rating: number;
  isSatisfied: boolean;
  qualityTag: string;
  comment?: string;
  disputePhotoUrl?: string;
  ticketReopened: boolean;
  createdAt: string;
}

export class FeedbackService {
  private static feedbackStore: Map<string, FeedbackRecord[]> = new Map();

  public static submitFeedback(dto: SubmitFeedbackDTO): {
    feedback: FeedbackRecord;
    ticketReopened: boolean;
    pointsAwarded: number;
    message: string;
  } {
    const incident = IncidentService.findByTrackingNumber(dto.trackingNumber);
    if (!incident) {
      throw new Error(`Incident #${dto.trackingNumber} not found.`);
    }

    if (incident.state !== 'resolved') {
      throw new Error(`Feedback can only be submitted on resolved tickets. Current status: ${incident.state}`);
    }

    const feedbackId = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let ticketReopened = false;
    let pointsAwarded = 15;
    let message = 'Thank you for verifying this civic resolution! +15 Civic Points credited to your account.';

    // 1. If citizen is dissatisfied (rating <= 2 or issue persists), RE-OPEN ticket & escalate
    if (dto.rating <= 2 || !dto.isSatisfied || dto.qualityTag === 'issue_persists') {
      ticketReopened = true;
      incident.state = 'in_progress';
      incident.urgency = 'hazard'; // Boost priority
      incident.auditTrail.push({
        id: `aud_reopen_${Date.now()}`,
        timestamp: new Date().toISOString(),
        state: 'in_progress',
        actor: dto.citizenPhone,
        actorRole: 'Citizen Inspector',
        note: `CITIZEN DISPUTE: Resolution rejected by citizen (Rating: ${dto.rating}/5, Tag: ${dto.qualityTag}). Re-opened and escalated to Zonal Executive Engineer.`,
        evidenceImageUrl: dto.disputePhotoUrl
      });

      // Dock contractor quality score
      ContractorQualityService.applyCitizenFeedback('cont-west-bitumen', dto.rating, false);

      message =
        'Your dissatisfaction has been escalated directly to the Zonal Executive Engineer. Ticket re-opened for mandatory re-work.';
    } else {
      // Commend contractor
      ContractorQualityService.applyCitizenFeedback('cont-west-bitumen', dto.rating, true);

      // Award +15 points for citizen verification
      const idempotencyKey = `fb_${dto.trackingNumber}_${dto.citizenPhone}`;
      LedgerService.postTransaction({
        citizenPhone: dto.citizenPhone,
        amount: pointsAwarded,
        type: 'EARN_REPORT',
        idempotencyKey,
        referenceId: feedbackId,
        description: `Submitted quality verification for ticket #${dto.trackingNumber}`
      });
    }

    const feedbackRecord: FeedbackRecord = {
      id: feedbackId,
      trackingNumber: dto.trackingNumber,
      citizenPhone: dto.citizenPhone,
      rating: dto.rating,
      isSatisfied: dto.isSatisfied,
      qualityTag: dto.qualityTag,
      comment: dto.comment,
      disputePhotoUrl: dto.disputePhotoUrl,
      ticketReopened,
      createdAt: new Date().toISOString()
    };

    const existingList = this.feedbackStore.get(dto.trackingNumber) || [];
    existingList.push(feedbackRecord);
    this.feedbackStore.set(dto.trackingNumber, existingList);

    // Broadcast over SSE wire
    EventStreamService.broadcastEvent({
      type: 'FEEDBACK_SUBMITTED',
      timestamp: new Date().toISOString(),
      data: {
        trackingNumber: dto.trackingNumber,
        rating: dto.rating,
        ticketReopened,
        qualityTag: dto.qualityTag
      }
    });

    return {
      feedback: feedbackRecord,
      ticketReopened,
      pointsAwarded: ticketReopened ? 0 : pointsAwarded,
      message
    };
  }

  public static getFeedbackForTicket(trackingNumber: string): FeedbackRecord[] {
    return this.feedbackStore.get(trackingNumber) || [];
  }
}
