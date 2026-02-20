import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { createMockDatabaseService, resetMockDatabase } from '../../../../test/mocks/database.mock';
import { createMockI18nService, resetMockI18n } from '../../../../test/mocks/i18n.mock';
import { translationKeys } from '../../../common/constants/translation-keys.constants';
import { DatabaseService } from '../../../database/database.service';
import { createProductFixture } from '../__tests__/__fixtures__/product.fixture';
import { GetProductHandler } from './get-product.handler';
import { GetProductQuery } from './get-product.query';

describe('GetProductHandler', () => {
  let handler: GetProductHandler;
  let mockDatabase: ReturnType<typeof createMockDatabaseService>;
  let mockI18n: ReturnType<typeof createMockI18nService>;

  beforeEach(async () => {
    mockDatabase = createMockDatabaseService();
    mockI18n = createMockI18nService();

    const module = await Test.createTestingModule({
      providers: [
        GetProductHandler,
        {
          provide: DatabaseService,
          useValue: mockDatabase,
        },
        {
          provide: I18nService,
          useValue: mockI18n,
        },
      ],
    }).compile();

    handler = module.get<GetProductHandler>(GetProductHandler);
  });

  afterEach(() => {
    resetMockDatabase(mockDatabase);
    resetMockI18n(mockI18n);
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return a product by id', async () => {
      // Arrange
      const productId = 'test-product-id';
      const query = new GetProductQuery(productId);
      const product = createProductFixture({ id: productId });

      // biome-ignore lint/suspicious/noTsIgnore: Prevents circular reference issues with jest mocks due to Prisma aggregate types
      // @ts-ignore - Prisma aggregate types cause circular reference issues with jest mocks
      mockDatabase.product.findUnique.mockResolvedValue(product);

      // Act
      const result = await handler.execute(query);

      // Assert
      expect(mockDatabase.product.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
      });

      expect(result).toMatchObject({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        isActive: product.isActive,
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      // Arrange
      const productId = 'non-existent-id';
      const query = new GetProductQuery(productId);

      mockDatabase.product.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
      expect(mockI18n.t).toHaveBeenCalledWith(translationKeys.exceptions.PRODUCTS.NOT_FOUND, {
        args: { id: productId },
      });
    });

    it('should handle database errors', async () => {
      // Arrange
      const productId = 'test-product-id';
      const query = new GetProductQuery(productId);
      const error = new Error('Database connection failed');

      mockDatabase.product.findUnique.mockRejectedValue(error);

      // Act & Assert
      await expect(handler.execute(query)).rejects.toThrow('Database connection failed');
    });
  });
});
