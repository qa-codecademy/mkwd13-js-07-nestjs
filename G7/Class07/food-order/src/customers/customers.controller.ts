import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const response = await this.customersService.create(createCustomerDto);

    return response;
  }

  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();
    return customers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // +id => Converts the string to number
    const customer = await this.customersService.findOne(+id);

    return customer;
  }

  @Patch(':id')
  async update(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Param('id') id: string,
  ) {
    const response = await this.customersService.update(+id, updateCustomerDto);

    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customersService.remove(+id);

    return { message: 'Success remove' };
  }
}
