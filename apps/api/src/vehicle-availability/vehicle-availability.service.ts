import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVehicleAvailabilityDto } from './dto/create-vehicle-availability.dto';
import { UpdateVehicleAvailabilityDto } from './dto/update-vehicle-availability.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VehicleAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleAvailabilityDto: CreateVehicleAvailabilityDto) {
    const { vehicleId, startDate, endDate } = createVehicleAvailabilityDto;

    const overlappingInterval = await this.prisma.vehicleAvailability.findFirst(
      {
        where: {
          vehicleId,
          OR: [
            {
              startDate: { gte: new Date(startDate) },
              endDate: { lte: new Date(endDate) },
            },
            {
              startDate: { lte: new Date(startDate) },
              endDate: { gte: new Date(startDate) },
            },
            {
              startDate: { lte: new Date(endDate) },
              endDate: { gte: new Date(endDate) },
            },
            {
              startDate: { lte: new Date(startDate) },
              endDate: { gte: new Date(endDate) },
            },
          ],
        },
      },
    );

    if (overlappingInterval) {
      throw new ConflictException(
        'Novi interval se preklapa s postojećim intervalom dostupnosti',
      );
    }

    return this.prisma.vehicleAvailability.create({
      data: {
        vehicleId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
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

  async findVehicleAvailabilities(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return this.prisma.vehicleAvailability.findMany({
      where: {
        vehicleId,
      },
    });
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
