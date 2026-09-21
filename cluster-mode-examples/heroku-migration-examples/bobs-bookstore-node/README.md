# Bob's Used Books

Bob's Used Books is a small Node.js, Express, and PostgreSQL application used by the
Heroku-to-Elastic-Beanstalk-Cluster-Mode migration tutorial.

The same source runs in two places:

- Heroku builds it with the Node.js buildpack and starts the `web` process from
  `Procfile`.
- Elastic Beanstalk Cluster Mode builds the included Dockerfile and runs the resulting
  image on Amazon EKS.

The migration tutorial moves application compute first. Both deployments temporarily
use the same Heroku Postgres database through the `DATABASE_URL` contract.

## Requirements

- Node.js 22
- PostgreSQL

## Run locally

Create a PostgreSQL database, then run:

```bash
export DATABASE_URL="postgresql://localhost:5432/bookstore_development?sslmode=disable"
npm ci
npm test
npm start
```

Open `http://localhost:3000`.

The application creates its single `books` table if it does not already exist. A
PostgreSQL advisory lock serializes that startup migration when several replicas start
at the same time.

## Endpoints

| Path | Purpose |
| --- | --- |
| `/` | Storefront and CRUD interface |
| `/up` | Process liveness; does not call PostgreSQL |
| `/health` | Readiness; returns `503` when PostgreSQL is unavailable |
| `/info` | Non-secret application metadata |
| `/metrics` | Minimal Prometheus-format request counter |

Configure the Beanstalk load-balancer health check and readiness probe to use
`/health`. Configure liveness checks to use `/up`.

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | In deployment | PostgreSQL connection URL |
| `PORT` | No | HTTP port; defaults to `3000` |
| `LOG_LEVEL` | No | `debug`, `info`, `warn`, or `error`; defaults to `info` |
| `APP_VERSION` | No | Version returned by `/info`; defaults to `1.0.0` |
| `DATABASE_SSL_MODE` | No | Overrides the URL's `sslmode` |
| `DATABASE_CA_CERT` | For verified TLS | PEM certificate content |
| `DATABASE_CA_CERT_PATH` | For verified TLS | Path to a PEM certificate |
| `DATABASE_CONNECTION_TIMEOUT_MS` | No | Database connection timeout; defaults to `2000` |
| `DATABASE_HEALTH_TIMEOUT_MS` | No | Readiness query timeout; defaults to `2000` |

Supported SSL modes are:

- `disable` for local plaintext PostgreSQL.
- `require` or `no-verify` for encrypted connections without certificate verification.
- `verify-full` with `DATABASE_CA_CERT` or `DATABASE_CA_CERT_PATH` for certificate
  and hostname verification.

Use certificate verification for production databases whenever the provider supplies a
trusted CA bundle.

## Container

Build and run the image:

```bash
docker build -t bobs-bookstore-node .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="$DATABASE_URL" \
  bobs-bookstore-node
```

The runtime image:

- Uses Node.js 22 on Alpine Linux.
- Installs only production dependencies.
- Runs as the non-root `node` user.
- Uses `/up` for the Docker-compatible image health check. Cluster Mode configures its
  readiness and liveness probes separately, using `/health` and `/up`, respectively.
- Handles `SIGTERM` and closes HTTP and database connections gracefully.

## Security scope

The sample uses parameterized SQL, validates input lengths, escapes rendered values,
limits request-body size, masks database configuration, and emits structured logs.

The storefront is intentionally anonymous so that the migration tutorial can focus on
platform portability. It does not implement authentication, authorization, or CSRF
protection. Add those controls before adapting the sample to accept real users or data.
