import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class OrderStatsQueryDto {
  @ApiPropertyOptional({
    example: '2025-01-01',
  })
  @IsOptional()
  @IsDateString()
  // @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    example: '2025-06-01',
  })
  @IsOptional()
  @IsDateString()
  // @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  @IsIn(['day', 'week', 'month', 'year'])
  period?: string;
}
