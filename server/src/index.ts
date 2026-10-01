import { createApp } from './app.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`
  ======================================================
  🏛️  BarodaGo Civic Intelligence Engine API (Backend)
  📍  Jurisdiction: Vadodara Municipal Corporation (VMC)
  🚀  Live Port: http://localhost:${PORT}
  📡  Health Check: http://localhost:${PORT}/health
  📊  Prometheus: http://localhost:${PORT}/metrics
  ⚡  Ready for High-Concurrency (Million-User Scale)
  ======================================================
  `);
});

// Graceful shutdown handling for container termination
function gracefulShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down BarodaGo backend gracefully...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force shutdown after 10s if hanging
  setTimeout(() => {
    console.error('Forcefully terminating BarodaGo backend after timeout.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
