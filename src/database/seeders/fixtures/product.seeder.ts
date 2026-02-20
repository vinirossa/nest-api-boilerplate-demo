import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { ProductFactory } from '../factories/product.factory';

/**
 * Product Seeder - Seeds sample products
 * This is used only for development/testing environments
 */
@Injectable()
export class ProductSeeder {
  private readonly logger = new Logger(ProductSeeder.name);

  constructor(private readonly database: DatabaseService) {}

  /**
   * Seeds sample products if they don't exist
   */
  async seed(): Promise<void> {
    this.logger.log('Seeding products...');

    const productsCount = await this.database.product.count();

    if (productsCount === 0) {
      const products = ProductFactory.createProducts(10);

      this.logger.log(`Generated ${products.length} products to seed`);

      for (const productData of products) {
        await this.database.product.create({
          data: productData,
        });
        this.logger.log(`Product created: ${productData.name}`);
      }

      this.logger.log(`Seeded ${products.length} sample products`);
    } else {
      this.logger.log('Products already exist, skipping...');
    }
  }
}
