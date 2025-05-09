import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '../../common/types/order-status.enum';

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
  @ArrayNotEmpty({
    message: 'You must have at least one product selected',
  })
  @Type(() => OrderItemDto)
  @ValidateNested()
  items: OrderItemDto[];
}

export class UpdateOrderDto extends CreateOrderDto {}

export class OrderDto extends CreateOrderDto {
  // Decorators in response return types are not needed as they are not even used in most cases

  id: number;
  total: number;
  status: OrderStatus;
}

// how the body is looked by the class validator
// new CreateOrderDto({
//   items: [
// when is just a JS object it is NOT validated
//     {
//       "productId": 1,
//       "quantity": 0
//     },
// when the object is converted to a new instance of the class it IS validated
//     new OrderItemDto({
//       "productId": 1,
//       "quantity": 0
//   })
//   ]
// })
