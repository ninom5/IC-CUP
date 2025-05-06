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
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('notification')
@ApiTags('Notification')
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 201, description: 'Notification created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiResponse({ status: 200, description: 'All notifications' })
  getAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Single notification' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  getOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Notification updated' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.notificationService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, description: 'Notification deleted' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }
}
