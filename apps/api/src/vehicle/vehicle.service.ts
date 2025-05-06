import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVehicleDto: CreateVehicleDto) {
    const ownerExists = await this.prisma.user.findUnique({
      where: { id: createVehicleDto.ownerId },
    });

    if (!ownerExists) throw new NotFoundException('Owner not found');

    const locationExists = await this.prisma.location.findUnique({
      where: { id: createVehicleDto.locationId },
    });

    if (!locationExists) throw new NotFoundException('Location not found');

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
    const vehicle = this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return vehicle;
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicleExists = this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicleExists) throw new NotFoundException('Vehicle not found');

    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  remove(id: string) {
    const vehicleExists = this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicleExists) throw new NotFoundException('Vehicle not found');

    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
