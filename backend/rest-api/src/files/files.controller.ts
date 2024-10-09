import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';

import { FilesService } from './files.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SizeTableEnum } from 'src/common/utils/enums';
import { ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';
import { FileResponseDTO } from './dtos/file.dto';
import { PartialDocumentDTO } from 'src/common/utils/default';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOkResponse({ type: PartialDocumentDTO })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async post(@UploadedFile() file: Express.Multer.File) {
    try {
      const id = await this.filesService.post(file);

      return { _id: id };
    } catch (err) {
      if (typeof err === 'string')
        throw new BadRequestException(err);

      throw err;
    }
  }

  @ApiOkResponse({ type: FileResponseDTO })
  @Get('/:id')
  public get(@Param('id') id: string) {
    return this.filesService.get(new ObjectId(id));
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary'
    }
  })
  @ApiProduces('image/webp', 'application/octet-stream')
  @Get('/:id/:size')
  public async view(@Param('id') id: string, @Param('size') size: SizeTableEnum | string) {
    const { mimetype, buffer } = await this.filesService.getFile(
      new ObjectId(id),
      size
    );

    return new StreamableFile(buffer, {
      type: mimetype
    });
  }

  @ApiOkResponse({ type: Object })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async patch(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    await this.filesService.patch(new ObjectId(id), file);
    return {};
  }

  @ApiOkResponse({ type: Object })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.filesService.delete(new ObjectId(id));
    return {};
  }
}