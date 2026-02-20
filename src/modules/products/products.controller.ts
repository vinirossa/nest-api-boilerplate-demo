import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { CacheInterceptor } from '../../cache';
import { Cache } from '../../cache/decorators';
import type { FindManyResult } from '../../common/interfaces/common.interfaces';
import { RequirePermission } from '../../rbac/decorators/permission.decorator';
import { Action, Resource } from '../../rbac/permissions/permission.vo';
import { CreateProductCommand, DeleteProductCommand, UpdateProductCommand } from './commands';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductQuery, GetProductsQuery } from './queries';

@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @RequirePermission(Resource.PRODUCT, Action.CREATE)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // Limit: 10 requests per minute
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Creates a new product with the provided data',
  })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @Get(':id')
  @AllowAnonymous()
  @Cache('products:{{id}}', 5 * 60 * 1000) // Cache for 5 minutes with dynamic key
  @ApiOperation({
    summary: 'Get a product by ID',
    description: 'Retrieves a single product by its unique identifier',
  })
  @ApiOkResponse({
    description: 'Product retrieved successfully',
    type: ProductResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  // This file is a demo version.
  // Get complete implementation at:
  // https://ch1efthedev.gumroad.com
}
