import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { SearchQueryDTO } from './dtos/search-query.dto';

@Injectable()
export class SearchService {
  private Products: Collection<Product>;
  private News: Collection;

  constructor(@Inject(DB_CONNECTION) private mongodbService: MongoClient) {
    this.Products = mongodbService.db('3hundred').collection('products');
    this.News = mongodbService.db('3hundred').collection('news');
  }

  async search(dto: SearchQueryDTO) {
    const result = await this.Products.aggregate([
      {
        $match: {
          $text: {
            $search: dto.text,
          },
          'status.is_hidden': false,
        },
      },
      {
        $facet: {
          content: [
            {
              $addFields: {
                score: { $meta: 'textScore' },
              },
            },
            {
              $sort: {
                score: { $meta: 'textScore' },
              },
            },
            { $skip: (dto.page - 1) * (dto.limit || 10) },
            { $limit: dto.limit || 10 },
            {
              $project: {
                preview: 1,
                preview_compress: 1,
                title: 1,
                discount: 1,
                photos: 1,
                photos_compress: 1,
                status: {
                  in_stock: 1,
                  is_sale: 1,
                  is_new: 1,
                },
                price: {
                  $min: '$sizes.price',
                },
              },
            },
          ],
          props: [
            {
              $count: 'total_items',
            },
          ],
        },
      },
    ]).toArray();

    return {
      content: result[0].content,
      props: {
        total_items: result[0].props.length
          ? result[0].props[0].total_items
          : 0,
        total_page: result[0].props.length
          ? Math.ceil(result[0].props[0].total_items / (dto.limit || 10))
          : 0,
      },
    };
  }

  async getNews(dto: SearchQueryDTO) {
    const result = await this.News.aggregate([
      {
        $match: {},
      },
      {
        $facet: {
          content: [
            { $skip: (dto.page - 1) * (dto.limit || 10) },
            { $limit: dto.limit || 10 },
            {
              $project: {
                text: 0,
                photos: 0,
              },
            },
          ],
          props: [
            {
              $count: 'total_items',
            },
          ],
        },
      },
    ]).toArray();

    return {
      content: result[0].content,
      props: {
        total_items: result[0].props.length
          ? result[0].props[0].total_items
          : 0,
        total_page: result[0].props.length
          ? Math.ceil(result[0].props[0].total_items / (dto.limit || 10))
          : 0,
      },
    };
  }

  async getPost(postId: ObjectId) {
    return await this.News.findOne({ _id: postId });
  }
}
