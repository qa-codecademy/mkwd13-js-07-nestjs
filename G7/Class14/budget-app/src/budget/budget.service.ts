import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const budget = this.budgetRepository.create(createBudgetDto);
    return await this.budgetRepository.save(budget);
  }

  async findAll(): Promise<Budget[]> {
    return await this.budgetRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id },
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async findBudgetWithTransactions(id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.findOne(id);

    Object.assign(budget, updateBudgetDto);
    budget.updatedAt = new Date();

    return await this.budgetRepository.save(budget);
  }

  async remove(id: number): Promise<void> {
    const budget = await this.findOne(id);
    await this.budgetRepository.remove(budget);
  }
}
