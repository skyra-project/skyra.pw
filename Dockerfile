FROM --platform=linux/amd64 node:17-alpine

RUN apk add --no-cache dumb-init

WORKDIR /workspace

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src/ src/

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --link-duplicates --ignore-scripts --non-interactive --production

ENV PORT 8281
EXPOSE 8281

USER node

CMD [ "dumb-init", "yarn", "start", "-p", "8281" ]
