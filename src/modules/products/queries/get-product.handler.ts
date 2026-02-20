import { Logger, NotFoundException } from '@nestjs/common';
import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { I18nService } from 'nestjs-i18n';
import { translationKeys } from '../../../common/constants/translation-keys.constants';
import { DatabaseService } from '../../../database/database.service';
import { ProductResponseDto } from '../dto/product-response.dto';
import { GetProductQuery } from './get-product.query';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  private readonly logger = new Logger(GetProductHandler.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly i18n: I18nService,
  ) {}

  async execute(query: GetProductQuery): Promise<ProductResponseDto> {
    this.logger.log(`Fetching product: ${query.id}`);

    const product = await this.database.product.findUnique({
      where: { id: query.id },
    });

    if (!product) {
      throw new NotFoundException(
        this.i18n.t(translationKeys.exceptions.PRODUCTS.NOT_FOUND, { args: { id: query.id } }),
      );
    }

    return new ProductResponseDto({
      ...product,
      price: Number(product.price),
    });
  }
}
