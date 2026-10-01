import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { IncidentService } from '../services/incidentService.js';
import { createSlidingWindowRateLimiter } from '../middleware/rateLimiter.js';

export const incidentsRouter = Router();

// Rate limiter for incident creation: Max 10 reports per 15 minutes per IP
const incidentRateLimiter = createSlidingWindowRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  message: 'Too many civic reports submitted from this network. Please wait 15 minutes.'
});

// Zod validation schema for incident creation
const createIncidentSchema = z.object({
  citizenPhone: z.string().min(10, 'Valid 10-digit phone number required'),
  citizenName: z.string().optional(),
  imageUrl: z.string().url('Valid image URL required'),
  latitude: z.number().min(22.0).max(23.0, 'Latitude must be within Vadodara metropolitan bounds (~22.2 - 22.4)'),
  longitude: z.number().min(73.0).max(74.0, 'Longitude must be within Vadodara metropolitan bounds (~73.1 - 73.3)'),
  category: z.enum(['pothole', 'stray_cattle', 'live_wires', 'water_leak', 'garbage', 'drainage', 'streetlight']).optional(),
  userNotes: z.string().max(500).optional(),
  landmark: z.string().max(150).optional()
});

/**
 * POST /api/v1/incidents
 * Ingest new citizen report with spatial deduplication and ward routing.
 */
incidentsRouter.post('/', incidentRateLimiter, (req: Request, res: Response): void => {
  try {
    const parseResult = createIncidentSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: parseResult.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
      return;
    }

    const { incident, isDuplicateMerged, pointsAwarded } =
      IncidentService.createIncident(parseResult.data);

    res.status(isDuplicateMerged ? 200 : 201).json({
      success: true,
      message: isDuplicateMerged
        ? 'Duplicate defect detected within 25m! Corroborated existing ticket and awarded points.'
        : 'Civic defect triaged and dispatched to Ward Executive Engineer.',
      data: incident,
      meta: {
        isDuplicateMerged,
        pointsAwarded,
        slaDeadline: incident.slaDeadline
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
});

/**
 * GET /api/v1/incidents
 * Query active civic incidents across Vadodara with filtering.
 */
incidentsRouter.get('/', (req: Request, res: Response): void => {
  try {
    const { category, wardNumber, state, search, limit } = req.query;

    const incidents = IncidentService.queryIncidents({
      category: category as string,
      wardNumber: wardNumber ? Number(wardNumber) : undefined,
      state: state as any,
      search: search as string,
      limit: limit ? Number(limit) : 50
    });

    res.json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
});

/**
 * GET /api/v1/incidents/:trackingNumber
 * Fetch ticket details with full chronological municipal audit trail.
 */
incidentsRouter.get('/:trackingNumber', (req: Request, res: Response): void => {
  try {
    const { trackingNumber } = req.params;
    const incident = IncidentService.findByTrackingNumber(trackingNumber);

    if (!incident) {
      res.status(404).json({
        error: 'Not Found',
        message: `No civic ticket found with code #${trackingNumber}`
      });
      return;
    }

    res.json({
      success: true,
      data: incident
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
});

/**
 * POST /api/v1/incidents/:trackingNumber/resolve
 * Municipal Engineer resolution endpoint requiring verified after-repair photo.
 */
incidentsRouter.post('/:trackingNumber/resolve', (req: Request, res: Response): void => {
  try {
    const { trackingNumber } = req.params;
    const { proofImageUrl, officerNotes } = req.body;

    if (!proofImageUrl) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'proofImageUrl is required to verify municipal resolution.'
      });
      return;
    }

    const resolved = IncidentService.resolveIncident(
      trackingNumber,
      proofImageUrl,
      officerNotes
    );

    res.json({
      success: true,
      message: `Incident #${trackingNumber} verified and resolved.`,
      data: resolved
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
});
