import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from './product.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../common/types/current-user';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductOwnershipGuard } from './guards/product-ownership.guard';

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: ProductCreateDto })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  create(
    @Body() productCreateDto: ProductCreateDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<Product> {
    return this.productsService.create(productCreateDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Search for products' })
  @ApiOkResponse({
    description: 'The products have been successfully searched.',
    type: [Product],
  })
  search() {
    return this.productsService.search();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiOkResponse({
    description: 'The product has been successfully found.',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiBody({ type: ProductUpdateDto })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @UseGuards(JwtAuthGuard, ProductOwnershipGuard)
  update(@Param('id') id: string, @Body() productUpdateDto: ProductUpdateDto) {
    return this.productsService.update(id, productUpdateDto);
  }
}
