import { IsDateString, IsInt, IsString, Length, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @Length(3, 100)
  location: string;

  @IsDateString()
  date: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsInt()
  @Min(1)
  duration: number;
}
