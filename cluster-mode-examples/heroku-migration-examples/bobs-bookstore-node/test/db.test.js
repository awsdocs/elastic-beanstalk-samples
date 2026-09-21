'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { createDatabase } = require('../db');

function createPoolDouble() {
  const queries = [];
  let released = false;
  let poolOptions;

  const client = {
    async query(query) {
      queries.push(typeof query === 'string' ? query : query.text);
      return { rows: [], rowCount: 0 };
    },
    release() {
      released = true;
    },
  };

  const pool = {
    on() {},
    async connect() {
      return client;
    },
    async query(query) {
      queries.push(query);
      return { rows: [], rowCount: 0 };
    },
    async end() {},
  };

  return {
    createPool(options) {
      poolOptions = options;
      return pool;
    },
    get poolOptions() {
      return poolOptions;
    },
    queries,
    wasReleased() {
      return released;
    },
  };
}

const logger = {
  debug() {},
  info() {},
  warn() {},
  error() {},
};

test('serializes schema migration with a transaction-scoped advisory lock', async () => {
  const double = createPoolDouble();
  const database = createDatabase({
    connectionString: 'postgresql://localhost/bookstore',
    connectionTimeoutMillis: 2_000,
    healthCheckTimeoutMillis: 2_000,
  }, logger, double.createPool);

  await database.migrate();

  assert.match(double.queries[0], /^BEGIN$/);
  assert.match(double.queries[1], /pg_advisory_xact_lock/);
  assert.match(double.queries[2], /CREATE TABLE IF NOT EXISTS books/);
  assert.match(double.queries[3], /^COMMIT$/);
  assert.equal(double.wasReleased(), true);
});

test('applies bounded connection and health-query timeouts', async () => {
  const double = createPoolDouble();
  const database = createDatabase({
    connectionString: 'postgresql://localhost/bookstore',
    connectionTimeoutMillis: 1_500,
    healthCheckTimeoutMillis: 1_000,
  }, logger, double.createPool);

  await database.healthCheck();

  assert.equal(double.poolOptions.connectionTimeoutMillis, 1_500);
  assert.deepEqual(double.queries[0], {
    text: 'SELECT 1',
    query_timeout: 1_000,
  });
});
