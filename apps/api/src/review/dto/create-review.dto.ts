import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Rental ID is required' })
  @IsString({ message: 'Rental ID must be a string' })
  @ApiProperty({
    description: 'Rental ID',
    example: '12345678-1234-1234-1234-123456789012',
    type: 'string',
  })
  rentalId: string;

  @IsNotEmpty({
    message: 'Rating is required',
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 1 },
    {
      message: 'Ocjena mora biti broj (do 1 decimalnog mjesta)',
    },
  )
  @Min(1, { message: 'Ocjena ne može biti manja od 1' })
  @Max(5, { message: 'Ocjena ne može biti veća od 5' })
  @ApiProperty({
    description: 'Ocjena vozila od 1 do 5 sa decimalnim vrijednostima',
    example: 4.5,
    type: 'number',
    format: 'float',
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @IsString({ message: 'Comment must be a string' })
  @IsOptional()
  @ApiProperty({
    description: 'Comment',
    example: 'Great experience!',
    type: 'string',
  })
  comment?: string;
}
