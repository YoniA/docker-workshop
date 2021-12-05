# in this dockerfile - multi stage build

# 1. build stage

FROM node:16.13.0-alpine3.12 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# =======================================

# 2. final stage

FROM nginx:1.21.3-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder app/nginx.conf /etc/nginx/conf.d/default.conf

