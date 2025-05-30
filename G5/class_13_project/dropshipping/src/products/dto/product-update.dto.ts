import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsInt,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ProductCategory } from '../../common/types/product-category.enum';
import { ProductDetailsDto } from './product-details.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Premium Widget',
  })
  name?: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  @ApiPropertyOptional({
    description: 'Product category',
    example: ProductCategory.ELECTRONICS,
    enum: ProductCategory,
  })
  category?: ProductCategory;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'Product price (must be greater than 0)',
    example: 99.99,
    minimum: 0.01,
  })
  price?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'Product stock quantity',
    example: 100,
  })
  stock?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDetailsDto)
  @ApiPropertyOptional({
    description: 'Product details',
    type: ProductDetailsDto,
  })
  details?: ProductDetailsDto;
}
