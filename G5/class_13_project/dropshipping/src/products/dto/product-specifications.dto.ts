import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductSpecificationsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Specification name', example: 'Color' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Specification value', example: 'Red' })
  value: string;
}
