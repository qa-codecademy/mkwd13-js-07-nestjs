import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name', example: 'Admin User' })
  name: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'User age', example: 18 })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User location', example: 'London' })
  location: string;
}
