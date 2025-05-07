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
import { Product } from '../common/types/product';
import {
  CreateProductDto,
  ProductDetailsDto,
  UpdateProductDto,
} from './dto/product.dto';

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
  productDetails(@Param('id') id: string): ProductDetailsDto | null {
    return this.productsService.productDetails(+id);
  }

  @Post()
  create(@Body() body: CreateProductDto): Product {
    return this.productsService.create(body);
  }

  @Patch('/:id')
  update(
    @Body() body: UpdateProductDto,
    @Param('id') id: string,
  ): Product | null {
    return this.productsService.update(+id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    this.productsService.delete(+id);
  }
}
