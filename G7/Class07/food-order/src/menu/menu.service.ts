import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { Repository } from 'typeorm';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = this.menuItemRepository.create(createMenuItemDto);

    const response = this.menuItemRepository.save(menuItem);

    return response;
  }

  async findAll(): Promise<MenuItem[]> {
    const menuItems = this.menuItemRepository.find();

    return menuItems;
  }

  async findOne(id: number): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOneBy({ id: id });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with id: ${id} was not found.`);
    }

    return menuItem;
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    const response = await this.menuItemRepository.update(
      { id: id },
      updateMenuItemDto,
    );

    if (!response.affected) {
      throw new NotFoundException(`Menu item with id: ${id} was not found.`);
    }

    return response;
  }

  async remove(id: number) {
    const response = await this.menuItemRepository.delete({ id: id });

    if (!response.affected) {
      throw new NotFoundException(`Menu item with id: ${id} was not found.`);
    }
  }
}
