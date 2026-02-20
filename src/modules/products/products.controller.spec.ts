import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, type TestingModule } from '@nestjs/testing';
import { CreateProductCommand, DeleteProductCommand, UpdateProductCommand } from './commands';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsController } from './products.controller';
import { GetProductQuery, GetProductsQuery } from './queries';

describe('ProductsController', () => {
  let controller: ProductsController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
    execute: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockReflector = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
        isActive: true,
      };

      const expectedResult = new ProductResponseDto({
        id: '123',
        name: createDto.name,
        description: createDto.description,
        price: createDto.price,
        stock: createDto.stock,
        isActive: createDto.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockCommandBus.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(commandBus.execute).toHaveBeenCalledWith(new CreateProductCommand(createDto));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const productId = '123';
      const expectedResult = new ProductResponseDto({
        id: productId,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockQueryBus.execute.mockResolvedValue(expectedResult);

      const result = await controller.findOne(productId);

      expect(queryBus.execute).toHaveBeenCalledWith(new GetProductQuery(productId));
      expect(result).toEqual(expectedResult);
    });
  });

  // This file is a demo version.
  // Only create and findOne tests are included.
  // Get complete implementation at:
  // https://ch1efthedev.gumroad.com
});
