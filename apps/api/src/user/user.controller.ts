import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
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

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Return user by id' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in',
  })
  getByEmail(@Query('email') email: string) {
    return this.userService.getByEmail(email);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Successfully registered user' })
  @ApiResponse({
    status: 400,
    description: 'Some data field is missing or is invalid',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
