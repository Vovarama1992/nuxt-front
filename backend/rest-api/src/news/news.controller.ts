import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDTO } from './dtos/create-news.dto';
import { PaginationDTO } from 'src/common/utils/paginate';
import { ObjectId } from 'mongodb';
import { UpdateNewsDTO } from './dtos/update-news.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { GetNewsResponseDTO, NewsResponseDTO } from './dtos/responses.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOkResponse({ type: PartialDocumentDTO })
  @Post('/')
  public async post(@Body() dto: CreateNewsDTO) {
    if ((!dto.to && dto.button_label) || (dto.to && !dto.button_label))
      throw new BadRequestException('no button label or to provided');

    const insertedId = await this.newsService.post(dto);
    return { _id: insertedId };
  }

  @ApiOkResponse({ type: GetNewsResponseDTO })
  @Get('/')
  public getAll(@Query() dto: PaginationDTO) {
    return this.newsService.getAll(dto);
  }

  @ApiOkResponse({ type: NewsResponseDTO })
  @Get('/:id')
  public get(@Param('id') id: string) {
    return this.newsService.get(new ObjectId(id));
  }

  @ApiOkResponse({ type: Object })
  @Patch('/:id')
  public async patch(@Param('id') id: string, @Body() dto: UpdateNewsDTO) {
    await this.newsService.patch(new ObjectId(id), dto);
    return {};
  }

  @ApiOkResponse({ type: Object })
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.newsService.delete(new ObjectId(id));
    return {};
  }
}