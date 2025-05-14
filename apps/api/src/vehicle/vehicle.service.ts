import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma.service';
import { instanceToPlain } from 'class-transformer';
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
        isVerified: true,
      },
    });

    for (const vehicle of vehiclesToUpdate) {
      await this.prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { isVerified: false },
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

  async getAll() {
    return await this.prisma.vehicle.findMany({
      where: {
        isVerified: true,
      },
      include: {
        rentals: {
          where: {
            review: {
              isNot: null,
            },
          },
          include: {
            review: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllPagination(
    page: number = 1,
    limit: number = 10,
    userFilters: {
      category?: string;
      transmission?: string;
      numOfSeats?: string;
      fuel?: string;
      startDate?: string;
      endDate?: string;
    },
  ) {
    interface FilterValue {
      equals: string;
    }
    const skip = (page - 1) * limit;

    const filters: any = {
      details: {},
    };
    const availabilityFilters: any = {};

    if (userFilters.startDate && userFilters.endDate) {
      const filtersStartDate = new Date(userFilters.startDate);
      const filtersEndDate = new Date(userFilters.endDate);

      availabilityFilters.some = {
        AND: [
          { startDate: { lte: filtersEndDate } },
          { endDate: { gte: filtersStartDate } },
        ],
      };
    }

    for (const [key, value] of Object.entries(userFilters)) {
      if (!value) {
        continue;
      }

      switch (key) {
        case 'fuel':
          filters.details.fuelType = { equals: value?.toUpperCase() };
          break;

        case 'category':
          filters.details.category = { equals: value.toUpperCase() };
          break;

        case 'transmission':
          filters.details.transmission = { equals: value.toUpperCase() };
          break;

        case 'numOfSeats':
          filters.details.numOfSeats = { equals: value.toUpperCase() };
          break;

        default:
          continue;
      }
    }

    const whereConditions: Array<any> = [];

    for (const [key, value] of Object.entries(filters.details)) {
      if (key) {
        const filterValue = value as FilterValue;
        whereConditions.push({
          details: {
            path: [key],
            equals: filterValue.equals,
          },
        });
      }
    }

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        skip,
        take: limit,
        where: {
          AND: [
            ...whereConditions,
            userFilters.startDate && userFilters.endDate
              ? { availabilities: availabilityFilters }
              : { availabilities: { some: {} } },
          ],
        },
        include: {
          availabilities:
            userFilters.startDate && userFilters.endDate
              ? {
                  where: {
                    AND: [
                      { startDate: { lte: new Date(userFilters.endDate) } },
                      { endDate: { gte: new Date(userFilters.startDate) } },
                    ],
                  },
                }
              : true,
          rentals: {
            where: {
              review: {
                isNot: null,
              },
            },
            include: {
              review: {
                select: {
                  rating: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.vehicle.count({
        where: {
          AND: [
            ...whereConditions,
            userFilters.startDate && userFilters.endDate
              ? {
                  availabilities: {
                    some: {
                      startDate: { lte: new Date(userFilters.endDate) },
                      endDate: { gte: new Date(userFilters.startDate) },
                    },
                  },
                }
              : {
                  availabilities: {
                    some: {},
                  },
                },
          ],
        },
      }),
    ]);

    return {
      data: vehicles,
      currentPage: page,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllUserVehicles(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) throw new NotFoundException('User not found');

    const vehicles = await this.prisma.vehicle.findMany({
      where: { ownerId: userId },
      include: {
        rentals: {
          include: {
            review: true,
          },
        },
      },
    });

    return vehicles.map((vehicle) => {
      const reviews = vehicle.rentals
        .map((rental) => rental.review?.rating)
        .filter((r): r is number => r !== undefined);

      const avgRating =
        reviews.length > 0
          ? reviews.reduce((a, b) => a + b, 0) / reviews.length
          : null;

      const reviewCount = reviews.length;

      return {
        ...vehicle,
        avgRating,
        reviewCount,
      };
    });
  }

  // async findAvailable(vehicleFiltersDto: VehicleFiltersDto) {
  //   const filtersStartDate = new Date(vehicleFiltersDto.startDate);
  //   const filtersEndDate = new Date(vehicleFiltersDto.endDate);
  //   filtersEndDate.setHours(23, 59, 59, 999);

  //   return this.prisma.vehicle.findMany({
  //     where: {
  //       isVerified: true,
  //       rentals: {
  //         none: {
  //           AND: [
  //             {
  //               startDate: { lte: filtersEndDate },
  //               endDate: { gte: filtersStartDate },
  //               status: {
  //                 in: ['APPROVED', 'PENDING', 'COMPLETED'],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       availabilities: {
  //         some: {
  //           startDate: { lte: filtersStartDate },
  //           endDate: { gte: filtersEndDate },
  //         },
  //       },
  //     },
  //   });
  // }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        owner: true,
        rentals: {
          include: {
            review: true,
          },
        },
        availabilities: true,
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
