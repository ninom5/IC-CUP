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
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('incident')
@ApiBearerAuth()
@ApiTags('Incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 201, description: 'Incident created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() dto: CreateIncidentDto) {
    return this.incidentService.create(dto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiResponse({ status: 200, description: 'Return all incidents' })
  getAll() {
    return this.incidentService.findAll();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Return single incident' })
  @ApiResponse({ status: 404, description: 'Incident not found.' })
  getOne(@Param('id') id: string) {
    return this.incidentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Incident updated successfully.' })
  @ApiResponse({ status: 404, description: 'Incident not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateIncidentDto) {
    return this.incidentService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Incident deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Incident not found.' })
  remove(@Param('id') id: string) {
    return this.incidentService.remove(id);
  }
}
