import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IsEndDateAfterStartDate } from 'src/utils/isEndDateAfterStartDate.decorator';

export class CreateVehicleAvailabilityDto {
  @ApiProperty({
    example: 'b0f7f3d8-8c4c-4b94-9d6c-4a7f6e16e4f2',
    description: 'Vehicle ID',
  })
  @IsNotEmpty({ message: 'Vehicle ID is required' })
  @IsString({ message: 'Vehicle ID must be a string' })
  vehicleId: string;

  @ApiProperty({
    example: '2025-06-01',
    description: 'Start date when the vehicle is available',
  })
  @IsNotEmpty({ message: 'Start date is required' })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @ApiProperty({
    example: '2025-06-10',
    description: 'End date when the vehicle is available',
  })
  @IsNotEmpty({ message: 'End date is required' })
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @IsEndDateAfterStartDate('startDate', {
    message: 'End date must be after start date',
  })
  endDate: Date;
}
