import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'User email', example: 'admin@mail.com' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ description: 'User password', example: 'Pas$w0rd' })
  password: string;
}
