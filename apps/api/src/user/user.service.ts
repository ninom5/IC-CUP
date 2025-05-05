import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async register(payload: CreateUserDto) {
    try {
      const hashedPassword = await hash(payload.password, 10);

      const userData = {
        ...payload,
        password: hashedPassword,
      } as Prisma.UserCreateArgs['data'];

      return await this.prisma.user.create({
        data: userData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError)
        throw new BadRequestException(`Validation failed: ${error.message}`);

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    delete updateUserDto.email;
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }
}
