import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '../common/types/order-status.enum';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from './dto/order.dto';
import { ProductDto } from '../products/dto/product.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  // Mocking a DB
  private orders: OrderDto[] = [
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

  findAll(): OrderDto[] {
    return this.orders.filter((o) => o.status !== OrderStatus.Canceled);
  }

  findOne(id: number): OrderDto {
    const order: OrderDto | undefined = this.orders.find(
      (order) => order.id === id && order.status !== OrderStatus.Canceled,
    );

    if (!order) {
      throw new NotFoundException(`Order with ID: ${id} is not found`);
    }

    return order;
  }

  create({ items }: CreateOrderDto): OrderDto {
    // If there are no items (products) return null (error)
    // if (!items.length) {
    //   return null;
    // }

    // check if products have valid quantity
    // const haveValidQuantity = items.every((item) => item.quantity >= 1);

    // if (!haveValidQuantity) {
    //   return null;
    // }

    // validate that each product exists
    const products: ProductDto[] = [];
    for (const item of items) {
      const product = this.productsService.findOne(item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product with ID: ${item.productId} is not found`,
        );
      }

      products.push(product);
    }

    // Calculate the total order amount
    const total = items.reduce((sum, item) => {
      const product = products.find(
        (product) => product.id === item.productId,
      ) as ProductDto;

      return sum + product.price * item.quantity;
    }, 0);

    const newOrder = {
      id: this.orders.length + 1,
      status: OrderStatus.Pending,
      items,
      total,
    } satisfies OrderDto;

    this.orders.push(newOrder);

    return newOrder;
  }

  update({ items }: UpdateOrderDto, id: number): OrderDto {
    // check if the order exists > if no order > return null
    const existingOrderIndex = this.orders.findIndex(
      (order) => order.id === id,
    );

    if (existingOrderIndex < 0) {
      throw new NotFoundException(`Order with ID: ${id} is not found`);
    }

    // check if order is in status pending
    if (this.orders[existingOrderIndex].status !== OrderStatus.Pending) {
      throw new BadRequestException(
        `Order with ID: ${id} is ${this.orders[existingOrderIndex].status}`,
      );
    }

    // If there are no items (products) return null (error)
    // if (!items.length) {
    //   return null;
    // }

    // check if products have valid quantity
    // const haveValidQuantity = items.every((item) => item.quantity >= 1);

    // if (!haveValidQuantity) {
    //   return null;
    // }

    // validate that each product exists
    const products: ProductDto[] = [];
    for (const item of items) {
      const product = this.productsService.findOne(item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product with ID: ${item.productId} is not found`,
        );
      }

      products.push(product);
    }

    // Calculate the total order amount
    const total = items.reduce((sum, item) => {
      const product = products.find(
        (product) => product.id === item.productId,
      ) as ProductDto;

      return sum + product.price * item.quantity;
    }, 0);

    // update the order
    const updatedOrder = {
      ...this.orders[existingOrderIndex],
      items,
      total,
    } satisfies OrderDto;

    this.orders[existingOrderIndex] = updatedOrder;

    // return the updated order
    return updatedOrder;
  }

  cancel(id: number): void {
    const existingOrderIndex = this.orders.findIndex(
      (order) => order.id === id,
    );

    if (existingOrderIndex < 0) {
      throw new NotFoundException(`Order with ID: ${id} is not found`);
    }

    if (this.orders[existingOrderIndex].status !== OrderStatus.Pending) {
      throw new BadRequestException(
        `Order is in status ${this.orders[existingOrderIndex].status}`,
      );
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
