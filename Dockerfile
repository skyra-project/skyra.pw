FROM node:14-alpine

WORKDIR /workspace

COPY package.json ./
COPY yarn.lock ./
COPY src/ src/
COPY scripts/ scripts/

RUN yarn install --frozen-lockfile --link-duplicates

RUN yarn build

ENV PORT 8281
EXPOSE 8281

CMD [ "yarn", "start", "-p", "8281" ]