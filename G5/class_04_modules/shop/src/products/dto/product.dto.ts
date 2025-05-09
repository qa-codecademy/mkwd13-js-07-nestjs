import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
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
  name: string;

  @IsNumber()
  @Min(1)
  @Max(1000000)
  @IsDefined()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}

export class UpdateProductDto extends CreateProductDto {}

export class ProductDto extends CreateProductDto {
  @IsNumber()
  id: number;
}

export class ProductDetailsDto extends ProductDto {
  @IsNumber()
  ordersCount: number;
}
