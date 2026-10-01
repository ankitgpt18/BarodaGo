import { IncidentService } from './incidentService.js';
import { EventStreamService } from './eventStreamService.js';

export class SlaEscalationService {
  private static timerId: NodeJS.Timeout | null = null;

  public static startEscalationWorker(intervalSeconds = 30): void {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.runEscalationCycle();
    }, intervalSeconds * 1000);

    this.timerId.unref(); // Does not block node process exit
  }

  public static stopEscalationWorker(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Scans active tickets and triggers hierarchical municipal escalation upon SLA expiration.
   */
  public static runEscalationCycle(): { evaluatedCount: number; escalatedCount: number } {
    const activeIncidents = IncidentService.queryIncidents({ limit: 1000 }).filter(
      (i) => i.state !== 'resolved' && i.state !== 'rejected'
    );

    const now = Date.now();
    let escalatedCount = 0;

    for (const incident of activeIncidents) {
      const deadline = new Date(incident.slaDeadline).getTime();

      if (now > deadline && !incident.isSlaBreached) {
        incident.isSlaBreached = true;
        incident.urgency = 'hazard'; // Automatically elevate to top priority
        escalatedCount++;

        incident.auditTrail.push({
          id: `aud_sla_${Date.now()}`,
          timestamp: new Date().toISOString(),
          state: incident.state,
          actor: 'BarodaGo SLA Watchdog Engine',
          actorRole: 'Autonomous SLA Supervisor',
          note: `SLA BREACH DETECTED: Target turnaround (${incident.triage.slaTargetHours}h) expired. Work order escalated to Municipal Commissioner & Vigilance Cell.`
        });

        // Broadcast over SSE wire
        EventStreamService.broadcastEvent({
          type: 'SLA_ESCALATED',
          timestamp: new Date().toISOString(),
          data: {
            trackingNumber: incident.trackingNumber,
            wardNumber: incident.wardNumber,
            assignedEngineer: incident.assignedEngineer,
            slaTargetHours: incident.triage.slaTargetHours
          }
        });
      }
    }

    return { evaluatedCount: activeIncidents.length, escalatedCount };
  }
}
