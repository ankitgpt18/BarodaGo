import { Router, Request, Response } from 'express';
import { EventStreamService } from '../services/eventStreamService.js';

export const streamRouter = Router();

/**
 * GET /api/v1/stream/events
 * Real-time Server-Sent Events (SSE) pipe for live municipal dispatches.
 */
streamRouter.get('/events', (req: Request, res: Response): void => {
  EventStreamService.registerClient(res);
});

/**
 * GET /api/v1/stream/stats
 * View active connected listeners.
 */
streamRouter.get('/stats', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    activeListeners: EventStreamService.getActiveClientCount()
  });
});
