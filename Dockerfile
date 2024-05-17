# Base Stage
FROM node:20-alpine AS base

WORKDIR /home/node/app

RUN apk add --no-cache dumb-init jq libc6-compat curl

ENV YARN_DISABLE_GIT_HOOKS=1
ENV NUXT_TELEMETRY_DISABLED=1

ENTRYPOINT ["dumb-init", "--"]

# Dependencies stage
FROM base AS builder

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

RUN yarn install --immutable

COPY src/ src/
COPY scripts/ scripts/

RUN yarn build

# Runner stage
FROM base AS runner

COPY --from=builder --chown=node:node /home/node/app/src/public ./src/public
COPY --from=builder --chown=node:node /home/node/app/src/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/app/src/.next/static ./src/.next/static

ENV PORT 8281
ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

RUN chown -R node:node /home/node/app/

USER node

EXPOSE 8281

CMD HOSTNAME="0.0.0.0" node src/server.js
