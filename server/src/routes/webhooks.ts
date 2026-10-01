import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { IncidentService } from '../services/incidentService.js';

export const webhooksRouter = Router();

const inboundWebhookSchema = z.object({
  from: z.string().min(10, 'Valid phone number required'),
  senderName: z.string().optional(),
  body: z.string().optional(),
  mediaUrl: z.string().url('Valid image URL required in webhook payload'),
  latitude: z.number().min(22.0).max(23.0),
  longitude: z.number().min(73.0).max(74.0),
  category: z.enum(['pothole', 'stray_cattle', 'live_wires', 'water_leak', 'garbage', 'drainage', 'streetlight']).optional()
});

/**
 * POST /api/v1/webhooks/whatsapp
 * Headless webhook receiver for WhatsApp Business API / Telegram bot / SMS Gateway.
 */
webhooksRouter.post('/whatsapp', (req: Request, res: Response): void => {
  try {
    const parse = inboundWebhookSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({
        error: 'Invalid Webhook Payload',
        details: parse.error.errors
      });
      return;
    }

    const { from, senderName, body, mediaUrl, latitude, longitude, category } = parse.data;

    const { incident, isDuplicateMerged, pointsAwarded } = IncidentService.createIncident({
      citizenPhone: from,
      citizenName: senderName || 'WhatsApp Citizen Reporter',
      imageUrl: mediaUrl,
      latitude,
      longitude,
      category,
      userNotes: body
    });

    // Formatted WhatsApp response message
    const replyMessage = isDuplicateMerged
      ? `🙏 Namaste ${senderName || 'Citizen'}! Your report at ${incident.landmark} has been merged with active ticket #${incident.trackingNumber}. You earned +${pointsAwarded} Civic Points for corroboration! Track live: http://localhost:5173/?track=${incident.trackingNumber}`
      : `🙏 Namaste ${senderName || 'Citizen'}! Your civic defect report has been registered as ticket #${incident.trackingNumber}. Auto-routed to Ward ${incident.wardNumber} (${incident.zone} Zone, ${incident.assignedEngineer}). SLA: ${incident.triage.slaTargetHours}h. You earned +${pointsAwarded} Civic Points! Track live: http://localhost:5173/?track=${incident.trackingNumber}`;

    res.status(200).json({
      success: true,
      channel: 'whatsapp_cloud_api',
      trackingNumber: incident.trackingNumber,
      to: from,
      replyMessage,
      meta: {
        isDuplicateMerged,
        pointsAwarded,
        ward: incident.wardName,
        engineer: incident.assignedEngineer
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook Processing Failed';
    res.status(500).json({ error: message });
  }
});
