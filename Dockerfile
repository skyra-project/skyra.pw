FROM node:18-alpine as runner

RUN apk add --no-cache dumb-init

WORKDIR /workspace

ENV HUSKY=0
ENV CI=true

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node src/ src/
COPY --chown=node:node .yarn/ .yarn/

ENV PORT 8281
ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

RUN sed -i 's/"postinstall": "husky install .github\/husky"/"postinstall": ""/' ./package.json

RUN yarn workspaces focus --all --production
RUN chown node:node /workspace

USER node

ENTRYPOINT ["dumb-init", "--"]
CMD [ "yarn", "start", "-p", "8281" ]
