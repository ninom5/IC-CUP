import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async check(): Promise<string> {
    await this.prisma.$queryRaw`SELECT 1`;

    return 'all good';
  }
}
