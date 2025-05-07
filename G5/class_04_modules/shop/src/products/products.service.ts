import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CreateProduct,
  Product,
  ProductDetails,
  UpdateProduct,
} from '../common/types/product';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly orderService: OrdersService,
  ) {}

  // This mocks a database
  private products: Product[] = [
    {
      id: 1,
      name: 'Table',
      price: 10,
      description: 'A very nice table',
    },
    {
      id: 2,
      name: 'Keyboard',
      price: 100,
      description: 'A very nice keyboard',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | null {
    return this.products.find((product) => product.id === id) ?? null;
  }

  productDetails(id: number): ProductDetails | null {
    // Find the product
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    // Get orders count
    const ordersCount = this.orderService.getOrdersCountByProductId(id);

    // Attach the orders count

    return {
      ...product,
      ordersCount,
    } satisfies ProductDetails;
  }

  create(body: CreateProduct): Product {
    const newProduct = {
      ...body,
      id: this.products.length + 1,
    } satisfies Product;

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, body: UpdateProduct): Product | null {
    // find the product
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex < 0) {
      return null;
    }

    // update the product
    const updatedProduct = {
      ...this.products[productIndex],
      ...body,
      id,
    };

    this.products[productIndex] = updatedProduct;

    // return the product
    return updatedProduct;
  }

  delete(id: number): void {
    const index = this.products.findIndex((product) => product.id === id);

    if (index < 0) {
      return;
    }

    this.products.splice(index, 1);
  }
}
