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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  create(
    @Body() productCreateDto: ProductCreateDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<Product> {
    return this.productsService.create(productCreateDto, user.id);
  }

  @Get()
  search() {
    return this.productsService.search();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ProductOwnershipGuard)
  update(@Param('id') id: string, @Body() productUpdateDto: ProductUpdateDto) {
    return this.productsService.update(id, productUpdateDto);
  }
}
