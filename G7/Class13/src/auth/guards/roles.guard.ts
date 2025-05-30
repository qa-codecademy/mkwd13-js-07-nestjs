import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // WE EXTRACT THE ROLES REQUIRED FOR THAT PARTICULAR CONTROLLER OR HTTP METHOD HANDLER
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [
        context.getClass(), // will get the roles if the decorator is used on WHOLE CLASS such as the controller
        context.getHandler(),
      ],
    );

    console.log('REQUIRED ROLES', requiredRoles);
    // IF THERE ARE NO ROLES REQUIRES WE LET THE REQUEST PROCEED
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Extract the user from the payload
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // IF THERE IS NO USER OR ROLES IT MEANS THE USER HAS NOT AUTHENTICATED AND WE WON'T LET THE
    // REQUEST PROCEED
    if (!user || !user.roles) {
      return false;
    }

    // WE CHECK IF THE USER IS AUTHORIZED TO THAT ROLE
    // MEANING, THE ROLE OF THE USER EXISTS IN THE ALLOWED ROLES
    const hasRequiredRoles = requiredRoles.some((role) =>
      user.roles.includes(role),
    );

    return hasRequiredRoles;
  }
}
