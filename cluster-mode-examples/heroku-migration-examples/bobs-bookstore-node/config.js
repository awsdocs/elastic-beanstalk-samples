'use strict';

const fs = require('node:fs');

function parsePositiveInteger(value, fallback, name) {
  const parsed = Number.parseInt(value || String(fallback), 10);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 60_000) {
    throw new Error(`${name} must be an integer from 1 through 60000`);
  }

  return parsed;
}

function readCertificate(env) {
  if (env.DATABASE_CA_CERT) {
    return env.DATABASE_CA_CERT.replace(/\\n/g, '\n');
  }

  if (env.DATABASE_CA_CERT_PATH) {
    return fs.readFileSync(env.DATABASE_CA_CERT_PATH, 'utf8');
  }

  return undefined;
}

function createDatabaseOptions(env = process.env) {
  const connectionString =
    env.DATABASE_URL || 'postgresql://localhost:5432/bookstore_development';
  const parsed = new URL(connectionString);
  const localHost = ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname);
  const sslMode = (
    env.DATABASE_SSL_MODE ||
    parsed.searchParams.get('sslmode') ||
    (localHost ? 'disable' : 'require')
  ).toLowerCase();

  parsed.searchParams.delete('sslmode');
  parsed.searchParams.delete('sslcert');
  parsed.searchParams.delete('sslkey');
  parsed.searchParams.delete('sslrootcert');

  const commonOptions = {
    connectionString: parsed.toString(),
    connectionTimeoutMillis: parsePositiveInteger(
      env.DATABASE_CONNECTION_TIMEOUT_MS,
      2_000,
      'DATABASE_CONNECTION_TIMEOUT_MS',
    ),
    healthCheckTimeoutMillis: parsePositiveInteger(
      env.DATABASE_HEALTH_TIMEOUT_MS,
      2_000,
      'DATABASE_HEALTH_TIMEOUT_MS',
    ),
  };

  if (sslMode === 'disable') {
    return {
      ...commonOptions,
      ssl: false,
    };
  }

  if (!['require', 'no-verify', 'verify-full'].includes(sslMode)) {
    throw new Error(`Unsupported DATABASE_SSL_MODE: ${sslMode}`);
  }

  const ca = readCertificate(env);
  const verifyCertificate = sslMode === 'verify-full';

  if (verifyCertificate && !ca) {
    throw new Error(
      `${sslMode} requires DATABASE_CA_CERT or DATABASE_CA_CERT_PATH`,
    );
  }

  return {
    ...commonOptions,
    ssl: verifyCertificate
      ? { ca, rejectUnauthorized: true }
      : { rejectUnauthorized: false },
  };
}

function createRuntimeConfig(env = process.env) {
  const port = Number.parseInt(env.PORT || '3000', 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer from 1 through 65535');
  }

  return Object.freeze({
    port,
    version: env.APP_VERSION || '1.0.0',
    database: createDatabaseOptions(env),
  });
}

module.exports = {
  createDatabaseOptions,
  createRuntimeConfig,
};
