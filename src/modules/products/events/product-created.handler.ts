import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import type { Cache } from 'cache-manager';
import { ProductCreatedEvent } from './product-created.event';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler implements IEventHandler<ProductCreatedEvent> {
  private readonly logger = new Logger(ProductCreatedHandler.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handle(event: ProductCreatedEvent) {
    this.logger.log(`Handling ProductCreatedEvent for product: ${event.productName} (${event.productId})`);

    // Invalidate products list cache
    await this.invalidateProductsCache();

    // Example: Send notification, update analytics, trigger integrations, etc.
    // await this.notificationService.sendProductCreatedNotification(event);
    // await this.analyticsService.trackProductCreation(event);

    this.logger.log('Product created event processed successfully');
  }

  private async invalidateProductsCache(): Promise<void> {
    try {
      // Invalidate list cache since a new product was added
      await this.cacheManager.del('products:all');
      this.logger.debug('Cache invalidated: products:all');
    } catch (error) {
      this.logger.warn(`Failed to invalidate cache: ${error.message}`);
    }
  }
}
