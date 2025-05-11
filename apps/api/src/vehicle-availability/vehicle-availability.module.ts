import { Module } from '@nestjs/common';
import { VehicleAvailabilityService } from './vehicle-availability.service';
import { VehicleAvailabilityController } from './vehicle-availability.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VehicleAvailabilityController],
  providers: [VehicleAvailabilityService, PrismaService],
  exports: [VehicleAvailabilityService],
})
export class VehicleAvailabilityModule {}
