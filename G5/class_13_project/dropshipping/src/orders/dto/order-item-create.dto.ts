import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class OrderItemCreateDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    description: 'The id of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'Quantity of the ordered product',
    example: 2,
  })
  quantity: number;
}
