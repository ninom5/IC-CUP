import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class VehicleFiltersDto {
  @IsNotEmpty({ message: 'Start date is required' })
  @IsDateString(
    { strict: true },
    { message: 'Start date must be a valid date in YYYY-MM-DD format' },
  )
  @ApiProperty({
    description: 'Start date for the rental period',
    example: '2023-10-01',
    type: 'string',
    format: 'date',
  })
  startDate: string;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDateString(
    { strict: true },
    { message: 'End date must be a valid date in YYYY-MM-DD format' },
  )
  @ApiProperty({
    description: 'End date for the rental period',
    example: '2023-10-10',
    type: 'string',
    format: 'date',
  })
  endDate: string;
}
