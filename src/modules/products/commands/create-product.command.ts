import type { CreateProductDto } from '../dto/create-product.dto';

export class CreateProductCommand {
  constructor(public readonly data: CreateProductDto) {}
}
