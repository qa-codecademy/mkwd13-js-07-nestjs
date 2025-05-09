import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  @IsDefined()
  @ApiProperty({
    type: String,
    default: 'Test product',
    required: true, // this is already here as default for ApiProperty
    minLength: 2,
    example: 'Shampoo',
  })
  name: string = 'Test product';

  @IsNumber()
  @Min(1)
  @Max(1000000)
  @IsDefined()
  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 1000000,
    required: true, // this is already here as default for ApiProperty
    example: 123,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false, // this is already here as default for ApiPropertyOptional
    example: 'Shampoo for dry hair',
  })
  description?: string;
}

export class UpdateProductDto extends CreateProductDto {}

export class ProductDto extends CreateProductDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;
}

export class ProductDetailsDto extends ProductDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  ordersCount: number;
}
