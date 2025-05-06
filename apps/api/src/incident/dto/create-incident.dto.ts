import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  @ApiProperty({ example: 'Damage on the rear bumper' })
  description: string;
}
