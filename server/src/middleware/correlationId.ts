import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const correlationId =
    (req.headers['x-correlation-id'] as string) ||
    (req.headers['x-request-id'] as string) ||
    randomUUID();

  // Attach to request object and response headers
  (req as unknown as { correlationId: string }).correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  next();
}
