import { IsArray, IsEnum } from 'class-validator';
import { UserRole } from '../entity/user.entity';

export class AssignUserRolesDto {
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}

export class AddRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
