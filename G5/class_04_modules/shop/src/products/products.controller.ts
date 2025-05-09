import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  ProductDetailsDto,
  ProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// localhost:3000/api/products
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  // Dependency Injection
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Here we return all products available in the database',
  })
  findAll(): ProductDto[] {
    return this.productsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a single product by ID',
  })
  @ApiOkResponse({
    description: 'Product is found by ID and returned',
  })
  @ApiNotFoundResponse({
    description: 'Error is thrown if product cannot be found by ID',
  })
  findOne(@Param('id', ParseIntPipe) id: number): ProductDto {
    return this.productsService.findOne(id);
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
  productDetails(@Param('id', ParseIntPipe) id: number): ProductDetailsDto {
    return this.productsService.productDetails(id);
  }

  @Post()
  create(@Body() body: CreateProductDto): ProductDto {
    return this.productsService.create(body);
  }

  @Patch('/:id')
  update(
    @Body() body: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ): ProductDto {
    return this.productsService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.productsService.delete(id);
  }
}
