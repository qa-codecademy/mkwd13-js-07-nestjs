import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from '../../common/types/priority.enum';

export class ReminderUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: 'Go for a walk',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: 'Go to walk around the neighborhood',
  })
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  dueDate?: Date;

  @IsEnum(Priority)
  @IsOptional()
  @ApiPropertyOptional({
    enum: Priority,
    example: Priority.Medium,
  })
  priority?: Priority;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    example: false,
  })
  isCompleted?: boolean;
}
