'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { createDatabaseOptions, createRuntimeConfig } = require('../config');

test('disables TLS for a local database by default', () => {
  const options = createDatabaseOptions({
    DATABASE_URL: 'postgresql://localhost:5432/bookstore',
  });

  assert.equal(options.ssl, false);
});

test('maps sslmode=require to encrypted non-verifying TLS', () => {
  const options = createDatabaseOptions({
    DATABASE_URL: 'postgresql://example.com:5432/bookstore?sslmode=require',
  });

  assert.deepEqual(options.ssl, { rejectUnauthorized: false });
  assert.doesNotMatch(options.connectionString, /sslmode/);
});

test('rejects verify-ca because Node performs hostname verification', () => {
  assert.throws(
    () => createDatabaseOptions({
      DATABASE_URL: 'postgresql://example.com:5432/bookstore?sslmode=verify-ca',
      DATABASE_CA_CERT: 'certificate',
    }),
    /Unsupported DATABASE_SSL_MODE/,
  );
});

test('requires a CA for certificate verification', () => {
  assert.throws(
    () => createDatabaseOptions({
      DATABASE_URL: 'postgresql://example.com:5432/bookstore?sslmode=verify-full',
    }),
    /requires DATABASE_CA_CERT/,
  );
});

test('accepts an inline CA for certificate verification', () => {
  const options = createDatabaseOptions({
    DATABASE_URL: 'postgresql://example.com:5432/bookstore?sslmode=verify-full',
    DATABASE_CA_CERT: 'certificate\\nbody',
  });

  assert.deepEqual(options.ssl, {
    ca: 'certificate\nbody',
    rejectUnauthorized: true,
  });
});

test('rejects invalid ports', () => {
  assert.throws(
    () => createRuntimeConfig({ PORT: '70000' }),
    /PORT must be an integer/,
  );
});

test('uses health-check timeouts below the Cluster Mode probe timeout', () => {
  const config = createDatabaseOptions({
    DATABASE_URL: 'postgresql://localhost:5432/bookstore',
  });

  assert.equal(config.connectionTimeoutMillis, 2_000);
  assert.equal(config.healthCheckTimeoutMillis, 2_000);
});

