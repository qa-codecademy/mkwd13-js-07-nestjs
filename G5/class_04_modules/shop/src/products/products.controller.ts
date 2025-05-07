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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProduct,
  Product,
  ProductDetails,
  UpdateProduct,
} from '../common/types/product';

// localhost:3000/products
@Controller('products')
export class ProductsController {
  // Dependency Injection
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Product | null {
    return this.productsService.findOne(+id);
  }

  // localhost:3000/team/:teamId/player/:playerId
  // @Param('teamId') teamId: string
  // @Param('playerId') playerId: string
  //   {
  //   'teamId': 1,
  //     'playerId': 2
  //   }

  // localhost:3000/products/:id/details/
  @Get('/:id/details')
  productDetails(@Param('id') id: string): ProductDetails {
    return this.productsService.productDetails(+id);
  }

  @Post()
  create(@Body() body: CreateProduct): Product {
    return this.productsService.create(body);
  }

  @Patch('/:id')
  update(@Body() body: UpdateProduct, @Param('id') id: string): Product | null {
    return this.productsService.update(+id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    this.productsService.delete(+id);
  }
}
