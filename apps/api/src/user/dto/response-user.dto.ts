import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
