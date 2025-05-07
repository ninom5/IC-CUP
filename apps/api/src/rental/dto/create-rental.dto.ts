import { ApiProperty } from '@nestjs/swagger';
import { RentalStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateRentalDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'user-uuid' })
  renterId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'vehicle-uuid' })
  vehicleId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-06-01T10:00:00.000Z' })
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-06-05T10:00:00.000Z' })
  endDate: Date;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ example: 250 })
  totalPrice: number;

  @IsEnum(RentalStatus)
  @IsOptional()
  @ApiProperty({ example: 'PENDING', enum: RentalStatus })
  status?: RentalStatus;
}
