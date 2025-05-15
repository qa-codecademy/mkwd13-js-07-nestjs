import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class OrderItemDto {
  @IsNumber()
  menuItemId: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @MaxLength(300)
  specialInstructions?: string;
}

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsOptional()
  status?: OrderStatus;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  orderItems: OrderItemDto[];
}
