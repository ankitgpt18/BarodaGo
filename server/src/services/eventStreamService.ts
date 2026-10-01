import { Response } from 'express';

export interface CivicEventPayload {
  type:
    | 'TICKET_CREATED'
    | 'TICKET_CORROBORATED'
    | 'TICKET_DISPATCHED'
    | 'TICKET_RESOLVED'
    | 'SLA_ESCALATED'
    | 'PREMATURE_FAILURE_DETECTED'
    | 'FEEDBACK_SUBMITTED';
  timestamp: string;
  data: Record<string, unknown>;
}

export class EventStreamService {
  private static clients: Set<Response> = new Set();

  public static registerClient(res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    this.clients.add(res);

    // Initial greeting handshake event
    const initEvent: CivicEventPayload = {
      type: 'TICKET_CREATED',
      timestamp: new Date().toISOString(),
      data: { message: 'Connected to BarodaGo Live Municipal Dispatch Wire' }
    };
    res.write(`data: ${JSON.stringify(initEvent)}\n\n`);

    res.on('close', () => {
      this.clients.delete(res);
    });
  }

  public static broadcastEvent(event: CivicEventPayload): void {
    const payloadString = `data: ${JSON.stringify(event)}\n\n`;
    for (const client of this.clients) {
      try {
        client.write(payloadString);
      } catch {
        this.clients.delete(client);
      }
    }
  }

  public static getActiveClientCount(): number {
    return this.clients.size;
  }
}

// Keep-alive heartbeat ping every 20s
setInterval(() => {
  for (const client of (EventStreamService as any).clients || []) {
    try {
      client.write(': ping\n\n');
    } catch {
      // Handled on close
    }
  }
}, 20000).unref();
