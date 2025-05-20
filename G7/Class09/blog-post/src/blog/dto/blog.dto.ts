import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'Title must be of type string amigo.' })
  @MaxLength(40)
  @MinLength(4, { message: 'Title must be at-least four characters.' })
  title: string;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  description?: string;

  @MaxLength(30)
  @IsString()
  @MinLength(4)
  author: string;
}
