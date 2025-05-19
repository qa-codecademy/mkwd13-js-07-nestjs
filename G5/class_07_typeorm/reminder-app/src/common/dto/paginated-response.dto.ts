import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    type: Array<T>,
  })
  payload: T[];

  @ApiProperty({
    type: Number,
    description: 'The total number of items',
    example: 100,
  })
  total: number;
}
