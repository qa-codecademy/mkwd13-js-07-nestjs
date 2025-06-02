import { Type } from 'class-transformer';
import { OrderItemCreateDto } from './order-item-create.dto';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCreateDto {
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => OrderItemCreateDto)
  @ApiProperty({
    type: [OrderItemCreateDto],
    description: 'Ordered products with quantity info',
  })
  items: OrderItemCreateDto[];
}
