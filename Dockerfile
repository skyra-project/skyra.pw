# Base Stage
FROM --platform=$TARGETPLATFORM node:20-alpine AS base

WORKDIR /home/node/app

# Installa dumb-init per la tua architettura
RUN case "$(arch)" in \
    x86_64) ARCH='x86_64' ;; \
    aarch64) ARCH='aarch64' ;; \
    armv7l) ARCH='armhf' ;; \
    armv6l) ARCH='armel' ;; \
    *) echo "Unsupported architecture: $(arch)"; exit 1 ;; \
    esac \
    && apk add --no-cache dumb-init jq libc6-compat curl

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

COPY ./ ./
COPY scripts/ scripts/

RUN yarn build

# Runner stage
FROM base AS runner

COPY --from=builder /home/node/app/.output /home/node/app/.output

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

RUN chown -R node:node /home/node/app/

USER node

EXPOSE ${PORT}

CMD node .output/server/index.mjs
