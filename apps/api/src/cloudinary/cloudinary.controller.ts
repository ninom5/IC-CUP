import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('cloudinary')
@ApiTags('Cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImageToCloudinary(file);
  }

  @Post('upload/raw')
  @UseInterceptors(FilesInterceptor('pdfs', 2))
  async uploadFilesToCloudinary(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length !== 2) {
      throw new BadRequestException(
        'Both idPdf and driverPdf files are required',
      );
    }

    const [idPdf, driverPdf] = files;

    const [idPdfUpload, driverPdfUpload] = await Promise.all([
      this.cloudinaryService.uploadFileToCloudinary(idPdf),
      this.cloudinaryService.uploadFileToCloudinary(driverPdf),
    ]);

    return { idPdf: idPdfUpload, driverPdf: driverPdfUpload };
  }
}
