import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/authService.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.js';

export const authRouter = Router();

const requestOtpSchema = z.object({
  phone: z.string().min(10, 'Valid 10-digit mobile number required')
});

const verifyOtpSchema = z.object({
  phone: z.string().min(10),
  otp: z.string().length(6, 'OTP must be 6 digits'),
  name: z.string().optional(),
  role: z.enum(['citizen', 'ward_engineer', 'admin']).optional(),
  wardNumber: z.number().min(1).max(19).optional()
});

/**
 * POST /api/v1/auth/request-otp
 * Dispatches 6-digit verification code to citizen phone.
 */
authRouter.post('/request-otp', (req: Request, res: Response): void => {
  try {
    const parse = requestOtpSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: 'Validation Error', details: parse.error.errors });
      return;
    }

    const result = AuthService.requestOtp(parse.data.phone);
    res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'OTP Dispatch Failed';
    res.status(500).json({ error: message });
  }
});

/**
 * POST /api/v1/auth/verify-otp
 * Verifies code and returns signed JWT Bearer token.
 */
authRouter.post('/verify-otp', (req: Request, res: Response): void => {
  try {
    const parse = verifyOtpSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: 'Validation Error', details: parse.error.errors });
      return;
    }

    const { token, user } = AuthService.verifyOtp(parse.data);
    res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authentication Failed';
    res.status(401).json({ error: message });
  }
});

/**
 * GET /api/v1/auth/me
 * Returns current authenticated user profile from JWT.
 */
authRouter.get('/me', authenticate, (req: AuthenticatedRequest, res: Response): void => {
  res.json({
    success: true,
    user: req.user
  });
});
