import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { correlationIdMiddleware } from './middleware/correlationId.js';
import { incidentsRouter } from './routes/incidents.js';
import { wardsRouter } from './routes/wards.js';
import { rewardsRouter } from './routes/rewards.js';
import { ledgerRouter } from './routes/ledger.js';
import { healthRouter, metricsRouter } from './routes/health.js';
import { IncidentService } from './services/incidentService.js';

export function createApp(): Express {
  const app = express();

  // Initialize seed data for Vadodara demo tickets
  IncidentService.initSeed();

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false // Allows API to serve data to frontend
    })
  );

  // CORS for cross-origin frontend communication
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-ID', 'X-Idempotency-Key']
    })
  );

  // Correlation ID for distributed tracing
  app.use(correlationIdMiddleware);

  // Body parser with 10MB limit for image payloads
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Root welcome & API info
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      service: 'BarodaGo Civic Operating Engine API',
      version: '1.0.0',
      description: 'High-concurrency municipal triage and dispatch platform for Vadodara',
      endpoints: {
        health: '/health',
        metrics: '/metrics',
        incidents: '/api/v1/incidents',
        wards: '/api/v1/wards',
        rewards: '/api/v1/rewards',
        ledger: '/api/v1/ledger/:phone'
      }
    });
  });

  // Mount Core Domain Routers
  app.use('/health', healthRouter);
  app.use('/metrics', metricsRouter);
  app.use('/api/v1/incidents', incidentsRouter);
  app.use('/api/v1/wards', wardsRouter);
  app.use('/api/v1/rewards', rewardsRouter);
  app.use('/api/v1/ledger', ledgerRouter);

  // 404 Handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: 'The requested API route does not exist on BarodaGo engine.'
    });
  });

  // Global Error Handler
  app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
    const correlationId = (req as unknown as { correlationId?: string }).correlationId;
    const message = err instanceof Error ? err.message : 'Internal Server Error';

    res.status(500).json({
      error: 'Internal Server Error',
      message,
      correlationId
    });
  });

  return app;
}
