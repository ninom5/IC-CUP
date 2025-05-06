import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'rental-uuid' })
  rentalId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Your rental has been approved.' })
  message: string;
}
