import { OrderStatus } from './order-status.enum';

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}
