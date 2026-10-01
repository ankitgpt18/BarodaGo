import { Router, Request, Response } from 'express';
import { VADODARA_WARDS_DATA } from '../data/vadodaraWardsGeo.js';
import { SpatialService } from '../services/spatialService.js';

export const wardsRouter = Router();

/**
 * GET /api/v1/wards
 * Retrieve all 19 Vadodara Municipal Corporation ward boundaries and engineer metadata.
 */
wardsRouter.get('/', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    totalWards: VADODARA_WARDS_DATA.length,
    data: VADODARA_WARDS_DATA
  });
});

/**
 * POST /api/v1/wards/resolve
 * Takes { latitude, longitude } and computes the exact VMC ward jurisdiction.
 */
wardsRouter.post('/resolve', (req: Request, res: Response): void => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Numeric latitude and longitude required.'
    });
    return;
  }

  const ward = SpatialService.resolveWardForCoordinates({ latitude, longitude });

  res.json({
    success: true,
    data: ward
  });
});
