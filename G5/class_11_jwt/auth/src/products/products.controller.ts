import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private products = [
    {
      name: 'Shampoo',
      price: 12.0,
    },
    {
      name: 'Soap',
      price: 1.99,
    },
  ];

  @Get()
  getAllProducts() {
    return this.products;
  }
}
