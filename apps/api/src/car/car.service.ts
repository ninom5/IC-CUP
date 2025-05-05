import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: createCarDto,
    });
  }

  async findAll() {
    return this.prisma.car.findMany();
  }

  async findOne(id: string) {
    return this.prisma.car.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    return this.prisma.car.update({
      where: { id },
      data: updateCarDto,
    });
  }

  async remove(id: string) {
    return this.prisma.car.delete({
      where: { id },
    });
  }
}
