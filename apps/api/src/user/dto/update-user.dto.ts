import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @Transform(({ value }) => (value ? undefined : value))
  email?: never;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty({
    example: 'Strastveni vozač i ljubitelj auta.',
    description: 'Opis korisnika vidljiv na javnom profilu.',
    required: false,
  })
  description?: string;
}
