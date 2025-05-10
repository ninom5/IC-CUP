import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '@prisma/client';
import {
  IsArray,
  IsDate,
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
  @IsArray({ message: 'Images must be an array' })
  @IsString({ each: true, message: 'Each image must be a string URL' })
  @ApiProperty({
    description: 'Image',
    example: ['https://example.com/image.jpg'],
    type: [String],
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
    message: 'Registration expiration date is required',
  })
  @IsDate({
    message: 'Registration expiration must be a valid date',
  })
  @ApiProperty({
    description: 'Registration expiration date',
    type: 'string',
    example: '2025-12-31',
  })
  registrationExpiration: Date;

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

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @ApiProperty({
    description: 'Address',
    example: '123 Main St, Springfield, USA',
    type: 'string',
  })
  pickupAddress: string;

  @IsString({ message: 'City must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'City',
    example: 'Springfield',
    type: 'string',
  })
  city: string;

  @IsNotEmpty({ message: 'Longitude is required' })
  @IsNumber(
    {
      allowNaN: false,
    },
    { message: 'Longitude must be a number' },
  )
  @ApiProperty({
    description: 'Longitude',
    example: -123.456,
    type: 'number',
  })
  longitude: number;

  @IsNotEmpty({ message: 'Latitude is required' })
  @IsNumber(
    {
      allowNaN: false,
    },
    { message: 'Latitude must be a number' },
  )
  @ApiProperty({
    description: 'Latitude',
    example: 45.678,
    type: 'number',
  })
  latitude: number;

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
      numOfSeats: 5,
    },
  })
  details: CarDetailsDto;
}
