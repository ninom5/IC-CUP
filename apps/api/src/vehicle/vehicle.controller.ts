import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFiltersDto } from 'src/location/dto/vehicle-filters.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async getAllVehicles() {
    return this.vehicleService.getAll();
  }

  @Get('/pagination')
  async getAllVehiclesPagination(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('category') category?: string,
    @Query('transmission') transmission?: string,
    @Query('seats') seats?: string,
    @Query('fuel') fuel?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const userFilters = { category, transmission, seats, fuel };

    return this.vehicleService.getAllPagination(
      pageNumber,
      pageSize,
      userFilters,
    );
  }

  @Get('by-date')
  findAll(@Query() vehicleFiltersDto: VehicleFiltersDto) {
    return this.vehicleService.findAvailable(vehicleFiltersDto);
  }

  @Get('user/:id')
  findAllUserVehicles(@Param('id') id: string) {
    return this.vehicleService.findAllUserVehicles(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
