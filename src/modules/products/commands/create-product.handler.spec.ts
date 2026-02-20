import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { createMockDatabaseService, resetMockDatabase } from '../../../../test/mocks/database.mock';
import { DatabaseService } from '../../../database/database.service';
import { createProductDtoFixture, createProductFixture } from '../__tests__/__fixtures__/product.fixture';
import { createMockEventBus } from '../__tests__/__mocks__/event-bus.mock';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductCreatedEvent } from '../events/product-created.event';
import { CreateProductCommand } from './create-product.command';
import { CreateProductHandler } from './create-product.handler';

describe('CreateProductHandler', () => {
  let handler: CreateProductHandler;
  let mockDatabase: ReturnType<typeof createMockDatabaseService>;
  let mockEventBus: ReturnType<typeof createMockEventBus>;

  beforeEach(async () => {
    mockDatabase = createMockDatabaseService();
    mockEventBus = createMockEventBus();

    const module = await Test.createTestingModule({
      providers: [
        CreateProductHandler,
        {
          provide: DatabaseService,
          useValue: mockDatabase,
        },
        {
          provide: EventBus,
          useValue: mockEventBus,
        },
      ],
    }).compile();

    handler = module.get<CreateProductHandler>(CreateProductHandler);
  });

  afterEach(() => {
    resetMockDatabase(mockDatabase);
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a product successfully', async () => {
      // Arrange
      const createDto = createProductDtoFixture();
      const command = new CreateProductCommand(createDto);
      const createdProduct = createProductFixture();

      // biome-ignore lint/suspicious/noTsIgnore: Prevents circular reference issues with jest mocks due to Prisma aggregate types
      // @ts-ignore - Prisma aggregate types cause circular reference issues with jest mocks
      mockDatabase.product.create.mockResolvedValue(createdProduct);

      // Act
      const result = await handler.execute(command);

      // Assert
      expect(mockDatabase.product.create).toHaveBeenCalledWith({
        data: {
          name: createDto.name,
          description: createDto.description,
          price: createDto.price,
          stock: createDto.stock,
          isActive: createDto.isActive,
        },
      });

      expect(mockEventBus.publish).toHaveBeenCalledWith(
        new ProductCreatedEvent(createdProduct.id, createdProduct.name),
      );

      expect(result).toMatchObject({
        id: createdProduct.id,
        name: createdProduct.name,
        description: createdProduct.description,
        price: Number(createdProduct.price),
        stock: createdProduct.stock,
        isActive: createdProduct.isActive,
      });
    });

    it('should create product with default values when optional fields are missing', async () => {
      // Arrange
      const createDto = {
        name: 'Test Product',
        price: 99.99,
      } as CreateProductDto;
      const command = new CreateProductCommand(createDto);
      const createdProduct = createProductFixture({
        stock: 0,
        isActive: true,
      });
      mockDatabase.product.create.mockResolvedValue(createdProduct);

      // Act
      const result = await handler.execute(command);

      // Assert
      expect(mockDatabase.product.create).toHaveBeenCalledWith({
        data: {
          name: createDto.name,
          description: createDto.description,
          price: createDto.price,
          stock: 0,
          isActive: true,
        },
      });

      expect(result.stock).toBe(0);
      expect(result.isActive).toBe(true);
    });

    it('should handle database errors', async () => {
      // Arrange
      const createDto = createProductDtoFixture();
      const command = new CreateProductCommand(createDto);
      const error = new Error('Database connection failed');

      mockDatabase.product.create.mockRejectedValue(error);

      // Act & Assert
      await expect(handler.execute(command)).rejects.toThrow('Database connection failed');
      expect(mockEventBus.publish).not.toHaveBeenCalled();
    });
  });
});
