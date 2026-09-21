'use strict';

const LEVELS = Object.freeze({
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
});

function createLogger(levelName = process.env.LOG_LEVEL || 'info') {
  const configuredLevel = String(levelName).toLowerCase();
  const threshold = LEVELS[configuredLevel] ?? LEVELS.info;

  function log(level, message, fields = {}) {
    if (LEVELS[level] < threshold) {
      return;
    }

    process.stdout.write(`${JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      logger: 'bobs-bookstore-node',
      ...fields,
    })}\n`);
  }

  return Object.freeze({
    debug: (message, fields) => log('debug', message, fields),
    info: (message, fields) => log('info', message, fields),
    warn: (message, fields) => log('warn', message, fields),
    error: (message, fields) => log('error', message, fields),
  });
}

module.exports = { createLogger };

