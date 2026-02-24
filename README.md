<!-- GITHUB TOPICS TO ADD IN REPO SETTINGS: nestjs, boilerplate, typescript, cqrs, rest-api, postgresql, prisma, redis, better-auth, backend, nodejs, clean-architecture -->
<div align="center">

> **⚠️ DEMO REPOSITORY — This is a read-only structural preview. The full source code, all modules, complete test suite, and documentation are available in the complete version below.**
>
> **[💎 Get the Full Version →](https://ch1efthedev.gumroad.com/l/nestjs-ultimate-boilerplate)**

---

# NestJS Ultimate Boilerplate

> **🚀 Production-ready NestJS boilerplate with CQRS architecture, Better Auth, and complete testing. Skip 60+ hours of setup and start building your API today.**

  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs" alt="NestJS 11" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Test_Coverage-99%25+-success?logo=jest" alt="Test Coverage 99%+" />
  <img src="https://img.shields.io/badge/License-Commercial-blue.svg" alt="Commercial License" />

  <br/>
  <br/>

  <strong>Everything you need to build modern REST APIs with clean, SOLID-friendly design</strong>
  <br>
  <sub>Authentication • CQRS • Caching • Testing • Docker • Documentation</sub>

  <br/>

  <a href="#-why-this-boilerplate">Why This?</a> •
  <a href="#-perfect-for">Perfect For</a> •
  <a href="#-whats-included">What's Included</a> •
  <a href="#-whats-not-in-this-demo">What's Locked</a> •
  <a href="#-preview">Preview</a> •
  <a href="#-quick-demo">Quick Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-support">Support</a>

</div>

---

## 🎯 Why This Boilerplate?

Building a production-ready API from scratch takes **60+ hours** of setup time. This boilerplate gives you:

This is a REST API boilerplate built on NestJS, with clean architecture, CQRS, and SOLID-friendly structure.

✅ **Everything Pre-Configured** - Authentication, caching, testing, and more  
✅ **Best Practices Baked In** - CQRS, event-driven architecture, proper testing structure  
✅ **Production-Ready** - Used in real projects, battle-tested patterns  
✅ **Well Documented** - Comprehensive guides and inline examples  
✅ **Easy to Extend** - Copy the Products module to create new features  

**Stop reinventing the wheel. Start building features.**

**Skip weeks of setup and configuration:**

| Feature | This Boilerplate | From Scratch | Typical Boilerplate |
|---------|------------------|--------------|---------------------|
| CQRS Architecture | ✅ Complete | ❌ Hours | ⚠️ Basic |
| Better Auth (2025) | ✅ Session + OTP | ❌ Days | ❌ Passport (2013) |
| RBAC System | ✅ Full Permissions | ❌ Complex | ❌ Basic Roles |
| i18n Translation | ✅ Type-Safe Keys | ❌ Hours | ❌ None |
| Cache + Invalidation | ✅ Event-Driven | ❌ Days | ⚠️ Manual |
| Rate Limiting | ✅ Pre-configured | ❌ Hours | ❌ None |
| Test Coverage | ✅ 99%+ (327 tests) | ❌ Days | ⚠️ Minimal |
| Docker Setup | ✅ Dev + Prod | ❌ Hours | ⚠️ Dev Only |
| Git Hooks + Lint | ✅ Biome + Commitlint | ❌ Hours | ⚠️ ESLint Only |
| Config Validation | ✅ Fail-Fast | ❌ Runtime Bugs | ❌ Silent Fails |
| Production Ready | ✅ Battle-Tested | ❌ Weeks | ⚠️ Maybe |

**Time Saved:** ~60 hours of setup + endless debugging

---

## 🔒 What's NOT in This Demo

This repo shows the **project structure and a few reference files** only. The following are **locked in the full version:**

| | Demo | Full Version |
|---|---|---|
| Full source code | ❌ Structure only | ✅ Everything |
| Auth module (Better Auth + RBAC) | ❌ Structure only | ✅ Complete |
| CQRS implementation | ❌ Snippets only | ✅ Full handlers + events |
| Redis caching with `@Cache()` decorator | ❌ | ✅ Ready to use |
| 327 tests (unit + integration + E2E) | ❌ Examples only | ✅ 99%+ coverage |
| i18n type-safe translation system | ❌ | ✅ Included |
| 3,600+ lines of documentation | ❌ | ✅ Included |
| Migration guide (new CQRS modules) | ❌ | ✅ Step-by-step |
| Lifetime updates | ❌ | ✅ All future versions |

<div align="center">

### Ready to skip 60+ hours of setup?

**[💎 Get the Full Version — $19 →](https://ch1efthedev.gumroad.com/l/nestjs-ultimate-boilerplate)**

<sub>One-time payment • Commercial license • Lifetime updates</sub>

</div>

---

## 👥 Perfect For

✅ **Startups** - Ship MVPs 2x faster with production-ready code  
✅ **Solo Developers** - Build client projects without reinventing the wheel  
✅ **Agencies** - Reuse across multiple clients, save 60+ hours per project  
✅ **Senior Engineers** - Skip setup, focus on business logic that matters  
✅ **Development Teams** - Onboard juniors with battle-tested patterns

---

## 📦 What's Included

### 🏗️ Architecture & Patterns
- **NestJS 11** - Modern Node.js framework with TypeScript
- **CQRS Architecture** - Clean separation of reads and writes
- **Event-Driven Design** - Decoupled, reactive applications
- **Modular Structure** - Organized by feature domains

### 🔐 Authentication & Security
- **Better Auth** - Modern authentication with Argon2 hashing
- **Session Management** - Secure cookie-based sessions
- **OTP Authentication** - One-Time Password support
- **Password Reset** - Complete recovery flow
- **RBAC System** - Role-Based Access Control
- **Email Service Ready** - Pre-configured for major providers

### 🗄️ Database & ORM
- **PostgreSQL** - Powerful relational database
- **Prisma ORM** - Type-safe database client with migrations
- **Smart Seeding** - Environment-aware data generation with Faker.js
- **Migration System** - Version-controlled schema management

### ⚡ Performance
- **Redis Caching** - High-performance caching layer
- **Cache Decorators** - Simple `@Cache()` for automatic caching
- **Rate Limiting** - Built-in request throttling
- **Auto Invalidation** - Event-driven cache clearing

### 🧪 Testing
- **Complete Test Suite** - Unit, integration, and E2E tests
- **99%+ Coverage** - Industry-leading test coverage (statements: 99.33%, branches: 96.8%, lines: 99.55%)
- **Test Fixtures** - Reusable test data factories
- **Mocking Utilities** - Database and service mocks included
- **Production-Ready** - Battle-tested patterns following NestJS best practices

### 📚 Documentation
- **Swagger/OpenAPI** - Auto-generated API docs
- **Postman Integration** - Auto-sync collections
- **Comprehensive Guides** - Step-by-step documentation
- **Code Examples** - Real implementations included

### 🛠️ Developer Experience
- **Biome** - Fast linter & formatter (100x faster than ESLint)
- **Git Hooks** - Automatic code quality checks
- **Docker Setup** - One-command environment
- **Hot Reload** - Fast development iteration
- **One-Command Init** - `pnpm bootstrap` and you're ready
- **Strict Config Validation** - Fail-fast at startup, catch errors early (12-Factor App)

### 📦 Reference Implementation
- **Products Module** - Complete CQRS example
- **All CRUD Operations** - Create, read, update, delete
- **Event Handlers** - Domain event examples
- **Full Test Suite** - Unit and integration tests
- **API Documentation** - Swagger annotations

---

## 📸 Preview

### 🚀 One-Command Setup

<p align="center">
  <img src="https://github.com/user-attachments/assets/242221a8-4b90-4985-a741-ba85ded95c12" alt="Bootstrap" width="800" />
</p>

*Run `pnpm bootstrap` and you're ready to go in seconds*

### 📚 Interactive API Documentation

<p align="center">
  <img src="https://github.com/user-attachments/assets/d49e31ee-66bf-44cc-8f51-d0365866444f" alt="Swagger API Documentation" width="800" />
</p>

*Auto-generated Swagger documentation with all endpoints ready to test*

### ✅ Industry-Leading Test Coverage

<p align="center">
  <img src="https://github.com/user-attachments/assets/f65adddf-c74c-4c86-a35d-bfb10939982a" alt="Test Coverage Report" width="800" />
</p>

*99%+ test coverage with comprehensive unit and integration tests*

<div align="center">

**This is what you get on day one — no setup, no configuration headaches.**

**[💎 Get the Full Version →](https://ch1efthedev.gumroad.com/l/nestjs-ultimate-boilerplate)**

</div>

---

## 🎥 Quick Demo

<p align="center">
  <video src="https://github.com/user-attachments/assets/b0cf6044-3e24-48d9-9f21-0e55b9d1890f" width="800" controls></video>
</p>

*Complete walkthrough from zero to running API in 60 seconds*

**Demo shows:**
- ⚡ `pnpm dev` - Instant server start with hot reload
- 📚 Interactive Swagger UI - Test all endpoints in your browser
- 🔒 Protected routes - 401 errors without authentication
- 🔑 One-click login - Sign in directly from Swagger
- 🍪 Automatic session - Cookie-based auth keeps you logged in
- ✨ CRUD operations - Create, list, and filter products
- 📄 Pagination & filters - Search products by name with page limits

---

## ⚡ Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10.6.4+
- Docker & Docker Compose

### Installation

```bash
# 1. Clone or download this boilerplate
git clone your-repo-url
cd nest-api-boilerplate

# 2. One-command setup (installs deps, hooks, starts DB, waits for ready, migrations, seed)
pnpm bootstrap

# 3. Start development server
pnpm dev
```

**🎉 Done!** Your API is running at:
- API: http://localhost:8080
- Swagger: http://localhost:8080/api

### Test the API

```bash
# Sign in with pre-seeded test user
curl -X POST http://localhost:8080/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Password@1"}'

# Get products
curl http://localhost:8080/v1/products
```

📖 **Need more details?** See [QUICKSTART.md](QUICKSTART.md) for a complete 5-minute guide.

---

## 🗂️ Project Structure

```
├── docs/                  # Complete technical documentation
├── prisma/                # Database schema and migrations
├── scripts/               # Utility scripts
├── src/
│   ├── auth/              # Authentication with Better Auth
│   ├── cache/             # Redis caching system
│   ├── common/            # Shared utilities and helpers
│   ├── config/            # Configuration management
│   ├── database/          # Database service and seeders
│   ├── i18n/              # Internationalization (i18n)
│   ├── modules/           # Feature modules
│   │   ├── products/      # 📦 Reference CQRS implementation
│   │   └── users/         # Users module
│   ├── rbac/              # Role-Based Access Control
└── test/                  # E2E tests
```

---

## 🎯 Key Features Explained

### CQRS Architecture

Clean separation between reads (Queries) and writes (Commands):

```typescript
// Commands handle writes
@CommandHandler(CreateProductCommand)
export class CreateProductHandler {
  async execute(command: CreateProductCommand) {
    const product = await this.db.product.create({
      data: command.data,
    });
    
    // Emit event for side effects
    this.eventBus.publish(new ProductCreatedEvent(product.id));
    
    return product;
  }
}

// Queries handle reads
@QueryHandler(GetProductsQuery)
export class GetProductsHandler {
  async execute(query: GetProductsQuery) {
    return await this.db.product.findMany({
      where: query.filters,
      skip: query.skip,
      take: query.take,
    });
  }
}
```

### Event-Driven Side Effects

Decouple business logic with domain events:

```typescript
// Emit event after creating product
this.eventBus.publish(new ProductCreatedEvent(productId));

// Multiple handlers can listen
@OnEvent('ProductCreatedEvent')
async sendEmail(event: ProductCreatedEvent) { }

@OnEvent('ProductCreatedEvent')
async invalidateCache(event: ProductCreatedEvent) { }

@OnEvent('ProductCreatedEvent')
async updateSearchIndex(event: ProductCreatedEvent) { }
```

### Smart Caching

Simple decorator-based caching:

```typescript
@Get()
@Cache('products:all', 2 * 60 * 1000) // Cache for 2 minutes
async findAll() {
  return this.queryBus.execute(new GetProductsQuery());
}

@Get(':id')
@Cache('products:{{id}}', 5 * 60 * 1000) // Dynamic cache key
async findOne(@Param('id') id: string) {
  return this.queryBus.execute(new GetProductQuery(id));
}
```

### Complete Testing

Industry-leading **99%+ test coverage** with unit, integration, and E2E tests:

```typescript
// Unit test with mocks
describe('CreateProductHandler', () => {
  it('should create product and emit event', async () => {
    const result = await handler.execute(command);
    
    expect(mockDatabase.product.create).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalledWith(
      expect.objectContaining({ productId: result.id })
    );
  });
});

// Integration test
describe('Products Integration', () => {
  it('should create product via API', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/products')
      .send(productData)
      .expect(201);
      
    expect(response.body).toMatchObject(productData);
  });
});
```

---

## 🚀 Creating Your First Feature

Copy the Products module as a template:

```bash
# 1. Copy the module
cp -r src/products src/orders

# 2. Find and replace in all files
# Product → Order
# product → order
# products → orders

# 3. Update Prisma schema
model Order {
  id          String   @id @default(uuid())
  customerId  String
  totalAmount Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

# 4. Run migration
pnpm db:migrate

# 5. Register in app.module.ts
imports: [OrdersModule]

# 6. Test it
curl http://localhost:8080/v1/orders
```

📖 **Complete guide**: [docs/MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md)

---

## 📚 Documentation

This boilerplate includes comprehensive documentation:

### Getting Started
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)** - Complete technical documentation (3,600+ lines)

### Guides
- **[docs/AUTHENTICATION.md](docs/AUTHENTICATION.md)** - Auth system guide
- **[docs/TESTING.md](docs/TESTING.md)** - Complete testing guide
- **[docs/MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md)** - Create new CQRS modules
- **[docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)** - Recommended branching strategy
- **[docs/API_VERSIONING.md](docs/API_VERSIONING.md)** - API versioning
- **[docs/CACHE.md](docs/CACHE.md)** - Caching system
- **[docs/RATE_LIMITING.md](docs/RATE_LIMITING.md)** - Rate limiting

### Module Documentation
- **[src/auth/README.md](src/auth/README.md)** - Authentication module
- **[src/auth/SETUP.md](src/auth/SETUP.md)** - Auth setup instructions
- **[src/products/README.md](src/products/README.md)** - Products module (CQRS template)

---

## 🛠️ Available Scripts

```bash
# Setup
pnpm bootstrap        # Complete project setup (install, hooks, Docker, wait-on, migrations, seed)

# Development
pnpm dev              # Start dev server with hot reload
pnpm build            # Build for production
pnpm start            # Start application
pnpm start:prod       # Start production server

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database (⚠️ deletes data)

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:unit        # Run unit tests only
pnpm test:integration # Run integration tests only
pnpm test:e2e         # Run E2E tests
pnpm test:cov         # Generate coverage report

# Code Quality
pnpm lint             # Lint and auto-fix
pnpm format           # Format code
pnpm typecheck        # Run TypeScript type checking
```

📖 **Complete scripts reference**: [docs/DOCUMENTATION.md#scripts-reference](docs/DOCUMENTATION.md#scripts-reference)

---

## 🐳 Docker Support

Complete Docker setup for development and production:

```bash
# Start all services (PostgreSQL + Redis + App)
docker-compose up -d

# Start only database services
docker-compose up -d postgres redis

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🧪 Testing

Comprehensive test suite with 99%+ coverage:

```bash
# Run all tests
pnpm test

# Run specific test types
pnpm test:unit          # Unit tests only
pnpm test:integration   # Integration tests only
pnpm test:e2e          # End-to-end tests

# Watch mode
pnpm test:watch         # Auto-run on changes

# Coverage
pnpm test:cov          # Generate coverage report
```

**What's tested:**
- ✅ Command handlers (unit tests)
- ✅ Query handlers (unit tests)
- ✅ Event handlers (unit tests)
- ✅ Controllers (integration tests)
- ✅ Full API flows (E2E tests)

📖 **Complete testing guide**: [docs/TESTING.md](docs/TESTING.md)

---

## 🚀 Deployment

### Quick Deploy

**Railway:**
1. Connect GitHub repo
2. Add environment variables
3. Auto-deploys on push

**Render:**
```yaml
Build: pnpm install && pnpm build && pnpm db:migrate
Start: pnpm start:prod
```

**Docker:**
```bash
docker build -t api .
docker run -p 8080:8080 -e DATABASE_URL=... api
```

### Environment Variables

This boilerplate follows **[12-Factor App](https://12factor.net/config)** principles with **strict validation**. All required variables must be explicitly set - the app will fail at startup with clear error messages if anything is missing. No silent defaults that hide bugs.

Required for production:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
BETTER_AUTH_SECRET=your-secret-min-32-chars
BETTER_AUTH_URL=https://api.yourdomain.com
MAILER_FROM_EMAIL=noreply@yourdomain.com
MAILER_FROM_NAME=Your App Name
```

✅ **Fail-fast approach** - Configuration errors caught at startup, not in production  
✅ **Explicit over implicit** - All settings visible in `.env`, no hidden defaults  
✅ **Type-safe validation** - Using `class-validator` for runtime checks

📖 **Complete configuration guide**: [docs/DOCUMENTATION.md#environment-variables](docs/DOCUMENTATION.md#environment-variables)

### Optional: Semantic Release

> **📦 For Package Publishing or Automated Versioning**

If you plan to publish this as a package or want automated versioning, consider adding [semantic-release](https://semantic-release.gitbook.io/) after configuring your CI/CD pipeline:

```bash
pnpm add -D semantic-release @semantic-release/git @semantic-release/changelog
```

The boilerplate already includes:
- ✅ Conventional commits enforced via commitlint
- ✅ CHANGELOG.md for manual tracking
- ✅ Git hooks for commit validation

Semantic-release can automate version bumps and releases based on your commits.

---

## 📄 License

Commercial license - see [LICENSE](LICENSE) and [TERMS.md](TERMS.md).

**You can:**
- ✅ Use commercially in your own products
- ✅ Modify the code for your projects

**You cannot:**
- ❌ Redistribute or resell the boilerplate source code
- ❌ Share the raw project publicly or privately

---

## ❓ FAQ

**Q: Can I use this commercially?**  
A: Yes! The license allows commercial use in your own products.

**Q: Do I get lifetime updates?**  
A: Yes, all updates are included with your purchase.

**Q: What if I need help?**  
A: Check the docs first, then open a GitHub issue for support.

**Q: Can I customize it?**  
A: Absolutely! The code is fully yours to modify.

**Q: What databases are supported?**  
A: PostgreSQL is configured, but Prisma supports MySQL, SQLite, etc.

---

## 💬 Support

### Documentation
- 📖 [Complete Documentation](docs/DOCUMENTATION.md) - Full technical reference
- 🚀 [Quick Start Guide](QUICKSTART.md) - 5-minute setup
- 📚 [API Guides](docs/) - Feature-specific documentation

### Community
- 💡 [GitHub Issues](../../issues) - Report bugs or request features
- 🔀 [Pull Requests](../../pulls) - Contribute to the project
- ⭐ [Star This Repo](../../stargazers) - Show your support

### Resources
- **NestJS**: https://docs.nestjs.com
- **Prisma**: https://www.prisma.io/docs
- **Better Auth**: https://www.better-auth.com

---

<div align="center">

## 💎 Get the Full Version

Stop spending days on boilerplate. Start shipping features.

**[→ Buy NestJS Ultimate Boilerplate — $19](https://ch1efthedev.gumroad.com/l/nestjs-ultimate-boilerplate)**

<sub>One-time payment • Commercial license • Lifetime updates • Full source code</sub>

---

<sub>Built with ❤️ using NestJS • If this demo helped you, give it a ⭐</sub>

</div>

**[⬆ Back to top](#nestjs-ultimate-boilerplate)**
