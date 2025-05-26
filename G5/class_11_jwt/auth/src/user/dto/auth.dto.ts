import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'john.doe@test.com',
  })
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    type: String,
    example: 'Pas$w0rd',
  })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  name: string;
}

export class UserResponseDto extends RegisterDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;
}
