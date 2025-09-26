# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build Nuxt app
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy only what’s needed to run
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm ci --omit=dev

EXPOSE 3001

CMD ["node", ".output/server/index.mjs"]
