import { Injectable } from '@nestjs/common';
import { Order, OrderCreate } from '../common/types/order';
import { OrderStatus } from '../common/types/order-status.enum';
import { ProductsService } from '../products/products.service';
import { Product } from '../common/types/product';

@Injectable()
export class OrdersService {
  constructor(private readonly productsService: ProductsService) {}

  // Mocking a DB
  private orders: Order[] = [
    {
      id: 1,
      items: [{ productId: 1, quantity: 2 }],
      total: 120,
      status: OrderStatus.Completed,
    },
  ];

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order | null {
    return this.orders.find((order) => order.id === id) ?? null;
  }

  create({ items }: OrderCreate): Order | null {
    // If there are no items (products) return null (error)
    if (!items.length) {
      return null;
    }

    // check if products have valid quantity
    const haveValidQuantity = items.every((item) => item.quantity >= 1);

    if (!haveValidQuantity) {
      return null;
    }

    // validate that each product exists
    const products: Product[] = [];
    for (const item of items) {
      const product = this.productsService.findOne(item.productId);

      if (!product) {
        return null;
      }

      products.push(product);
    }

    // Calculate the total order amount
    const total = items.reduce((sum, item) => {
      const product = products.find(
        (product) => product.id === item.productId,
      ) as Product;

      return sum + product.price * item.quantity;
    }, 0);

    const newOrder = {
      id: this.orders.length + 1,
      status: OrderStatus.Pending,
      items,
      total,
    } satisfies Order;

    this.orders.push(newOrder);

    return newOrder;
  }
}
