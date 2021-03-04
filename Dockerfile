FROM node:14-alpine

WORKDIR /workspace

COPY package.json ./
COPY yarn.lock ./
COPY src/ src/

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --link-duplicates --ignore-scripts --non-interactive --production

ENV PORT 8281
EXPOSE 8281

CMD [ "yarn", "start", "-p", "8281" ]