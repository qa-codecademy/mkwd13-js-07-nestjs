import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddRoleDto, AssignUserRolesDto } from './dto/assign-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './entity/user.entity';

@Controller('users')
// @UseGuards(RolesGuard) // context.getClass()
// @Roles(UserRole.ADMIN) // context.getClass()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard) // the user must be authenticated and authorized
  // context.getHandler()
  @Roles(UserRole.ADMIN) // this route is only accessible by the admin
  async findAll() {
    const users = await this.usersService.findAll();

    return users;
  }

  @Put(':id/roles')
  @UseGuards(JwtAuthGuard, RolesGuard) // the user must be authenticated and authorized
  @Roles(UserRole.ADMIN) // this route is only accessible by the admin
  async assignRoles(
    @Param('id') id: string,
    @Body() assignUserRolesDto: AssignUserRolesDto,
  ) {
    await this.usersService.assignRoles(+id, assignUserRolesDto.roles);

    return {
      message: 'Roles assigned successfully.',
    };
  }

  @Put(':id/roles/add')
  @UseGuards(JwtAuthGuard, RolesGuard) // the user must be authenticated and authorized
  @Roles(UserRole.ADMIN) // this route is only accessible by the admin
  async addRole(@Param('id') id: string, @Body() addRoleDto: AddRoleDto) {
    await this.usersService.addRole(+id, addRoleDto.role);

    return {
      message: 'Role added successfully.',
    };
  }

  @Post()
  async seedAdmin() {
    await this.usersService.seedAdmin();

    return {
      message: 'Admin seeded.',
    };
  }
}
