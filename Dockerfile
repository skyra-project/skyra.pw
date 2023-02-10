# Base Stage
FROM node:18-alpine AS base

RUN apk add --no-cache dumb-init jq

ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

ENTRYPOINT ["dumb-init", "--"]

# Dependencies stage
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

RUN yarn install --immutable

# Builder stage
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml .
COPY .yarn/ .yarn/
COPY src/ src/
COPY scripts/ scripts/

RUN yarn build

# Runner stage
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package config
COPY --chown=nextjs:node package.json ./
COPY --chown=nextjs:node yarn.lock ./
COPY --chown=nextjs:node .yarnrc.yml .
COPY --chown=nextjs:node .yarn/ .yarn/

# Copy public directory
COPY --from=builder --chown=nextjs:nodejs /app/src/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/src/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/src/.next/static ./.next/static

# Set the production env vars
ENV PORT 8281
ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

# Remove postinstall script to disable husky
RUN jq 'del(.scripts.postinstall)' package.json > package.json.tmp \
    && mv package.json.tmp package.json

# Install production dependencies only
RUN yarn workspaces focus --all --production

# Ensure proper ownership
RUN chown nextjs:nodejs /app

# Switch to NextJs user
USER nextjs

# Expose the port
EXPOSE 8281

CMD ["node", "server.js"]
