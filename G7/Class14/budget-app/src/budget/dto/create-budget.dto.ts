import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsDate()
  fromDate: Date;

  @IsDate()
  toDate: Date;
}
