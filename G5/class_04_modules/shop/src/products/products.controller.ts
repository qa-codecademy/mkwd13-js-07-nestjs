import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../common/types/product';

// localhost:3000/products
@Controller('products')
export class ProductsController {
  // Dependency Injection
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }
}
