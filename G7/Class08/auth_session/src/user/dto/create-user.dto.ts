import {
  IsEmail,
  MaxLength,
  MinLength,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 5,
    minNumbers: 2,
    minUppercase: 1,
    minLowercase: 2,
    minSymbols: 1,
  })
  password: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  firstName: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  lastName: string;
}
