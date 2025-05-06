import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('cloudinary')
@ApiTags('Cloudinary')
@UseInterceptors(FileInterceptor('file'))
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImageToCloudinary(file);
  }
}
