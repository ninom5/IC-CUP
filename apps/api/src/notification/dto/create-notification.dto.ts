import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
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
  @MaxLength(500)
  @ApiProperty({ example: 'Your rental has been approved.', maxLength: 500 })
  message: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  isRead?: boolean;
}
