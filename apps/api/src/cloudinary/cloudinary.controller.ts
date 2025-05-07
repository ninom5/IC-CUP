import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('cloudinary')
@ApiTags('Cloudinary')
@UseInterceptors(FileInterceptor('file'))
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload/image')
  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImageToCloudinary(file);
  }

  @Post('upload/raw')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idPdf', maxCount: 1 },
      { name: 'driverPdf', maxCount: 1 },
    ]),
  )
  async uploadFilesToCloudinary(
    @UploadedFile()
    files: {
      idPdf?: Express.Multer.File[];
      driverPdf?: Express.Multer.File[];
    },
  ) {
    const idPdf = files.idPdf?.[0];
    const driverPdf = files.driverPdf?.[0];

    if (!idPdf || !driverPdf)
      throw new BadRequestException('Driver and id card pdfs are required');

    return Promise.all([
      this.cloudinaryService.uploadFileToCloudinary(idPdf),
      this.cloudinaryService.uploadFileToCloudinary(driverPdf),
    ]);
  }
}
