import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: CreateUserDto) {
    try {
      const hashedPassword = await hash(registerData.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...registerData,
          password: hashedPassword,
        },
      });

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        isSuspended: user.isSuspended,
      };

      return { token: this.jwtService.sign(payload) };
    } catch (error) {
      throw error instanceof BadRequestException ||
        error instanceof ForbiddenException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while registering ${error}`,
          );
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
      });

      if (!user) throw new BadRequestException('Invalid email or password');

      const isValidPassword = await compare(password, user?.password);
      if (!isValidPassword)
        throw new BadRequestException('Invalid email or password');

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error instanceof BadRequestException
        ? error
        : new InternalServerErrorException(
            `Server error trying to login: ${error}`,
          );
    }
  }
}
