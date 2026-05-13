FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
ENV HOST=0.0.0.0 PORT=4321 NODE_ENV=production
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
