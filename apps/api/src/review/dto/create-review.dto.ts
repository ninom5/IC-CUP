import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString({
    message: 'Rating must be a number',
  })
  @ApiProperty({
    description: 'Rating',
    example: 4.5,
    type: 'number',
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
