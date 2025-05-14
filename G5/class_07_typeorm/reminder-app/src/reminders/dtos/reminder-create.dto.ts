import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from '../../common/types/priority.enum';

export class ReminderCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Go for a walk',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: 'Go to walk around the neighborhood',
  })
  description?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  dueDate: Date;

  @IsEnum(Priority)
  @IsOptional()
  @ApiPropertyOptional({
    enum: Priority,
    example: Priority.Medium,
    default: Priority.Medium,
  })
  priority: Priority = Priority.Medium;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    example: false,
    default: false,
  })
  isCompleted: boolean = false;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'The ID of a user that is the author of the reminder',
    example: 1,
  })
  authorId: number;
}
