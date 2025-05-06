import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVehicleDto: CreateVehicleDto) {
    const data = {
      ...createVehicleDto,
      details: instanceToPlain(createVehicleDto.details),
    };

    return this.prisma.vehicle.create({
      data,
    });
  }

  findAll() {
    return this.prisma.vehicle.findMany();
  }

  findOne(id: string) {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  remove(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
