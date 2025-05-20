import { IsString } from 'class-validator';

export class CreatePostDto {
  // TODO: Add better validation
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  blogId: string;
}
