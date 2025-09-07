# syntax=docker/dockerfile:1
FROM node:20.19.0-alpine3.21 AS deps
WORKDIR /app

ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}

# Install system dependencies
RUN apk update && \
    apk add --no-cache git openssh libc6-compat && \
    corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache mount for faster rebuilds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM node:20.19.0-alpine3.21 AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables
ENV NODE_ENV=production
ENV STORYBOOK_BUILD=true

# Enable pnpm and build
RUN corepack enable pnpm && \
    pnpm build-storybook

FROM nginx:alpine AS production
WORKDIR /app

# Copy Storybook build
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Copy custom nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Note: Running as root for simplicity, but nginx will drop privileges internally

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
