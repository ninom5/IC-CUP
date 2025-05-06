import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'rental-uuid' })
  rentalId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'user-uuid' })
  userId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Your rental has been approved.' })
  message?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  isRead?: boolean;
}
