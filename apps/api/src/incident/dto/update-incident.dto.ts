import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIncidentDto } from './create-incident.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIncidentDto extends PartialType(CreateIncidentDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'rental-id-uuid' })
  rentalId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'reporter-id-uuid' })
  reporterId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Damage on the rear bumper' })
  description?: string;
}
