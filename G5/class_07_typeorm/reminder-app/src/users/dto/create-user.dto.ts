import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    type: String,
    example: 'john.doe',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  avatarUrl?: string;
}
