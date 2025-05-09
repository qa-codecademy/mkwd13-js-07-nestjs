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
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
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
  @ApiOperation({
    summary: 'Get product with number of orders',
  })
  @ApiOkResponse({
    description: 'Get the product with the order details',
    type: ProductDetailsDto,
  })
  @ApiNotFoundResponse({
    description: 'Error is thrown if product cannot be found by ID',
  })
  productDetails(@Param('id', ParseIntPipe) id: number): ProductDetailsDto {
    return this.productsService.productDetails(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new product',
  })
  @ApiCreatedResponse({
    description: 'A new product has been successfully created',
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data for product',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be a string'],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() body: CreateProductDto): ProductDto {
    return this.productsService.create(body);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update a product',
  })
  @ApiCreatedResponse({
    description: 'A product has been successfully updated',
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data for product',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be a string'],
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product not found',
        error: 'Not Found',
      },
    },
  })
  update(
    @Body() body: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ): ProductDto {
    return this.productsService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a product',
  })
  @ApiNoContentResponse({
    description: 'Product has been deleted successfully',
  })
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.productsService.delete(id);
  }
}
