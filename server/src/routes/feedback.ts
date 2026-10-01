import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { FeedbackService } from '../services/feedbackService.js';
import { ContractorQualityService } from '../services/contractorQualityService.js';

export const feedbackRouter = Router();

const feedbackSchema = z.object({
  trackingNumber: z.string().min(1, 'trackingNumber required'),
  citizenPhone: z.string().min(10, 'Valid citizen phone required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  isSatisfied: z.boolean(),
  qualityTag: z.enum(['smooth_finish', 'patch_uneven', 'debris_left', 'issue_persists', 'exemplary']),
  comment: z.string().max(500).optional(),
  disputePhotoUrl: z.string().url().optional()
});

/**
 * POST /api/v1/feedback
 * Submit post-resolution verification feedback with automatic dispute re-opening.
 */
feedbackRouter.post('/', (req: Request, res: Response): void => {
  try {
    const parse = feedbackSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: 'Validation Error', details: parse.error.errors });
      return;
    }

    const result = FeedbackService.submitFeedback(parse.data);

    res.status(201).json({
      success: true,
      message: result.message,
      data: result.feedback,
      meta: {
        ticketReopened: result.ticketReopened,
        pointsAwarded: result.pointsAwarded
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Feedback Processing Failed';
    res.status(400).json({ error: message });
  }
});

/**
 * GET /api/v1/feedback/:trackingNumber
 * Retrieve feedback history for a ticket.
 */
feedbackRouter.get('/:trackingNumber', (req: Request, res: Response): void => {
  const { trackingNumber } = req.params;
  const list = FeedbackService.getFeedbackForTicket(trackingNumber);

  res.json({
    success: true,
    count: list.length,
    data: list
  });
});

/**
 * GET /api/v1/feedback/contractors/scorecards
 * Retrieve public contractor accountability ratings.
 */
feedbackRouter.get('/contractors/scorecards', (_req: Request, res: Response): void => {
  const contractors = ContractorQualityService.getContractorList();
  res.json({
    success: true,
    count: contractors.length,
    data: contractors
  });
});
