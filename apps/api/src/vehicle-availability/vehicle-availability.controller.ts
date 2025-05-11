import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VehicleAvailabilityService } from './vehicle-availability.service';
import { CreateVehicleAvailabilityDto } from './dto/create-vehicle-availability.dto';
import { UpdateVehicleAvailabilityDto } from './dto/update-vehicle-availability.dto';

@Controller('vehicle-availability')
export class VehicleAvailabilityController {
  constructor(
    private readonly vehicleAvailabilityService: VehicleAvailabilityService,
  ) {}

  @Post()
  create(@Body() createVehicleAvailabilityDto: CreateVehicleAvailabilityDto) {
    return this.vehicleAvailabilityService.create(createVehicleAvailabilityDto);
  }

  @Get()
  findAll() {
    return this.vehicleAvailabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleAvailabilityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleAvailabilityDto: UpdateVehicleAvailabilityDto,
  ) {
    return this.vehicleAvailabilityService.update(
      id,
      updateVehicleAvailabilityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleAvailabilityService.remove(id);
  }
}
