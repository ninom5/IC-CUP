import { Module } from '@nestjs/common';
import { VehicleAvailabilityService } from './vehicle-availability.service';
import { VehicleAvailabilityController } from './vehicle-availability.controller';

@Module({
  controllers: [VehicleAvailabilityController],
  providers: [VehicleAvailabilityService],
})
export class VehicleAvailabilityModule {}
