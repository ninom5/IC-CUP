import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma.service';
import { instanceToPlain } from 'class-transformer';
import { VehicleFiltersDto } from 'src/location/dto/vehicle-filters.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleExpiredRegistrations() {
    const today = new Date();

    const vehiclesToUpdate = await this.prisma.vehicle.findMany({
      where: {
        registrationExpiration: { lte: today },
        isAvailable: true,
      },
    });

    for (const vehicle of vehiclesToUpdate) {
      await this.prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { isAvailable: false },
      });
    }
  }
  async create(createVehicleDto: CreateVehicleDto) {
    const ownerExists = await this.prisma.user.findUnique({
      where: { id: createVehicleDto.ownerId },
    });

    if (!ownerExists) throw new NotFoundException('Owner not found');

    const data = {
      ...createVehicleDto,
      details: instanceToPlain(createVehicleDto.details),
    };

    return this.prisma.vehicle.create({
      data,
    });
  }

  async findAllUserVehicles(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) throw new NotFoundException('User not found');

    return this.prisma.vehicle.findMany({
      where: { ownerId: userId },
    });
  }

  async findAvailable(vehicleFiltersDto: VehicleFiltersDto) {
    const filtersStartDate = new Date(vehicleFiltersDto.startDate);
    const filtersEndDate = new Date(vehicleFiltersDto.endDate);
    filtersEndDate.setHours(23, 59, 59, 999);

    return this.prisma.vehicle.findMany({
      where: {
        isAvailable: true,
        isVerified: true,
        rentals: {
          none: {
            AND: [
              {
                startDate: { lte: filtersEndDate },
                endDate: { gte: filtersStartDate },
                status: {
                  in: ['APPROVED', 'PENDING', 'COMPLETED'],
                },
              },
            ],
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicleExists = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicleExists) throw new NotFoundException('Vehicle not found');

    const cleanData = Object.fromEntries(
      Object.entries(updateVehicleDto).filter(([_, v]) => v !== undefined),
    );

    return this.prisma.vehicle.update({
      where: { id },
      data: cleanData,
    });
  }

  async remove(id: string) {
    const vehicleExists = this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicleExists) throw new NotFoundException('Vehicle not found');

    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
