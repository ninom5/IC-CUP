import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleTypeDto {
  @IsNotEmpty({ message: 'Vehicle type is required' })
  @IsString({ message: 'Vehicle type must be a string' })
  @ApiProperty({
    description: 'Vehicle type',
    example: 'Car',
    type: 'string',
  })
  type: string;
}
