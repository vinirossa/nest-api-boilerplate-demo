# Use Node.js LTS version
FROM node:20-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.6.4 --activate

# Install necessary dependencies for Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["pnpm", "start:prod"]
