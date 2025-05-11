import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isSuspended: true,
        isVerified: true,
      },
    });
  }

  async getById(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isSuspended: true,
        isVerified: true,
        role: true,
        personPhoto: true,
        description: true,
      },
    });
    if (!user) throw new NotFoundException('User with provided id not found');

    return user;
  }

  async getByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isSuspended: true,
        isVerified: true,
      },
    });
    if (!user)
      throw new NotFoundException('User with provided email not found');

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    delete updateUserDto.email;
    if (updateUserDto.password)
      updateUserDto.password = await hash(updateUserDto.password, 10);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async suspend(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) throw new NotFoundException('User not found');

      return this.prisma.user.update({
        where: { id },
        data: { isSuspended: !user?.isSuspended },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          isSuspended: true,
        },
      });
    } catch (error) {
      throw new error() instanceof NotFoundException
        ? error
        : new InternalServerErrorException(`Error suspending user: ${error}`);
    }
  }
}
