# Билд
FROM node:18-alpine AS builder
WORKDIR /app

# 1) deps
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline

# 2) исходники
COPY . .

# 3) передать публичный env в момент сборки
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# 4) собрать
RUN npm run build

# Продакшн
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# standalone + static + public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]