import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { UpdateNewsDTO } from './dtos/update-news.dto';
import { CreateNewsDTO } from './dtos/create-news.dto';
import { getPaginationAggregationSteps, PaginationDTO } from 'src/common/utils/paginate';

@Injectable()
export class NewsService {
  private News: Collection;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
  ) {
    this.News = mongodbService.db('3hundred').collection('news');
  }

  public async post(dto: CreateNewsDTO) {
    const { insertedId } = await this.News.insertOne({
      _id: new ObjectId,
      title: dto.title,
      subtitle: dto.subtitle,
      text: dto.text,
      created_at: new Date,
      preview: dto.preview,
      photos: dto.photos,
      button_label: dto.button_label,
      to: dto.to
    });

    return insertedId;
  }

  public async getAll(dto: PaginationDTO) {
    const aggregation = await this.News.aggregate(
      getPaginationAggregationSteps(dto, {
        omitProps: [ 'text', 'photos' ],
        sort: { created_at: -1 }
      })
    ).toArray();

    return aggregation[0];
  }

  public async get(id: ObjectId) {
    return await this.News.findOne({ _id: id });
  }

  public async patch(id: ObjectId, dto: UpdateNewsDTO) {
    await this.News.updateOne(
      { _id: id },
      {
        title: dto.title,
        subtitle: dto.subtitle,
        text: dto.text,
        created_at: new Date,
        preview: dto.preview,
        photos: dto.photos,
        button_label: dto.button_label,
        to: dto.to
      }
    );
  }

  public async delete(id: ObjectId) {
    await this.News.deleteOne({ _id: id });
  }
}