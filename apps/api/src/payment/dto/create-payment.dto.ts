import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'rental-id-uuid' })
  rentalId: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ example: 300.5 })
  amount: number;
}
