import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async findVehicleReviews(vehicleId: string) {
    const vehicleExists = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicleExists) {
      throw new NotFoundException('Vehicle not found');
    }

    const reviews = await this.prisma.review.findMany({
      where: {
        rental: {
          vehicleId: vehicleId,
        },
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        rental: {
          select: {
            renter: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                img: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: {
        id: review.rental.renter.id,
        firstName: review.rental.renter.firstName,
        lastName: review.rental.renter.lastName,
        img: review.rental.renter.img,
      },
    }));
  }

  async findOne(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
