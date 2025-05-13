import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    // @InjectRepository injects the Customer repository that was registered in the module
    // using TypeOrmModule.forFeature([Customer])
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // create() creates a new entity instance from a plain object
    // It doesn't save it to the database yet
    const customer = this.customerRepository.create(createCustomerDto);
    // save() persists the entity to the database
    const response = await this.customerRepository.save(customer);

    return response;
  }

  async findAll() {
    // find() returns all entities that match the criteria
    // Since we're not providing any criteria, it returns all menu items
    const customers = await this.customerRepository.find();

    return customers;
  }

  async findOne(id: number) {
    // findOneBy() returns the first entity that matches the criteria
    const customer = await this.customerRepository.findOneBy({ id: id });

    if (!customer) {
      throw new NotFoundException(`Customer with ID: ${id} not found.`);
    }

    return customer;
  }

  async remove(id: number) {
    // delete() removes entities that match the criteria
    // It returns information about the operation, like how many rows were affected
    const response = await this.customerRepository.delete(id);

    if (response.affected === 0) {
      throw new NotFoundException(`Customer with ID: ${id} not found.`);
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const response = await this.customerRepository.update(
      { id: id },
      updateCustomerDto,
    );

    if (response.affected === 0) {
      throw new NotFoundException(`Customer with ID: ${id} not found.`);
    }

    console.log(response);
    return response;
  }
}
