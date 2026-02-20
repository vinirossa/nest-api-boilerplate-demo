import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '../../cache';
import { DatabaseModule } from '../../database/database.module';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { ProductsController } from './products.controller';
import { QueryHandlers } from './queries';

@Module({
  imports: [CqrsModule, CacheModule, DatabaseModule],
  controllers: [ProductsController],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class ProductsModule {}
