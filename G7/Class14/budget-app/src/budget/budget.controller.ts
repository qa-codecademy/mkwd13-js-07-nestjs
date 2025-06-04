import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return 'This action adds a new budget';
  }

  @Get()
  findAll() {
    return 'This action returns all budget';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} budget`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} budget`;
  }
}
