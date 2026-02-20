import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, type ICommandHandler } from '@nestjs/cqrs';
import { DatabaseService } from '../../../database/database.service';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductCreatedEvent } from '../events/product-created.event';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  private readonly logger = new Logger(CreateProductHandler.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductResponseDto> {
    this.logger.log(`Creating product: ${command.data.name}`);

    const product = await this.database.product.create({
      data: {
        name: command.data.name,
        description: command.data.description,
        price: command.data.price,
        stock: command.data.stock ?? 0,
        isActive: command.data.isActive ?? true,
      },
    });

    this.logger.log(`Product created with ID: ${product.id}`);

    // Emit event for other parts of the system to react
    this.eventBus.publish(new ProductCreatedEvent(product.id, product.name));

    return new ProductResponseDto({
      ...product,
      price: Number(product.price),
    });
  }
}
