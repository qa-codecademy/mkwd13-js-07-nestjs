import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { LoggerService } from '../common/services/logger.service';
import {
  CreateProductDto,
  ProductDetailsDto,
  ProductDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly orderService: OrdersService,
    private readonly logger: LoggerService,
  ) {}

  // This mocks a database
  private products: ProductDto[] = [
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

  findAll(): ProductDto[] {
    this.logger.log(
      'ProductService',
      `User fetching all products. Products count: ${this.products.length}`,
    );
    return this.products;
  }

  findOne(id: number): ProductDto {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} is not found`);
    }

    return product;
  }

  productDetails(id: number): ProductDetailsDto {
    // Find the product
    const product = this.findOne(id);

    // Get orders count
    const ordersCount = this.orderService.getOrdersCountByProductId(id);

    // Attach the orders count

    return {
      ...product,
      ordersCount,
    } satisfies ProductDetailsDto;
  }

  create(body: CreateProductDto): ProductDto {
    const newProduct = {
      ...body,
      id: this.products.length + 1,
    } satisfies ProductDto;

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, body: UpdateProductDto): ProductDto {
    // find the product
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex < 0) {
      throw new NotFoundException(`Product with ID: ${id} is not found`);
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
