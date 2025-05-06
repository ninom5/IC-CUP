import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRentalDto } from './create-rental.dto';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RentalStatus } from '@prisma/client';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'user-uuid' })
  renterId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'vehicle-uuid' })
  vehicleId?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2025-06-01T10:00:00.000Z' })
  startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2025-06-05T10:00:00.000Z' })
  endDate?: Date;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ example: 250 })
  totalPrice?: number;

  @IsEnum(RentalStatus)
  @IsOptional()
  @ApiProperty({ example: 'PENDING', enum: RentalStatus })
  status?: RentalStatus;
}
