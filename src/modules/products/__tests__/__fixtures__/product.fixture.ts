import type { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type { CreateProductDto } from '../../dto/create-product.dto';
import { ProductResponseDto } from '../../dto/product-response.dto';
import type { UpdateProductDto } from '../../dto/update-product.dto';

export const createProductFixture = (overrides?: Partial<Product>): Product => {
  return {
    id: 'test-product-id-123',
    name: 'Test Product',
    description: 'Test product description',
    price: new Prisma.Decimal(99.99),
    stock: 10,
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  };
};

export const createProductDtoFixture = (overrides?: Partial<CreateProductDto>): CreateProductDto => {
  return {
    name: 'Test Product',
    description: 'Test product description',
    price: 99.99,
    stock: 10,
    isActive: true,
    ...overrides,
  };
};

export const updateProductDtoFixture = (overrides?: Partial<UpdateProductDto>): UpdateProductDto => {
  return {
    name: 'Updated Product',
    price: 149.99,
    ...overrides,
  };
};

export const createProductResponseFixture = (overrides?: Partial<ProductResponseDto>): ProductResponseDto => {
  return new ProductResponseDto({
    id: 'test-product-id-123',
    name: 'Test Product',
    description: 'Test product description',
    price: 99.99,
    stock: 10,
    isActive: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  });
};

export const createProductListFixture = (count = 1, overrides?: Partial<Product>): Product[] => {
  return Array.from({ length: count }, (_, i) => createProductFixture({ id: `product-${i}`, ...overrides }));
};
