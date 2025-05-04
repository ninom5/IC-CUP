import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { Prisma } from '@prisma/client';

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
      throw error instanceof BadRequestException ||
        error instanceof ForbiddenException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while registering ${error}`,
          );
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
