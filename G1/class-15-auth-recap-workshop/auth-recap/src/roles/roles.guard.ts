import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleType } from './roles.model';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const decoratorRoles = this.reflector.getAllAndOverride<RoleType[]>(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!decoratorRoles) return true;

    const userRoles = request.user.roles as RoleType[];

    console.log('user roles', userRoles);
    console.log('decorator roles', decoratorRoles);

    const hasAccess = userRoles.some((role) => decoratorRoles.includes(role));

    return hasAccess;
  }
}
