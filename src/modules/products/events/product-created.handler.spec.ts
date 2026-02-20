import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';
import { ProductCreatedEvent } from './product-created.event';
import { ProductCreatedHandler } from './product-created.handler';

describe('ProductCreatedHandler', () => {
  let handler: ProductCreatedHandler;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductCreatedHandler,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    handler = module.get<ProductCreatedHandler>(ProductCreatedHandler);
  });

  describe('handle', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle ProductCreatedEvent successfully', async () => {
      // Arrange
      const event = new ProductCreatedEvent('product-123', 'Test Product');
      // biome-ignore lint/suspicious/noExplicitAny: Testing private property
      const loggerSpy = jest.spyOn((handler as any).logger, 'log');

      // Act
      await handler.handle(event);

      // Assert
      expect(loggerSpy).toHaveBeenCalledWith(
        `Handling ProductCreatedEvent for product: ${event.productName} (${event.productId})`,
      );
      expect(loggerSpy).toHaveBeenCalledWith('Product created event processed successfully');
    });

    it('should invalidate products:all cache', async () => {
      // Arrange
      const event = new ProductCreatedEvent('product-123', 'Test Product');
      mockCacheManager.del.mockResolvedValue(undefined);

      // Act
      await handler.handle(event);

      // Assert
      expect(mockCacheManager.del).toHaveBeenCalledWith('products:all');
      expect(mockCacheManager.del).toHaveBeenCalledTimes(1);
    });

    it('should handle cache invalidation failure gracefully', async () => {
      // Arrange
      const event = new ProductCreatedEvent('product-123', 'Test Product');
      mockCacheManager.del.mockRejectedValue(new Error('Cache error'));
      // biome-ignore lint/suspicious/noExplicitAny: Testing private property
      const loggerWarnSpy = jest.spyOn((handler as any).logger, 'warn');

      // Act
      await handler.handle(event);

      // Assert
      expect(loggerWarnSpy).toHaveBeenCalledWith('Failed to invalidate cache: Cache error');
    });

    it('should handle multiple events', async () => {
      // Arrange
      const events = [
        new ProductCreatedEvent('product-1', 'Product 1'),
        new ProductCreatedEvent('product-2', 'Product 2'),
        new ProductCreatedEvent('product-3', 'Product 3'),
      ];

      // biome-ignore lint/suspicious/noExplicitAny: Testing private property
      const loggerSpy = jest.spyOn((handler as any).logger, 'log');

      // Act
      for (const event of events) {
        await handler.handle(event);
      }

      // Assert
      expect(loggerSpy).toHaveBeenCalledTimes(events.length * 2); // 2 logs per event
    });
  });
});
