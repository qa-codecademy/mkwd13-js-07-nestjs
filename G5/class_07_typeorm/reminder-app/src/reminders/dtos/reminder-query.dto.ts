import { ApiPropertyOptional } from '@nestjs/swagger';
import { Priority } from '../../common/types/priority.enum';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ReminderSortBy } from '../../common/types/reminder-sort-by.enum';
import { SortDirection } from '../../common/types/sort-direction.enum';

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

  @IsOptional()
  @IsEnum(ReminderSortBy)
  @ApiPropertyOptional({
    enum: ReminderSortBy,
    default: ReminderSortBy.CreatedAt,
  })
  sortBy?: ReminderSortBy = ReminderSortBy.CreatedAt;

  @IsOptional()
  @IsEnum(SortDirection)
  @ApiPropertyOptional({
    enum: SortDirection,
    default: SortDirection.DESC,
  })
  sortDir?: SortDirection = SortDirection.DESC;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    type: Number,
    default: 10,
  })
  pageSize?: number = 10;
}
