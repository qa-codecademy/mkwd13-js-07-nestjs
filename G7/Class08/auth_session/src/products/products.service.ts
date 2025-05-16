import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  // this is our fake database
  private products: Product[] = [
    { id: 1, name: 'Jacket', price: '200', isAvailable: true },
    { id: 2, name: 'Tshirt', price: '400', isAvailable: true },
    { id: 3, name: 'Sneakers', price: '550', isAvailable: false },
    { id: 4, name: 'Sunglasses', price: '900', isAvailable: false },
  ];

  async findAll() {
    return this.products;
  }

  async purchase(productId: number) {
    const product = this.products.find(
      (product) => product.id === productId && product.isAvailable,
    );

    if (!product) {
      throw new NotFoundException('Product is not aviable.');
    }

    return product;
  }
}
