# Nest.js API Boilerplate - Quick Start Guide

This guide will help you get started with the Nest.js API Boilerplate quickly.

## Prerequisites

Make sure you have installed:
- Node.js 20+
- pnpm 10.6.4+
- Docker and Docker Compose

## Quick Start (5 minutes)

### One-Command Setup

```bash
# First time setup - installs dependencies, installs git hooks, starts database, runs migrations and seeds
pnpm bootstrap

# After initialization, start the dev server
pnpm dev
```

**What `pnpm bootstrap` does:**
1. ✅ Installs all dependencies
2. ✅ Installs git hooks (Lefthook)
3. ✅ Starts PostgreSQL with Docker
4. ✅ **Waits for PostgreSQL to be ready** (using `wait-on`)
5. ✅ Runs database migrations
6. ✅ Seeds database with test data

> 💡 **Cross-platform:** Works on Windows, macOS, and Linux!

### Manual Setup (if preferred)

#### 1. Setup Environment

```bash
# Install dependencies
pnpm install

# Install git hooks (for commit validation)
npx lefthook install

# Setup environment variables
cp .env.example .env

# Tip: If you skip this step, the app will auto-create .env
# from .env.example on local startup
```

#### 2. Start Database

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Wait for database to be ready (manual approach)
# Tip: bootstrap does this automatically with wait-on
npx --yes wait-on tcp:5433 -t 30000

# Then run migrations
pnpm db:migrate
```

#### 3. Start Application

```bash
# Start development server
# This will automatically reset and seed the database
pnpm dev
```

The API will be running at:
- **API**: http://localhost:8080
- **Swagger**: http://localhost:8080/api
- **Health Check**: http://localhost:8080

**Test User Created Automatically:**
- Email: `test@test.com`
- Password: `Password@1`

### 4. Test Authentication

#### Sign In (with pre-seeded test user)
```bash
curl -X POST http://localhost:8080/api/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "Password@1"
  }'
```

#### Sign Up (create new user)
```bash
curl -X POST http://localhost:8080/api/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123!",
    "name": "New User"
  }'
```

## What's Next?

1. **Explore Swagger Documentation**: http://localhost:8080/api
2. **Import Postman Collection**: Use `docs/collection.json`
3. **Add Your Features**: See [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)
4. **Run Tests**: `pnpm test`

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start:prod       # Start production server

# Database
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database

# Testing
pnpm test             # Run tests
pnpm test:e2e         # Run E2E tests
pnpm test:cov         # Test coverage

# Code Quality
pnpm lint             # Lint code
pnpm format           # Format code
pnpm typecheck        # Run TypeScript type checking
```

## Email Configuration (Optional)

In **development**, authentication emails (welcome, password reset, OTP) are **logged to console** - no email service needed!

For **production**, you need to **implement the email driver** of your choice. The environment variables below are pre-configured as examples to guide your implementation:

```env
# .env
MAILER_API_KEY=your-api-key-here
MAILER_FROM_EMAIL=noreply@yourdomain.com
MAILER_FROM_NAME=Your App Name
```

**Supported providers:**
- Resend (recommended)
- SendGrid
- Mailgun
- AWS SES
- Postmark

> **Note:** The email service implementation is **not included** in the boilerplate. You must implement it according to your project needs.

Check the [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md) for implementation examples.

## Troubleshooting

### Database connection error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Port already in use
```bash
# Change port in .env
PORT=3000
```

### Database reset not working
```bash
# Make sure RESET_DB=true in .env
# Make sure NODE_ENV=local or NODE_ENV=development
```

### Want to disable auto-reset in development
```bash
# Set RESET_DB=false in .env
RESET_DB=false
```

### Cannot connect to database
```bash
# Check your DATABASE_URL in .env
# Make sure it matches your Docker setup
```

## Need Help?

- 📖 Read the [README.md](README.md) for overview
- 📚 Check [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md) for complete technical details
- 🐛 Open an issue on GitHub
- 💬 Check the documentation links in README

Happy coding! 🚀
