import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @ApiProperty({
    description: 'Address',
    example: '123 Main St, Springfield, USA',
    type: 'string',
  })
  address: string;

  @IsString({ message: 'City must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'City',
    example: 'Springfield',
    type: 'string',
  })
  city?: string;

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
}
