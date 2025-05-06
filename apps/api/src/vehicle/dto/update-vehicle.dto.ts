import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CarDetailsDto } from './car-details.dto';
import { CarCategory, FuelType } from '../enums/vehicle.enums';

export class UpdateVehicleDto extends PartialType(
  OmitType(CreateVehicleDto, ['details'] as const),
) {
  @IsString({ message: 'Brand must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'Brand',
    example: 'Toyota',
    type: 'string',
  })
  brand?: string;

  @IsString({
    message: 'Model must be a string',
  })
  @IsOptional()
  @ApiProperty({
    description: 'Model',
    example: 'Corolla',
    type: 'string',
  })
  model?: string;

  @IsString({
    message: 'Images must be a string',
  })
  @IsOptional()
  @ApiProperty({
    description: 'Image',
    example: 'https://example.com/image.jpg',
    type: 'string',
  })
  images?: string[];

  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Production year must be a number',
    },
  )
  @IsOptional()
  @ApiProperty({
    description: 'Production year',
    example: 2020,
    type: 'number',
  })
  productionYear?: number;

  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Daily price must be a number',
    },
  )
  @IsOptional()
  @ApiProperty({
    description: 'Daily price',
    example: 50,
    type: 'number',
  })
  dailyPrice?: number;

  @IsString({
    message: 'Description must be a string',
  })
  @IsOptional()
  @ApiProperty({
    description: 'Description',
    example: 'A reliable and fuel-efficient car.',
    type: 'string',
  })
  description?: string;

  @IsString({
    message: 'Registration must be a string',
  })
  @IsOptional()
  @ApiProperty({
    description: 'Registration',
    type: 'string',
  })
  registration?: string;

  @IsString({
    message: 'Location ID must be a string',
  })
  @IsOptional()
  @ApiProperty({
    description: 'Location ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  locationId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CarDetailsDto)
  @ApiProperty({
    description: 'Updated vehicle details',
    type: CarDetailsDto,
    example: {
      licensePlate: 'ABC1234',
      fuelType: FuelType.PETROL,
      isAutomatic: true,
      category: CarCategory.SMALL,
    },
    required: false,
  })
  details?: Partial<CarDetailsDto>;
}
