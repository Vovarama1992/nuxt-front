import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchQueryDTO } from './dtos/search-query.dto';
import { SearchService } from './search.service';
import { NewsQueryDTO } from './dtos/news-query.dto';
import { ObjectId } from 'mongodb';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('')
  async search(@Query() dto: SearchQueryDTO) {
    return await this.searchService.search(dto);
  }

  @Get('news')
  async getNews(@Query() dto: NewsQueryDTO) {
    return await this.searchService.getNews(dto);
  }

  @Get('news/:id')
  async getPost(@Param('id') postId: string) {
    return await this.searchService.getPost(new ObjectId(postId));
  }
}
