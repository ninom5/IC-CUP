import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RentalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRentalDto) {
    const result = await this.prisma.$transaction(async (tx) => {
      const rental = await tx.rental.create({ data: dto });

      const paymentResponse = await tx.payment.create({
        data: {
          rentalId: rental.id,
          amount: rental.totalPrice,
        },
      });

      return { rental, paymentResponse };
    });

    return result;
  }

  async findAll() {
    return this.prisma.rental.findMany();
  }

  async findOne(id: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) throw new NotFoundException('Rental not found');
    return rental;
  }

  async update(id: string, dto: UpdateRentalDto) {
    const existing = await this.prisma.rental.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Rental not found');

    return this.prisma.rental.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const existing = await this.prisma.rental.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Rental not found');

    return this.prisma.rental.delete({ where: { id } });
  }
}
