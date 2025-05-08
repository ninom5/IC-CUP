import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!location) throw new NotFoundException('Location not found');

    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const locationExists = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!locationExists) throw new NotFoundException('Location not found');

    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: string) {
    const locationExists = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!locationExists) throw new NotFoundException('Location not found');

    return this.prisma.location.delete({
      where: { id },
    });
  }
}
