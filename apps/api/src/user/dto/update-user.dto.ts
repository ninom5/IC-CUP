import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Rudera Boskovica 30' })
  address?: string;

  @IsOptional()
  // @IsPhoneNumber()
  @IsString()
  @ApiProperty({ example: '0919876543' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'novaLozinka123' })
  password?: string;
}
