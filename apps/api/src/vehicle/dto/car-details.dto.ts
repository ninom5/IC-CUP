import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CarCategory, FuelType } from '../enums/vehicle.enums';

export class CarDetailsDto {
  @IsNotEmpty({ message: 'License plate is required' })
  @IsString({
    message: 'License plate must be a string',
  })
  @ApiProperty({
    description: 'License plate',
    example: 'ABC1234',
    type: 'string',
  })
  licensePlate: string;

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
    message: 'isAutomatic is required',
  })
  @IsBoolean({
    message: 'isAutomatic must be a boolean',
  })
  @ApiProperty({
    description: 'isAutomatic',
    example: true,
    type: 'boolean',
  })
  isAutomatic: boolean;

  @IsNotEmpty({
    message: 'Car Category is required',
  })
  @IsEnum(CarCategory, {
    message: `Car Category must be one of the following: ${Object.values(CarCategory).join(', ')}`,
  })
  @ApiProperty({
    description: 'Car Category',
    enum: CarCategory,
    example: CarCategory.SMALL,
  })
  category: CarCategory;
}
