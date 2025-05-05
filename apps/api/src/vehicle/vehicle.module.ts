import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService],
  exports: [VehicleService],
})
export class VehicleModule {}
