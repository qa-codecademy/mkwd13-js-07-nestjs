import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(): Promise<Transaction[]> {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
    return await this.transactionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.transactionsService.remove(id);
  }

  // Premium features for loyal customers
  @UseGuards(RolesGuard)
  @Roles(UserRole.LOYAL_CUSTOMER)
  @Get('analytics/summary')
  async getAnalyticsSummary() {
    return {
      message: 'Detailed financial summary for loyal customers',
      totalIncome: 5000,
      totalExpenses: 3000,
      netSavings: 2000,
      categoryBreakdown: [
        { category: 'Food', amount: 1000 },
        { category: 'Transport', amount: 500 },
        { category: 'Entertainment', amount: 300 },
      ],
    };
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.LOYAL_CUSTOMER)
  @Get('analytics/trends')
  async getAnalyticsTrends() {
    return {
      message: 'Spending pattern analysis for loyal customers',
      monthlyTrends: [
        { month: 'January', income: 2000, expenses: 1500 },
        { month: 'February', income: 2200, expenses: 1600 },
        { month: 'March', income: 2100, expenses: 1400 },
      ],
      insights: [
        'Spending decreased by 10% this month',
        'Income increased steadily',
      ],
    };
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.LOYAL_CUSTOMER)
  @Get('analytics/categories')
  async getAnalyticsCategories() {
    return {
      message: 'Category-wise breakdown for loyal customers',
      categories: [
        { name: 'Food & Dining', percentage: 40, amount: 1200 },
        { name: 'Transportation', percentage: 20, amount: 600 },
        { name: 'Shopping', percentage: 25, amount: 750 },
        { name: 'Entertainment', percentage: 15, amount: 450 },
      ],
    };
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.LOYAL_CUSTOMER)
  @Get('export/csv')
  async exportToCsv() {
    return {
      message: 'CSV export successful for loyal customers',
      downloadUrl: '/downloads/transactions.csv',
      format: 'CSV',
    };
  }
}
