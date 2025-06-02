import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class ProductDimensionsDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Length of the product in cm',
    example: 10,
    minimum: 0.1,
  })
  length: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Width of the product in cm',
    example: 5,
    minimum: 0.1,
  })
  width: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Height of the product in cm',
    example: 2,
    minimum: 0.1,
  })
  height: number;
}
