import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../common/types/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderUpdateDto {
  @IsEnum(OrderStatus)
  @ApiProperty({
    description: 'Order status',
    enum: OrderStatus,
    example: OrderStatus.Canceled,
  })
  status: OrderStatus;
}
