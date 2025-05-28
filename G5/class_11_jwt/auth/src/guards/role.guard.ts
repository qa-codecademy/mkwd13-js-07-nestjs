import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../types/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();
    console.log('USER IN REQ:', user);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return requiredRoles.includes(user.role);
  }
}

// Types of role checking
// Who can access this endpoint?
// 1. @Roles(Role.User, Role.Admin, 'all-of-these') Any of these roles
// 2. @Roles(Role.Moderator, Role.Platform_Admin, 'all-of-these') All of these roles
// 3. @Roles(Role.Editor, 'all-except-this') All except this
