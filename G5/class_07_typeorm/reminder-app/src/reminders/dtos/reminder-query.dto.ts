import { ApiPropertyOptional } from '@nestjs/swagger';
import { Priority } from '../../common/types/priority.enum';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ReminderQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  searchTerm?: string;

  @IsEnum(Priority)
  @IsOptional()
  @ApiPropertyOptional({
    enum: Priority,
  })
  priority?: Priority;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      return undefined;
    }
  })
  @ApiPropertyOptional({
    type: Boolean,
  })
  isCompleted?: boolean;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    type: Date,
  })
  startDueDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    type: Date,
  })
  endDueDate?: Date;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
  })
  authorId?: number;
}
