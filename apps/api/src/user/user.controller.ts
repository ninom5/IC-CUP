import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/user-auth.guard';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiResponse({ status: 200, description: 'Return all users in db' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in or you are not admin',
  })
  findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Return user by id' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in',
  })
  findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Get('email')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Return user by id' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in',
  })
  getByEmail(@Query('email') email: string) {
    return this.userService.getByEmail(email);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, type: ResponseUserDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('suspend/:id')
  @UseGuards(AdminAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Successfully suspended/unsuspended user',
  })
  suspendUser(@Param('id') id: string) {
    return this.userService.suspend(id);
  }
}
