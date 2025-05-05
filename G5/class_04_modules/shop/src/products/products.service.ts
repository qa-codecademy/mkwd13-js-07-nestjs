import { Injectable } from '@nestjs/common';
import { Product } from '../common/types/product';

@Injectable()
export class ProductsService {
  // This mocks a database
  private products: Product[] = [
    {
      id: 1,
      name: 'Table',
      price: 10,
      description: 'A very nice table',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }
}
