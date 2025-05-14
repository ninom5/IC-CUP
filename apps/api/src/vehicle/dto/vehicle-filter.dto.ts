import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleFilterDto {
  @ApiPropertyOptional({
    description: 'Category of the vehicle',
    example: 'SUV',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Type of transmission',
    example: 'automatic',
  })
  @IsOptional()
  @IsString()
  transmission?: string;

  @ApiPropertyOptional({ description: 'Number of seats', example: '5' })
  @IsOptional()
  @IsString()
  numOfSeats?: string;

  @ApiPropertyOptional({
    description: 'Fuel type of the vehicle',
    example: 'diesel',
  })
  @IsOptional()
  @IsString()
  fuel?: string;

  @ApiPropertyOptional({
    description: 'Start date for availability',
    example: '2025-06-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date for availability',
    example: '2025-06-10T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
