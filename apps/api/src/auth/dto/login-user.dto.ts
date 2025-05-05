import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'stipe@stipic.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
