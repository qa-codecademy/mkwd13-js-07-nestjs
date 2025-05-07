import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Order, OrderCreate, OrderUpdate } from '../common/types/order';
import { OrderStatus } from '../common/types/order-status.enum';
import { ProductsService } from '../products/products.service';
import { Product } from '../common/types/product';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  // Mocking a DB
  private orders: Order[] = [
    {
      id: 1,
      items: [{ productId: 1, quantity: 2 }],
      total: 120,
      status: OrderStatus.Completed,
    },
    {
      id: 1,
      items: [{ productId: 1, quantity: 5 }],
      total: 321,
      status: OrderStatus.Completed,
    },
    {
      id: 2,
      items: [{ productId: 2, quantity: 1 }],
      total: 33,
      status: OrderStatus.Pending,
    },
  ];

  findAll(): Order[] {
    return this.orders.filter((o) => o.status !== OrderStatus.Canceled);
  }

  findOne(id: number): Order | null {
    return (
      this.orders.find(
        (order) => order.id === id && order.status !== OrderStatus.Canceled,
      ) ?? null
    );
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

  update({ items }: OrderUpdate, id: number): Order | null {
    // check if the order exists > if no order > return null
    const existingOrderIndex = this.orders.findIndex(
      (order) => order.id === id,
    );

    if (existingOrderIndex < 0) {
      return null;
    }

    // check if order is in status pending
    if (this.orders[existingOrderIndex].status !== OrderStatus.Pending) {
      return null;
    }

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

    // update the order
    const updatedOrder = {
      ...this.orders[existingOrderIndex],
      items,
      total,
    } satisfies Order;

    this.orders[existingOrderIndex] = updatedOrder;

    // return the updated order
    return updatedOrder;
  }

  cancel(id: number): void {
    const existingOrderIndex = this.orders.findIndex(
      (order) => order.id === id,
    );

    if (existingOrderIndex < 0) {
      return;
    }

    this.orders[existingOrderIndex].status = OrderStatus.Canceled;
  }

  getOrdersCountByProductId(productId: number): number {
    return this.orders.reduce((sum, order) => {
      const item = order.items.find((i) => i.productId === productId);
      console.log(item);

      if (!item) {
        return sum;
      }

      sum += item.quantity;
      return sum;
    }, 0);
  }
}

// sum += order.items
// .filter((item) => item.productId === productId)
// .reduce((productSum, product) => {
//   productSum += product.quantity;
//   return productSum;
// }, 0);
