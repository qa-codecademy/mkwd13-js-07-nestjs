import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateCustomerDto } from 'src/customers/dto/update-customer.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    const response = this.menuService.create(createMenuItemDto);

    return response;
  }

  @Get()
  findAll() {
    const menuItems = this.menuService.findAll();

    return menuItems;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const menuItem = this.menuService.findOne(+id);

    return menuItem;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateCustomerDto,
  ) {
    const response = this.menuService.update(+id, updateMenuItemDto);

    return {
      message: 'Success update',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.menuService.remove(+id);

    return {
      message: 'Success delete',
    };
  }
}
