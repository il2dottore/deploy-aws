FROM node:24-bookworm-slim AS dependencies

WORKDIR /app

RUN npm install --global pnpm@11.15.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile


FROM dependencies AS builder

COPY . .
RUN node scripts/build.js


FROM node:24-bookworm-slim AS production

ENV NODE_ENV=production
WORKDIR /app

RUN npm install --global pnpm@11.15.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile && pnpm store prune

COPY --from=builder /app/dist ./dist

USER node

CMD ["node", "dist/apps/auth/main.js"]
