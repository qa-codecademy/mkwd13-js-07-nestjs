import {
  Controller,
  Get,
  Param,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { SessionObject } from 'src/user/types';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  /**
   * Session Authentication in Action:
   * ---------------------------------
   * 1. The @Session() decorator injects the session object associated with this request
   * 2. When a user logs in (see user.controller.ts), their ID is stored in the session
   * 3. For each subsequent request, the browser automatically sends the session cookie
   * 4. Express-session middleware validates the cookie and populates this session object
   * 5. We can then check if userId or loggedIn exists to see if the user is authenticated
   *
   * Note: By default, the session data is stored in server memory, which is not
   * suitable for production. In real apps, you would configure a session store like
   * Redis or a database to persist sessions across server restarts.
   */
  @Post(':id')
  async purchase(@Param('id') id: string, @Session() session: SessionObject) {
    console.log('Session in purchase', session);
    // Check if loggedIn exists in the session (set during login)
    if (!session.loggedIn) {
      throw new UnauthorizedException('Please login to make a purchase');
    }

    const product = await this.productsService.purchase(+id);

    return { message: 'sucess purchase', product };
  }
}
