import { Injectable } from '@nestjs/common';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';

@Injectable()
export class VehicleTypeService {
  create(createVehicleTypeDto: CreateVehicleTypeDto) {
    return 'This action adds a new vehicleType';
  }

  findAll() {
    return `This action returns all vehicleType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicleType`;
  }

  update(id: number, updateVehicleTypeDto: CreateVehicleTypeDto) {
    return `This action updates a #${id} vehicleType`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicleType`;
  }
}
