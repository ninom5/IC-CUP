import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { CarCategory, FuelType } from '@prisma/client';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString({ message: 'Vehicle type ID must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'Vehicle type ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  vehicleTypeId?: string;

  @IsString({ message: 'License plate must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'License plate',
    example: 'ABC1234',
    type: 'string',
  })
  licensePlate?: string;

  @IsEnum(FuelType, {
    message: `Fuel type must be one of the following: ${Object.values(FuelType).join(', ')}`,
  })
  @IsOptional()
  @ApiProperty({
    description: 'Fuel type',
    enum: FuelType,
    example: FuelType.PETROL,
  })
  fuelType?: FuelType;

  @IsBoolean({ message: 'isAutomatic must be a boolean' })
  @IsOptional()
  @ApiProperty({
    description: 'Information if the car is automatic',
    example: true,
    type: 'boolean',
  })
  isAutomatic?: boolean;

  @IsEnum(CarCategory, {
    message: `Car category must be one of the following: ${Object.values(CarCategory).join(', ')}`,
  })
  @IsOptional()
  @ApiProperty({
    description: 'Car category',
    enum: CarCategory,
    example: CarCategory.SUV,
  })
  category?: CarCategory;
}
