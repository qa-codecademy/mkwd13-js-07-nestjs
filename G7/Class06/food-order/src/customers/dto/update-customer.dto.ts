import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

// PartialType(CreateCustomerDto) creates same DTO structure as CreateCustomerDto but all properties are optional
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
