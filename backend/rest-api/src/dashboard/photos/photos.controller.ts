import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDTO } from './dtos/create-photo.dto';

@Controller('dashboard/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  // @Post('')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // createPhoto(@Body() dto: CreatePhotoDTO) {
  //   this.photosService.createPhoto(dto);
  // }
}
