import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductCategory } from '../../common/types/product-category.enum';
import { ProductDetailsDto } from './product-details.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product name', example: 'Premium Widget' })
  name: string;

  @IsEnum(ProductCategory)
  @ApiProperty({
    description: 'Product category',
    example: ProductCategory.ELECTRONICS,
    enum: ProductCategory,
  })
  category: ProductCategory;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Product price (must be greater than 0)',
    example: 99.99,
    minimum: 0.01,
  })
  price: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Product stock quantity', example: 100 })
  stock: number;

  @ValidateNested()
  @Type(() => ProductDetailsDto)
  @ApiProperty({ description: 'Product details', type: ProductDetailsDto })
  details: ProductDetailsDto;
}
