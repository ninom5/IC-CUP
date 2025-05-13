import { Test, TestingModule } from '@nestjs/testing';
import { VehicleAvailabilityService } from './vehicle-availability.service';

describe('VehicleAvailabilityService', () => {
  let service: VehicleAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleAvailabilityService],
    }).compile();

    service = module.get<VehicleAvailabilityService>(VehicleAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
