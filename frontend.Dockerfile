FROM node:lts-alpine AS prepare

RUN apk add --no-cache libc6-compat
WORKDIR /out/src/app
COPY /apps/frontend/package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine AS builder

WORKDIR /out/src/app
COPY --from=prepare /out/src/app/node_modules ./node_modules
COPY /apps/frontend/. .
RUN yarn build

FROM node:lts-alpine AS runner

WORKDIR /out/src/app

RUN apk add tzdata
ENV TZ Asia/Bangkok

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 gurateam

COPY --from=builder /out/src/app/ .

EXPOSE 3001

CMD ["yarn", "start:prod"]
