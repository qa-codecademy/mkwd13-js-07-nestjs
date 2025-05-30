import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { RequestWithUser } from '../../common/types/request-with-user';

@Injectable()
export class ProductOwnershipGuard implements CanActivate {
  constructor(private readonly productService: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const { user, params } = request;

    // if there is no user it means that the user is not auth at all, so no need to check ownership
    if (!user) {
      return false;
    }

    const product = await this.productService.findOne(params.id);

    return product.createdById === user.id;
  }
}
