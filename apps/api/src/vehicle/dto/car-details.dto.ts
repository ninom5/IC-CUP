import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CarCategory, FuelType } from '../enums/vehicle.enums';
import { Transmission } from '@prisma/client';

export class CarDetailsDto {
  @IsNotEmpty({
    message: 'Fuel type is required',
  })
  @IsEnum(FuelType, {
    message: `Fuel type must be one of the following: ${Object.values(FuelType).join(', ')}`,
  })
  @ApiProperty({
    description: 'Fuel type',
    enum: FuelType,
    example: FuelType.PETROL,
  })
  fuelType: FuelType;

  @IsNotEmpty({
    message: 'Transmission type is required',
  })
  @IsEnum(Transmission, {
    message: `Transmission type must be one of the following: ${Object.values(Transmission).join(', ')}`,
  })
  @ApiProperty({
    description: 'Transmission type',
    enum: Transmission,
    example: Transmission.MANUAL,
  })
  transmission: Transmission;

  @IsNotEmpty({
    message: 'Car Category is required',
  })
  @IsEnum(CarCategory, {
    message: `Car Category must be one of the following: ${Object.values(CarCategory).join(', ')}`,
  })
  @ApiProperty({
    description: 'Car Category',
    enum: CarCategory,
    example: CarCategory.SUV,
  })
  category: CarCategory;

  @IsNotEmpty({
    message: 'Number of seats is required',
  })
  @IsIn([2, 5, 7], {
    message: 'Number of seats must be either 2, 5, or 7',
  })
  @ApiProperty({
    description: 'Number of seats in the car',
    enum: [2, 5, 7],
    example: 5,
  })
  numOfSeats: number;
}
