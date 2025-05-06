import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('rental')
@ApiTags('Rental')
@ApiBearerAuth()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 201, description: 'Rental created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() dto: CreateRentalDto) {
    return this.rentalService.create(dto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiResponse({ status: 200, description: 'All rentals' })
  getAll() {
    return this.rentalService.findAll();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Single rental' })
  @ApiResponse({ status: 404, description: 'Rental not found.' })
  getOne(@Param('id') id: string) {
    return this.rentalService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Rental updated' })
  @ApiResponse({ status: 404, description: 'Rental not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateRentalDto) {
    return this.rentalService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @ApiResponse({ status: 200, description: 'Rental deleted' })
  @ApiResponse({ status: 404, description: 'Rental not found.' })
  delete(@Param('id') id: string) {
    return this.rentalService.delete(id);
  }
}
