import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailUnique } from '../../utils/isEmailUnique.decorator';
import { Type } from 'class-transformer';
import { Match } from 'src/utils/doesPasswordsMatch.decorator';

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
  @ApiProperty({ example: 'stipe@stipic.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password' })
  @Match('password')
  confirmPassword: string;

  @ApiProperty({ example: '2000-01-01T00:00:00.000Z', type: String })
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'somelink.com' })
  personPhoto: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'somelink.com' })
  driverLicense: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'somelink.com' })
  idCard: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '0919876543' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rudera Boskovica 30' })
  address: string;
}
