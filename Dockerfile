# Stage 1: Build

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=.env

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install ONLY production dependencies
RUN npm install --only=production

# Expose the application port (NestJS defaults to 3000)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]