import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductDimensionsDto } from './product-dimensions.dto';
import { Type } from 'class-transformer';
import { ProductSpecificationsDto } from './product-specifications.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product description',
    example: 'High-quality product',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Product weight in grams', example: 500 })
  weight: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDimensionsDto)
  @ApiProperty({
    description: 'Product dimensions in cm',
    type: ProductDimensionsDto,
  })
  dimensions?: ProductDimensionsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSpecificationsDto)
  @ApiProperty({
    description: 'Product specifications',
    type: [ProductSpecificationsDto],
  })
  specifications: ProductSpecificationsDto[];
}
