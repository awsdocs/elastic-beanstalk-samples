'use strict';

const { Pool } = require('pg');

function createDatabase(options, logger, createPool = (poolOptions) => new Pool(poolOptions)) {
  const {
    healthCheckTimeoutMillis,
    ...poolOptions
  } = options;
  const pool = createPool({
    ...poolOptions,
    max: 10,
    idleTimeoutMillis: 30_000,
  });

  pool.on('error', (error) => {
    logger.warn('idle database client error', {
      error: error.message,
    });
  });

  async function migrate() {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query(`
        SELECT pg_advisory_xact_lock(
          hashtext(current_database()),
          hashtext('bobs-bookstore-node-schema-v1')
        )
      `);
      await client.query(`
        CREATE TABLE IF NOT EXISTS books (
          id         SERIAL PRIMARY KEY,
          title      VARCHAR(200) NOT NULL,
          author     VARCHAR(200) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);
      await client.query('COMMIT');
    } catch (error) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        logger.warn('database migration rollback failed', {
          error: rollbackError.message,
        });
      }
      throw error;
    } finally {
      client.release();
    }
  }

  async function healthCheck() {
    await pool.query({
      text: 'SELECT 1',
      query_timeout: healthCheckTimeoutMillis,
    });
  }

  async function listBooks(searchTerm = '') {
    if (!searchTerm) {
      const result = await pool.query('SELECT * FROM books ORDER BY id');
      return result.rows;
    }

    const result = await pool.query(
      `SELECT * FROM books
       WHERE title ILIKE $1 OR author ILIKE $1
       ORDER BY id`,
      [`%${searchTerm}%`],
    );
    return result.rows;
  }

  async function getBook(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async function createBook(title, author) {
    await pool.query(
      'INSERT INTO books (title, author) VALUES ($1, $2)',
      [title, author],
    );
  }

  async function updateBook(id, title, author) {
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, updated_at = now()
       WHERE id = $3`,
      [title, author, id],
    );
    return result.rowCount > 0;
  }

  async function deleteBook(id) {
    const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  async function close() {
    await pool.end();
  }

  return Object.freeze({
    migrate,
    healthCheck,
    listBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    close,
  });
}

module.exports = { createDatabase };
