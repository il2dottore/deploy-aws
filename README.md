<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Microservices (Extracted from LoadService!)

A NestJS monorepo containing the authentication and file-upload services, plus shared libraries and local infrastructure for PostgreSQL, Redis, and RabbitMQ.

## Project structure

```text
nestjs-microservices/
├── apps/                         # Deployable NestJS applications
│   ├── auth/                     # Authentication, users, roles, and permissions
│   └── upload/                   # File-upload API and storage integration
├── libs/                         # Shared libraries imported by applications
│   ├── auth/                     # JWT strategies, guards, and decorators
│   ├── common/                   # Shared DTOs, filters, interceptors, and entities
│   ├── config/                   # Environment-backed application configuration
│   ├── database/                 # TypeORM/PostgreSQL module
│   ├── redis/                    # Redis client module and constants
│   └── storage/                  # S3 and Cloudinary integrations
├── docker/                       # Container initialization scripts and SQL
├── scripts/                      # Build and database seeding utilities
├── Dockerfile                    # Multi-stage production image
├── docker-compose.yml            # Applications and local infrastructure
├── nest-cli.json                 # Monorepo applications and build settings
├── webpack.config.js             # Webpack aliases and Nest build configuration
├── tsconfig.json                 # Shared TypeScript compiler configuration
├── pnpm-workspace.yaml           # pnpm workspace definition
└── .env.example                 # Environment variable template
```

Each application has its own `main.ts`, module tree, controllers, services, and entities under `apps/<name>/src`. Shared code belongs in `libs` so it can be reused without duplicating infrastructure or authentication logic.

## Project setup

```bash
pnpm install
```

## Run with Docker Compose

Copy `.env.example` to `.env`, update the secrets, and start the services:

```bash
docker compose up --build -d
```

- Auth Swagger: `http://localhost:3001/docs`
- Upload Swagger: `http://localhost:3002/docs`
- RabbitMQ management UI: `http://localhost:15672`

## Build and run locally

```bash
pnpm start:dev
pnpm build
pnpm start:prod
```

The build script automatically discovers and builds every application declared in `nest-cli.json`.
