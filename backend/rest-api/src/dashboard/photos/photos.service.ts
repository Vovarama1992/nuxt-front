import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/integrations/prisma/prisma.service';
// import { CreatePhotoDTO } from './dtos/create-photo.dto';

@Injectable()
export class PhotosService {
  private logger: Logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(PhotosService.name);
  }

  // async createPhoto(dto: CreatePhotoDTO) {
  //   try {
  //     await this.prismaService.photos.
  //   }
  // }
}
