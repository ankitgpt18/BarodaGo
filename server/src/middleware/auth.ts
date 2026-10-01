import { Request, Response, NextFunction } from 'express';
import { AuthService, UserTokenPayload } from '../services/authService.js';

export interface AuthenticatedRequest extends Request {
  user?: UserTokenPayload;
}

/**
 * Enforces mandatory Bearer token authentication.
 */
export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Expected: Bearer <JWT>'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = AuthService.verifyToken(token);
    req.user = user;
    next();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid Token';
    res.status(401).json({ error: 'Unauthorized', message });
  }
}

/**
 * Role-Based Access Control (RBAC) guard.
 */
export function requireRole(...allowedRoles: Array<'citizen' | 'ward_engineer' | 'admin'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized', message: 'Authentication required.' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden',
        message: `Access denied. Required role(s): [${allowedRoles.join(', ')}]. Your role: ${req.user.role}`
      });
      return;
    }

    next();
  };
}

/**
 * Optional authentication: attaches user if valid token present, otherwise proceeds as guest.
 */
export function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      req.user = AuthService.verifyToken(token);
    } catch {
      // Ignore invalid token for optional endpoints
    }
  }
  next();
}
