import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/integrations/prisma/prisma.service';
// import { writeFile } from 'node:fs/promises';
// import { v5 as uuidv5 } from 'uuid';

@Injectable()
export class PhotosService {
  private logger: Logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(PhotosService.name);
  }

  async createPhoto(file: Express.Multer.File) {
    console.dir(file, { depth: 6 });
    // try {
    //   await writeFile(__dirname + '/static/' + uuidv5 + '.' + file.mimetype.);
    // }
  }
}
