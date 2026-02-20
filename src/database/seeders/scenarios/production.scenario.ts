import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { BaseScenario } from './base.scenario';

/**
 * Production Scenario
 *
 * Only runs core seeders that are essential for production.
 * Does NOT include test users, sample products, or any test data.
 */
@Injectable()
export class ProductionScenario extends BaseScenario {
  readonly logger = new Logger(ProductionScenario.name);

  // biome-ignore lint/complexity/noUselessConstructor: This ctor is needed for Nest.js dependency injection
  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  async run(): Promise<void> {
    this.logger.log('Running Production seeders');

    // Only run core seeders (essential data)
    await this.runCoreSeeders();

    this.logger.log('Production seeders completed');
  }
}
