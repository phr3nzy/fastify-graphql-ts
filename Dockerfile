FROM node:12.16.1-alpine3.11 AS builder

WORKDIR /app

# required for node-gyp
RUN apk add --virtual build-dependencies gcc g++ make python-dev

COPY package.json .

# required for argon2
RUN npm i -g node-gyp

RUN yarn install

# some cleanup
RUN apk del build-dependencies

COPY . .

RUN yarn build

FROM node:12.16.1-alpine3.11

WORKDIR /app

COPY --from=builder . .

EXPOSE 3000

CMD ["yarn", "start"]