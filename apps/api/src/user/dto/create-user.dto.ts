import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailUnique } from '../../utils/isEmailUnique.decorator';
import { Role } from '../../../generated/prisma';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @ApiProperty({ example: 'stipe' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @ApiProperty({ example: 'stipic' })
  lastName: string;

  @IsEmail()
  @Validate(IsEmailUnique)
  @ApiProperty({ example: 'ante@antic.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsEnum(Role)
  role: string;

  @IsString()
  @IsNotEmpty()
  driverLicense: string;

  @IsString()
  @IsNotEmpty()
  idCard: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  bankAccount: string;
}
