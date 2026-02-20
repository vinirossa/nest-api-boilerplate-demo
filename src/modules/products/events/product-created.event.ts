export class ProductCreatedEvent {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
  ) {}
}
