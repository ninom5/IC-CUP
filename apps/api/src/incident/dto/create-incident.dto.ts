import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateIncidentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'rental-id-uuid' })
  rentalId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'reporter-id-uuid' })
  reporterId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  @ApiProperty({
    example: 'Damage on the rear bumper',
    minLength: 10,
    maxLength: 1000,
  })
  description: string;
}
