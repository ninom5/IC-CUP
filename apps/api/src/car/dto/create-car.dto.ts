import { ApiProperty } from '@nestjs/swagger';
import { CarCategory, FuelType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty({ message: 'Vehicle type ID is required' })
  @IsString({ message: 'Vehicle type ID must be a string' })
  @ApiProperty({
    description: 'Vehicle type ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  vehicleTypeId: string;

  @IsNotEmpty({ message: 'License plate is required' })
  @IsString({ message: 'License plate must be a string' })
  @ApiProperty({
    description: 'License plate',
    example: 'ABC1234',
    type: 'string',
  })
  licensePlate: string;

  @IsNotEmpty({ message: 'Fuel type is required' })
  @IsEnum(FuelType, {
    message: `Fuel type must be one of the following: ${Object.values(FuelType).join(', ')}`,
  })
  @ApiProperty({
    description: 'Fuel type',
    enum: FuelType,
    example: FuelType.PETROL,
  })
  fuelType: FuelType;

  @IsNotEmpty({ message: 'Information if the car is automatic is required' })
  @IsBoolean({ message: 'isAutomatic must be a boolean' })
  @ApiProperty({
    description: 'Information if the car is automatic',
    example: true,
    type: 'boolean',
  })
  isAutomatic: boolean;

  @IsNotEmpty({ message: 'Car category is required' })
  @IsEnum(CarCategory, {
    message: `Car category must be one of the following: ${Object.values(CarCategory).join(', ')}`,
  })
  @ApiProperty({
    description: 'Car category',
    enum: CarCategory,
    example: CarCategory.SUV,
  })
  category: CarCategory;
}
