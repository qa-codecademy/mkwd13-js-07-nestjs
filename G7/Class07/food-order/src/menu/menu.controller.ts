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

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    const response = this.menuService.create(createMenuItemDto);

    return response;
  }

  @Get()
  findAll() {}

  @Get()
  findOne() {}

  @Patch()
  update() {}

  @Delete()
  remove() {}
}
