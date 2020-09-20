FROM node:14-alpine

WORKDIR /workspace

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc .

RUN yarn install --frozen-lockfile --link-duplicates

COPY src/ src/
COPY scripts/ scripts/

RUN yarn build

ENV PORT 8290
EXPOSE 8290

CMD [ "yarn", "start", "-p", "8290" ]