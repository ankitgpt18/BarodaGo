import { Router, Request, Response } from 'express';

export const healthRouter = Router();
export const metricsRouter = Router();

const startTime = Date.now();

/**
 * GET /health
 * Liveness and readiness probe for Docker / Kubernetes container orchestration.
 */
healthRouter.get('/', (_req: Request, res: Response): void => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    version: '1.0.0',
    service: 'barodago-civic-engine',
    jurisdiction: 'Vadodara Municipal Corporation (VMC)',
    memoryUsage: process.memoryUsage()
  });
});

/**
 * GET /metrics
 * Prometheus text format metrics for observability dashboards (Grafana).
 */
metricsRouter.get('/', (_req: Request, res: Response): void => {
  const uptime = (Date.now() - startTime) / 1000;
  const memory = process.memoryUsage();

  const metrics = `
# HELP barodago_uptime_seconds Total seconds since backend boot
# TYPE barodago_uptime_seconds gauge
barodago_uptime_seconds ${uptime}

# HELP barodago_memory_heap_bytes Node.js process heap memory usage
# TYPE barodago_memory_heap_bytes gauge
barodago_memory_heap_bytes ${memory.heapUsed}

# HELP barodago_vmc_wards_active Total active administrative wards in Vadodara
# TYPE barodago_vmc_wards_active gauge
barodago_vmc_wards_active 19

# HELP barodago_target_dispatch_seconds Expected SLA dispatch duration
# TYPE barodago_target_dispatch_seconds gauge
barodago_target_dispatch_seconds 1080
`.trim();

  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  res.send(metrics);
});
