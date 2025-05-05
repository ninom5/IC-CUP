import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
    message: 'Vehicle type ID is required',
  })
  @IsString({
    message: 'Vehicle type ID must be a string',
  })
  @ApiProperty({
    description: 'Vehicle type ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  vehicleTypeId: string;
}
