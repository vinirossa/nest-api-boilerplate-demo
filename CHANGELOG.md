# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-09

### Added
- Initial release of Nest.js API Boilerplate
- NestJS framework setup with production-ready configuration
- Better Auth authentication system with email/password, magic links, and OTP
- Prisma ORM with PostgreSQL
- Swagger API documentation with versioning support
- Postman collection generation and sync
- Docker and Docker Compose configuration
- Biome linter and formatter (100x faster than ESLint)
- Commitlint for conventional commits with custom scopes
- Lefthook for git hooks (auto-installs during bootstrap)
- Jest testing framework with 99.55% code coverage (327 tests across 37 suites)
- Comprehensive test suite for environment variable validation (31 tests)
- Complete test coverage for query-users.dto validation (19 tests)
- Test suite for test helper utilities (5 tests)
- Test coverage for roles.guard edge cases (2 tests)
- Test coverage for database.service environment-based logging (2 tests)
- Comprehensive test suite for authentication guards (custom-auth.guard, skip-auth.guard)
- Test coverage for public route middleware
- Complete test suite for Permission.vo (RBAC permissions)
- Unit tests for DatabaseService lifecycle hooks
- Comprehensive tests for pagination helper utilities
- Full CQRS implementation for Users module (queries, handlers, DTOs)
- Cache interceptor tests for query parameter handling (5 tests)
- Health check and hello world endpoints
- RBAC (Role-Based Access Control) with decorators and guards
- Redis caching with automatic query parameter serialization
- i18n internationalization support
- Rate limiting configuration
- API versioning setup
- Comprehensive documentation (README, QUICKSTART, TESTING, AUTHENTICATION, CACHE, RBAC, etc.)
- Optional semantic-release guide for advanced workflows

### Fixed
- **Critical cache bug**: Cache now correctly includes query parameters in cache keys
  - Previously, `GET /products` and `GET /products?search=John` returned the same cached result
  - Now each unique query combination generates a separate cache entry
  - Query parameters are automatically serialized and sorted for consistent cache keys
  - See [docs/CACHE.md](docs/CACHE.md) for details

### Security
- Secure authentication with Better Auth
- Environment variable validation with comprehensive test coverage
- Password hashing with Better Auth
- JWT token management
- CORS configuration
- Rate limiting to prevent abuse

[1.0.0]: https://github.com/yourusername/nestjs-api-boilerplate/releases/tag/v1.0.0
