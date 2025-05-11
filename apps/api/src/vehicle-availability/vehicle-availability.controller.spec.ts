import { Test, TestingModule } from '@nestjs/testing';
import { VehicleAvailabilityController } from './vehicle-availability.controller';
import { VehicleAvailabilityService } from './vehicle-availability.service';

describe('VehicleAvailabilityController', () => {
  let controller: VehicleAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleAvailabilityController],
      providers: [VehicleAvailabilityService],
    }).compile();

    controller = module.get<VehicleAvailabilityController>(VehicleAvailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
