import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IncidentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateIncidentDto) {
    return this.prisma.incident.create({ data: dto });
  }

  async findAll() {
    return this.prisma.incident.findMany({
      include: {
        rental: true,
        reporter: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async findOne(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: { id },
      include: {
        rental: true,
        reporter: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async update(id: string, dto: UpdateIncidentDto) {
    const existing = await this.prisma.incident.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Incident not found');

    return this.prisma.incident.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.incident.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Incident not found');

    return this.prisma.incident.delete({ where: { id } });
  }
}
