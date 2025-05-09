import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiResponse({ status: 201, description: 'Successfully registered user' })
  @ApiResponse({
    status: 400,
    description: 'Some data field is missing or is invalid',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @ApiResponse({
    status: 201,
    description: 'Successfully logged in, returns token',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData.email, loginData.password);
  }
}
