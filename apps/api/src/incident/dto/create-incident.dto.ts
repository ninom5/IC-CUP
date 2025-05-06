import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'rental-id-uuid' })
  rentalId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'reporter-id-uuid' })
  reporterId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Damage on the rear bumper' })
  description: string;
}
