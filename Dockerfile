# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/.output /app/.output
COPY --from=build /app/package.json /app/package.json

# Set environment variables
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
