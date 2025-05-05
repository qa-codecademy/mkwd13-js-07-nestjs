import { Injectable } from '@nestjs/common';
import { CreateProduct, Product, UpdateProduct } from '../common/types/product';

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
    {
      id: 2,
      name: 'Keyboard',
      price: 100,
      description: 'A very nice keyboard',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | null {
    return this.products.find((product) => product.id === id) ?? null;
  }

  create(body: CreateProduct): Product {
    const newProduct = {
      ...body,
      id: this.products.length + 1,
    } satisfies Product;

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, body: UpdateProduct): Product | null {
    // find the product
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex < 0) {
      return null;
    }

    // update the product
    const updatedProduct = {
      ...this.products[productIndex],
      ...body,
      id,
    };

    this.products[productIndex] = updatedProduct;

    // return the product
    return updatedProduct;
  }

  delete(id: number): void {
    const index = this.products.findIndex((product) => product.id === id);

    if (index < 0) {
      return;
    }

    this.products.splice(index, 1);
  }
}
