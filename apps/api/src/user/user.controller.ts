import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
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

  @Post('/auth/register')
  @ApiResponse({ status: 201, description: 'Successfully registered user' })
  @ApiResponse({
    status: 400,
    description: 'Some data field is missing or is invalid',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/auth/login')
  @ApiResponse({
    status: 201,
    description: 'Successfully logged in, returns token',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  login(@Body() loginData: LoginUserDto) {
    return this.userService.login(loginData.email, loginData.password);
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
}
