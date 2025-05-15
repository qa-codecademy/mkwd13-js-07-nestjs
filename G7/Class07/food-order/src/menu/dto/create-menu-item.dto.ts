import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(500)
  @MinLength(5)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  category: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
