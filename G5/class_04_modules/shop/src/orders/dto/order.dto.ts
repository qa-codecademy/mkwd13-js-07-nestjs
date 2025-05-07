import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNumber,
  Min,
} from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  @IsDefined()
  @Min(0)
  productId: number;

  @IsNumber()
  @IsDefined()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  items: OrderItemDto[];
}
