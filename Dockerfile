FROM node:20
WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./apps/api/package.json ./apps/api/package.json
COPY ./apps/api/yarn.lock ./apps/api/yarn.lock
COPY ./apps/web/package.json ./apps/web/package.json
COPY ./apps/web/yarn.lock ./apps/web/yarn.lock
COPY ./apps/api/prisma ./apps/api/prisma

RUN yarn install

COPY . .

RUN yarn run build

CMD ["node", "apps/api/dist/src/main.js"]
