import {
  Controller,
  Get,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  private products = [
    {
      id: 1,
      name: 'Shampoo',
    },
    {
      id: 2,
      name: 'Soap',
    },
  ];

  @Get()
  @ApiOperation({
    summary: 'Get products',
  })
  getProducts(@Session() session: Record<string, any>) {
    console.log('Session', session);

    if (!session?.userId) {
      throw new UnauthorizedException('You are not allowed to see this!');
    }

    return this.products;
  }
}
