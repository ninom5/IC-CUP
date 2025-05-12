import { Injectable } from '@nestjs/common';
import { CreateVehicleAvailabilityDto } from './dto/create-vehicle-availability.dto';
import { UpdateVehicleAvailabilityDto } from './dto/update-vehicle-availability.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VehicleAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleAvailabilityDto: CreateVehicleAvailabilityDto) {
    return this.prisma.vehicleAvailability.create({
      data: createVehicleAvailabilityDto,
    });
  }

  async createMultiple(
    createVehicleAvailabilityDto: CreateVehicleAvailabilityDto[],
  ) {
    return this.prisma.vehicleAvailability.createMany({
      data: createVehicleAvailabilityDto,
      skipDuplicates: true,
    });
  }

  async findAll() {
    return this.prisma.vehicleAvailability.findMany();
  }

  async findOne(id: string) {
    return this.prisma.vehicleAvailability.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateVehicleAvailabilityDto: UpdateVehicleAvailabilityDto,
  ) {
    return this.prisma.vehicleAvailability.update({
      where: { id },
      data: updateVehicleAvailabilityDto,
    });
  }

  async remove(id: string) {
    return this.prisma.vehicleAvailability.delete({
      where: { id },
    });
  }
}
