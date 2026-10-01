import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { RewardService } from '../services/rewardService.js';
import { LedgerService } from '../services/ledgerService.js';

export const rewardsRouter = Router();

const redeemSchema = z.object({
  citizenPhone: z.string().min(10, 'Valid 10-digit phone number required'),
  rewardId: z.string().min(1, 'rewardId is required'),
  citizenName: z.string().optional()
});

/**
 * GET /api/v1/rewards/catalog
 * Get available municipal rewards and partner perks.
 */
rewardsRouter.get('/catalog', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    data: RewardService.getCatalog()
  });
});

/**
 * POST /api/v1/rewards/redeem
 * Atomically redeem points for a digital voucher pass.
 */
rewardsRouter.post('/redeem', (req: Request, res: Response): void => {
  try {
    const parse = redeemSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: parse.error.errors
      });
      return;
    }

    const { citizenPhone, rewardId, citizenName } = parse.data;
    const voucher = RewardService.redeemReward(citizenPhone, rewardId, citizenName);

    const statement = LedgerService.getAccountStatement(citizenPhone);

    res.status(201).json({
      success: true,
      message: `Successfully redeemed ${voucher.rewardTitle}!`,
      data: voucher,
      meta: {
        remainingBalance: statement.account.pointsBalance
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Redemption Failed';
    res.status(400).json({ error: message });
  }
});

/**
 * GET /api/v1/rewards/vouchers/:phone
 * Retrieve active digital vouchers for a citizen phone.
 */
rewardsRouter.get('/vouchers/:phone', (req: Request, res: Response): void => {
  const { phone } = req.params;
  const vouchers = RewardService.getVouchersByPhone(phone);

  res.json({
    success: true,
    count: vouchers.length,
    data: vouchers
  });
});
