import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IncidentController],
  providers: [IncidentService, PrismaService],
  exports: [IncidentService],
})
export class IncidentModule {}
