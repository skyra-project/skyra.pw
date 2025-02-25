# Base Stage
ARG base=node:22.13.1-alpine
FROM ${base} AS builder

WORKDIR /app

# Essential setup
RUN set -ex && \
    apk add --no-cache \
    jq \
    libc6-compat \
    curl \
    build-base && \
    # Create minimal directory structure
    mkdir -p /base/bin && \
    # Install dumb-init
    wget -O /base/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_"$(uname -m)" && \
    chmod 755 /base/bin/dumb-init

# Install Node.js dependencies and build
COPY package.json pnpm-lock.yaml .npmrc ./
RUN npm install -g corepack@latest && \
    corepack enable && \
    pnpm install --frozen-lockfile --prod

COPY . .
RUN pnpm run build

# Final stage
FROM scratch

# Copy necessary files from builder
COPY --from=builder /base /
COPY --from=builder /lib /
COPY --from=builder /app/.output /app/.output

# Set environment variables
ENV NODE_ENV="production" \
    NODE_OPTIONS="--enable-source-maps" \
    NUXT_TELEMETRY_DISABLED=1

# Create and use non-root user
RUN addgroup -S nonroot && \
    adduser -S nonroot -G nonroot && \
    chown -R nonroot:nonroot /app

USER nonroot
WORKDIR /app

EXPOSE ${PORT}

ENTRYPOINT ["/bin/dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
