import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CarDetailsDto } from './car-details.dto';
import { Type } from 'class-transformer';
import { CarCategory, FuelType } from '../enums/vehicle.enums';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'Owner ID is required' })
  @IsString({ message: 'Owner ID must be a string' })
  @ApiProperty({
    description: 'Owner ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  ownerId: string;

  @IsNotEmpty({ message: 'Brand is required' })
  @IsString({ message: 'Brand must be a string' })
  @ApiProperty({
    description: 'Brand',
    example: 'Toyota',
    type: 'string',
  })
  brand: string;

  @IsNotEmpty({
    message: 'Model is required',
  })
  @IsString({
    message: 'Model must be a string',
  })
  @ApiProperty({
    description: 'Model',
    example: 'Corolla',
    type: 'string',
  })
  model: string;

  @IsNotEmpty({
    message: 'Images is required',
  })
  @IsString({
    message: 'Images must be a string',
  })
  @ApiProperty({
    description: 'Image',
    example: 'https://example.com/image.jpg',
    type: 'string',
  })
  images: string[];

  @IsNotEmpty({
    message: 'Production year is required',
  })
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Production year must be a number',
    },
  )
  @ApiProperty({
    description: 'Production year',
    example: 2020,
    type: 'number',
  })
  productionYear: number;

  @IsNotEmpty({
    message: 'Daily price is required',
  })
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'Daily price must be a number',
    },
  )
  @ApiProperty({
    description: 'Daily price',
    example: 50,
    type: 'number',
  })
  dailyPrice: number;

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

  @IsNotEmpty({
    message: 'Registration is required',
  })
  @IsString({
    message: 'Registration must be a string',
  })
  @ApiProperty({
    description: 'Registration',
    type: 'string',
  })
  registration: string;

  @IsNotEmpty({
    message: 'Location ID is required',
  })
  @IsString({
    message: 'Location ID must be a string',
  })
  @ApiProperty({
    description: 'Location ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  locationId: string;

  @IsNotEmpty({
    message: 'Vehicle type is required',
  })
  @IsEnum(VehicleType, {
    message: `Vehicle type must be one of the following: ${Object.values(
      VehicleType,
    ).join(', ')}`,
  })
  @ApiProperty({
    description: 'Vehicle type',
    enum: VehicleType,
    example: VehicleType.CAR,
  })
  vehicleType: VehicleType;

  @IsNotEmpty({ message: 'Details are required' })
  @ValidateNested()
  @Type(() => CarDetailsDto)
  @ApiProperty({
    description: 'Additional vehicle details',
    type: CarDetailsDto,
    example: {
      licensePlate: 'ABC1234',
      fuelType: FuelType.PETROL,
      isAutomatic: true,
      category: CarCategory.SMALL,
    },
  })
  details: CarDetailsDto;
}
