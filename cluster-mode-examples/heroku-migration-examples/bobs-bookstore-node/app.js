'use strict';

const crypto = require('node:crypto');
const express = require('express');
const { editPage, indexPage } = require('./views');

const MAX_FIELD_LENGTH = 200;
const REQUEST_ID_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/;

function validateBook(body) {
  const title = String(body.title || '').trim();
  const author = String(body.author || '').trim();

  if (!title || !author) {
    return { error: 'Title and author are required.' };
  }

  if (title.length > MAX_FIELD_LENGTH || author.length > MAX_FIELD_LENGTH) {
    return { error: `Title and author must be ${MAX_FIELD_LENGTH} characters or fewer.` };
  }

  return { title, author };
}

function parseBookId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function createApp({ database, logger, version = '1.0.0' }) {
  const app = express();
  let requestsTotal = 0;

  app.disable('x-powered-by');
  app.use(express.urlencoded({
    extended: false,
    limit: '16kb',
    parameterLimit: 20,
  }));

  app.use((request, response, next) => {
    const suppliedRequestId = request.get('x-request-id');
    const requestId = suppliedRequestId && REQUEST_ID_PATTERN.test(suppliedRequestId)
      ? suppliedRequestId
      : crypto.randomUUID();
    const startedAt = Date.now();

    response.set({
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-Request-Id': requestId,
    });

    response.on('finish', () => {
      const log = ['/up', '/health'].includes(request.path)
        ? logger.debug
        : logger.info;
      log('request completed', {
        request_id: requestId,
        method: request.method,
        path: request.path,
        status: response.statusCode,
        duration_ms: Date.now() - startedAt,
      });
    });

    requestsTotal += 1;
    next();
  });

  app.get('/up', (_request, response) => {
    response.type('text/plain').send('OK');
  });

  app.get('/health', async (_request, response) => {
    try {
      await database.healthCheck();
      response.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.warn('database health check failed', { error: error.message });
      response.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      });
    }
  });

  app.get('/info', (_request, response) => {
    response.json({
      name: 'bobs-bookstore-node',
      version,
      language: 'nodejs',
      framework: 'express',
      database_url: process.env.DATABASE_URL ? 'configured' : 'not configured',
    });
  });

  app.get('/metrics', (_request, response) => {
    response.type('text/plain').send(
      '# HELP http_requests_total Total HTTP requests handled.\n' +
      '# TYPE http_requests_total counter\n' +
      `http_requests_total ${requestsTotal}\n`,
    );
  });

  app.get('/', async (request, response, next) => {
    try {
      const searchTerm = String(request.query.q || '').trim().slice(0, MAX_FIELD_LENGTH);
      const books = await database.listBooks(searchTerm);
      response.send(indexPage(books, searchTerm, request.query.flash));
    } catch (error) {
      next(error);
    }
  });

  app.post('/books', async (request, response, next) => {
    const book = validateBook(request.body);
    if (book.error) {
      response.status(400).send(book.error);
      return;
    }

    try {
      await database.createBook(book.title, book.author);
      response.redirect(303, '/?flash=Book%20added');
    } catch (error) {
      next(error);
    }
  });

  app.get('/books/:id/edit', async (request, response, next) => {
    const id = parseBookId(request.params.id);
    if (!id) {
      response.status(404).send('Book not found.');
      return;
    }

    try {
      const book = await database.getBook(id);
      if (!book) {
        response.status(404).send('Book not found.');
        return;
      }
      response.send(editPage(book));
    } catch (error) {
      next(error);
    }
  });

  app.post('/books/:id', async (request, response, next) => {
    const id = parseBookId(request.params.id);
    const book = validateBook(request.body);

    if (!id) {
      response.status(404).send('Book not found.');
      return;
    }

    if (book.error) {
      response.status(400).send(book.error);
      return;
    }

    try {
      const updated = await database.updateBook(id, book.title, book.author);
      if (!updated) {
        response.status(404).send('Book not found.');
        return;
      }
      response.redirect(303, '/?flash=Book%20updated');
    } catch (error) {
      next(error);
    }
  });

  app.post('/books/:id/delete', async (request, response, next) => {
    const id = parseBookId(request.params.id);
    if (!id) {
      response.status(404).send('Book not found.');
      return;
    }

    try {
      const deleted = await database.deleteBook(id);
      if (!deleted) {
        response.status(404).send('Book not found.');
        return;
      }
      response.redirect(303, '/?flash=Book%20removed');
    } catch (error) {
      next(error);
    }
  });

  app.use((_request, response) => {
    response.status(404).send('Not found.');
  });

  app.use((error, request, response, _next) => {
    logger.error('request failed', {
      request_id: response.get('X-Request-Id'),
      method: request.method,
      path: request.path,
      error: error.message,
    });
    response.status(500).send('Something went wrong.');
  });

  return app;
}

module.exports = {
  createApp,
  parseBookId,
  validateBook,
};
