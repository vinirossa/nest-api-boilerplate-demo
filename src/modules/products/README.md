# Products Module - CQRS Implementation Template

This module serves as a complete example of CQRS (Command Query Responsibility Segregation) implementation with events in Nest.js. Use this as a template for creating other domain entities.

## 📁 Directory Structure

```
products/
├── __tests__/                          # Test directory
│   ├── TEST_SUMMARY.md                 # Test coverage summary
│   ├── __fixtures__/                   # Test data factories
│   │   └── product.fixture.ts
│   └── integration/                    # Integration tests
│       └── products.integration.spec.ts
├── commands/                           # Write operations
│   ├── create-product.command.ts
│   ├── create-product.handler.spec.ts
│   ├── create-product.handler.ts
│   ├── delete-product.command.ts
│   ├── delete-product.handler.spec.ts
│   ├── delete-product.handler.ts
│   ├── index.ts
│   ├── update-product.command.ts
│   ├── update-product.handler.spec.ts
│   └── update-product.handler.ts
├── dto/                                # Data Transfer Objects
│   ├── create-product.dto.ts
│   ├── index.ts
│   ├── product-response.dto.ts
│   ├── query-products.dto.ts
│   └── update-product.dto.ts
├── events/                             # Domain events
│   ├── index.ts
│   ├── product-created.event.ts
│   ├── product-created.handler.spec.ts
│   ├── product-created.handler.ts
│   ├── product-deleted.event.ts
│   ├── product-deleted.handler.spec.ts
│   ├── product-deleted.handler.ts
│   ├── product-updated.event.ts
│   ├── product-updated.handler.spec.ts
│   └── product-updated.handler.ts
├── queries/                            # Read operations
│   ├── get-product.handler.spec.ts
│   ├── get-product.handler.ts
│   ├── get-product.query.ts
│   ├── get-products.handler.spec.ts
│   ├── get-products.handler.ts
│   ├── get-products.query.ts
│   └── index.ts
├── products.controller.spec.ts         # Controller tests
├── products.controller.ts              # HTTP endpoints
├── products.module.ts                  # Module definition
└── README.md                           # This file
```

## 🧪 Testing

The Products module includes comprehensive test coverage:

### Test Structure

```
products/
├── __tests__/                 # Test directory (moderne convention)
│   ├── __fixtures__/          # Test data factories
│   │   └── product.fixture.ts
│   ├── __mocks__/             # Mock implementations
│   │   ├── database.mock.ts

│   ├── __helpers__/           # Test utilities

│   └── integration/           # Integration tests
│       └── products.integration.spec.ts
├── commands/
│   ├── create-product.handler.spec.ts
│   ├── update-product.handler.spec.ts
│   └── delete-product.handler.spec.ts
├── queries/
│   ├── get-product.handler.spec.ts
│   └── get-products.handler.spec.ts
└── events/
    ├── product-created.handler.spec.ts
    ├── product-updated.handler.spec.ts
    └── product-deleted.handler.spec.ts
```

### Running Tests

```bash
# Run all product tests
pnpm test products

# Run with coverage
pnpm test:cov -- products

# Run integration tests only
pnpm test:integration -- products

# Run in watch mode
pnpm test:watch -- products
```

### Test Coverage

The module includes:
- ✅ **Unit Tests**: All command, query, and event handlers
- ✅ **Integration Tests**: Full HTTP endpoint testing
- ✅ **Fixtures**: Reusable test data factories
- ✅ **Mocks**: Database and EventBus mocks
- ✅ **Coverage**: 80%+ coverage target

See [docs/TESTING.md](../../docs/TESTING.md) for the complete testing guide.

## 🎯 CQRS Pattern Overview

### Commands (Write Operations)
- **Commands** represent intent to change state
- **Command Handlers** execute the business logic and emit events
- Commands should NOT return domain data (except ID or confirmation)

### Queries (Read Operations)
- **Queries** represent intent to read data
- **Query Handlers** fetch and return data without side effects
- Queries NEVER modify state

### Events (Domain Events)
- **Events** represent things that happened in the domain
- **Event Handlers** react to events with side effects (notifications, logging, analytics, etc.)
- Events enable loose coupling between modules

## 🚀 How to Use This Template

### 1. Copy the entire `products` folder
```bash
cp -r src/modules/products src/modules/[your-entity]
```

### 2. Replace all occurrences
- Replace `Product` → `YourEntity` (PascalCase)
- Replace `product` → `yourEntity` (camelCase)
- Replace `products` → `yourEntities` (plural)

### 3. Update the Prisma schema
```prisma
model YourEntity {
  id        String   @id @default(uuid())
  // Your fields here
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("your_entities")
}
```

### 4. Update DTOs for your entity fields
Modify the DTOs in `dto/` folder to match your entity structure:
- `create-[entity].dto.ts` - Fields required for creation
- `update-[entity].dto.ts` - Fields that can be updated
- `query-[entities].dto.ts` - Query parameters for filtering/pagination
- `[entity]-response.dto.ts` - Response structure

### 5. Register the module in AppModule
```typescript
import { YourEntityModule } from './your-entity/your-entity.module';

@Module({
  imports: [
    // ... other imports
    YourEntityModule,
  ],
})
export class AppModule {}
```

### 6. Run migrations
```bash
pnpm prisma migrate dev --name add-your-entity
```

## 📝 Example API Endpoints

Once implemented, the following endpoints will be available:

### Create
```http
POST /products
Content-Type: application/json

{
  "name": "Laptop Dell XPS 15",
  "description": "High-performance laptop",
  "price": 1299.99,
  "stock": 50,
  "isActive": true
}
```

### Get All (with pagination and filters)
```http
GET /products?page=1&limit=10&search=laptop&isActive=true
```

### Get One
```http
GET /products/:id
```

### Update
```http
PATCH /products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 1399.99
}
```

### Delete
```http
DELETE /products/:id
```

## 🎭 Event Flow Example

When a product is created:

1. **Controller** receives HTTP request
2. Controller dispatches **CreateProductCommand** via CommandBus
3. **CreateProductHandler** executes:
   - Validates business rules
   - Saves to database
   - Emits **ProductCreatedEvent**
   - Returns ProductResponseDto
4. **ProductCreatedHandler** listens to the event:
   - Sends notifications
   - Updates search indexes
   - Logs analytics
   - Triggers integrations

## 🧪 Testing

Run tests for the Products module:
```bash
# Unit tests
pnpm test products

# E2E tests
pnpm test:e2e
```

## 🔍 Key Concepts

### Separation of Concerns
- **Controller**: HTTP layer, handles requests/responses
- **Commands/Queries**: Define intentions
- **Handlers**: Business logic implementation
- **Events**: Side effects and integrations

### Benefits
- ✅ Clear separation between reads and writes
- ✅ Easy to add new features without affecting existing code
- ✅ Event-driven architecture enables microservices
- ✅ Better testability with isolated components
- ✅ Scalable: can optimize reads and writes independently

### When to Use CQRS
- ✅ Complex business logic
- ✅ Need for audit logging
- ✅ Event-driven requirements
- ✅ Different read/write patterns
- ❌ Simple CRUD with no business logic (use basic service instead)

## 📚 Additional Resources

- [NestJS CQRS Documentation](https://docs.nestjs.com/recipes/cqrs)
- [CQRS Pattern by Martin Fowler](https://martinfowler.com/bliki/CQRS.html)
- [Event Sourcing Pattern](https://martinfowler.com/eaaDev/EventSourcing.html)
