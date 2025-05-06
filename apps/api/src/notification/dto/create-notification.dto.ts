import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'rental-uuid' })
  rentalId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Your rental has been approved.' })
  message: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  isRead?: boolean;
}
