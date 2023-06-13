FROM node:lts-alpine AS prepare

WORKDIR /out/src/app
COPY /apps/backend/package.json yarn.lock ./
RUN yarn install

FROM node:lts-alpine AS builder

WORKDIR /out/src/app
COPY --from=prepare /out/src/app/node_modules ./node_modules
COPY /apps/backend/. .
RUN yarn build

FROM node:lts-alpine AS runner

WORKDIR /out/src/app

RUN apk add tzdata
ENV TZ Asia/Bangkok

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 gurateam

COPY --from=builder /out/src/app/package.json .
COPY --from=builder /out/src/app/images ./images
COPY --from=builder /out/src/app/dist ./dist

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start:prod"]
