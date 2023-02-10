# Base Stage
FROM node:18-alpine AS base

# Dependencies stage
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat dumb-init
WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

ENV HUSKY=0

ENTRYPOINT ["dumb-init", "--"]

RUN yarn install --immutable

# Builder stage
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY src/ src/
COPY scripts/ scripts/

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/src/public ./src/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/src/.next/standalone ./src/
COPY --from=builder --chown=nextjs:nodejs /app/src/.next/static ./.next/src/static

RUN chown nextjs:nodejs /app

USER nextjs

EXPOSE 8281

ENV PORT 8281
ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

CMD ["node", "server.js"]

