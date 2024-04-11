import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('dashboard/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 25 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/image\/*/)) {
          cb(null, true);
        } else {
          cb(new Error('invalid file type'), false);
        }
      },
    }),
  )
  createPhoto(@UploadedFile() file: Express.Multer.File) {
    this.photosService.createPhoto(file);
  }
}
