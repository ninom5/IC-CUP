import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'rental-id-uuid' })
  rentalId?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ example: 300.5 })
  amount?: number;
}
