'use strict';

const { createApp } = require('./app');
const { createRuntimeConfig } = require('./config');
const { createDatabase } = require('./db');
const { createLogger } = require('./logger');

async function start() {
  const logger = createLogger();
  const config = createRuntimeConfig();
  const database = createDatabase(config.database, logger);

  await database.migrate();

  const app = createApp({
    database,
    logger,
    version: config.version,
  });
  const server = app.listen(config.port, () => {
    logger.info('server started', {
      port: config.port,
      version: config.version,
    });
  });

  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 66_000;

  let shuttingDown = false;
  async function shutdown(signal, exitCode = 0) {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;

    logger.info('server shutting down', { signal });

    const forcedExit = setTimeout(() => {
      logger.error('graceful shutdown timed out');
      process.exit(1);
    }, 25_000);
    forcedExit.unref();

    server.close(async (error) => {
      try {
        await database.close();
      } catch (closeError) {
        logger.error('database shutdown failed', {
          error: closeError.message,
        });
        exitCode = 1;
      }

      if (error) {
        logger.error('server shutdown failed', { error: error.message });
        exitCode = 1;
      }

      clearTimeout(forcedExit);
      process.exit(exitCode);
    });
  }

  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('uncaughtException', (error) => {
    logger.error('uncaught exception', {
      error: error.message,
      stack: error.stack,
    });
    shutdown('uncaughtException', 1);
  });
  process.once('unhandledRejection', (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logger.error('unhandled rejection', {
      error: error.message,
      stack: error.stack,
    });
    shutdown('unhandledRejection', 1);
  });
}

start().catch((error) => {
  const logger = createLogger();
  logger.error('server failed to start', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

