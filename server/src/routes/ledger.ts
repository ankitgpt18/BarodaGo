import { Router, Request, Response } from 'express';
import { LedgerService } from '../services/ledgerService.js';

export const ledgerRouter = Router();

/**
 * GET /api/v1/ledger/:phone
 * Retrieve a citizen's double-entry account balance and immutable audit history.
 */
ledgerRouter.get('/:phone', (req: Request, res: Response): void => {
  const { phone } = req.params;
  const statement = LedgerService.getAccountStatement(phone);

  res.json({
    success: true,
    data: {
      account: statement.account,
      transactions: statement.transactions
    }
  });
});
