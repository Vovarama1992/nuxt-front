import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import {
  Product,
  Collection as Coll,
  Variable,
} from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { GetProductDTO } from './dtos/get-product.dto';
import {
  GetProductsGroupDTO,
  ProductByIdsDTO,
} from './dtos/product-by-ids.dto';

@Injectable()
export class ProductsService {
  private Products: Collection<Product>;
  private Collections: Collection<Coll>;
  private Variables: Collection<Variable>;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
  ) {
    this.Products = mongodbService.db('3hundred').collection('products');
    this.Collections = mongodbService.db('3hundred').collection('collections');
    this.Variables = mongodbService.db('3hundred').collection('variables');
  }

  async getProducts(page: number, dto: GetProductDTO) {
    const limit = 40;
    const filters: Record<string, unknown> = {};
    // const sum_limit: Record<string, unknown> = { $gte: 0 };

    if (dto.brand?.length) {
      filters['brand'] = {
        $in: dto.brand,
      };
    }

    if (dto.type?.length) {
      filters['type'] = {
        $in: dto.type,
      };
    }

    const a = await this.Products.aggregate([
      {
        $match: { 'status.is_hidden': false, ...filters },
      },
      {
        $facet: {
          data: [
            { $skip: limit * (page - 1) },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                preview: 1,
                photos: 1,
                preview_compress: 1,
                photos_compress: 1,
                title: 1,
                discount: 1,
                status: 1,
                price: {
                  $min: '$sizes.price',
                },
              },
            },
          ],
          total_count: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]).toArray();

    return a;
  }

  async getProduct(_id: ObjectId) {
    return await this.Products.findOne({ _id });
  }

  async getProductsByIds(dto: ProductByIdsDTO) {
    const filterCriteria = dto.products.reduce((acc, product) => {
      if (!acc[product._id]) {
        acc[product._id] = [];
      }
      acc[product._id].push(new ObjectId(product.size_id));
      return acc;
    }, {});

    const query = [
      {
        $match: {
          _id: {
            $in: Object.keys(filterCriteria).map((id) => new ObjectId(id)),
          },
        },
      },
      {
        $project: {
          _id: 1,
          preview: 1,
          title: 1,
          discount: 1,
          size_grid: 1,
          preview_compress: 1,
          type: 1,
          brand: 1,
          created_at: 1,
          photos: 1,
          photos_compress: 1,
          status: 1,
          price: {
            $min: '$sizes.price',
          },
          sizes: {
            $filter: {
              input: '$sizes',
              as: 'size',
              cond: {
                $in: [
                  '$$size._id',
                  { $literal: [].concat(...Object.values(filterCriteria)) },
                ],
              },
            },
          },
        },
      },
    ];

    const products = await this.Products.aggregate(query).toArray();

    return products;
  }

  async getCollections() {
    return await this.Collections.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'products_full',
        },
      },
      {
        $project: {
          level: 1,
          title: 1,
          to: 1,
          products_full: {
            $slice: ['$products_full', 10],
          },
        },
      },
      {
        $addFields: {
          products_full: {
            $map: {
              input: '$products_full',
              as: 'product',
              in: {
                _id: '$$product._id',
                preview: '$$product.preview',
                preview_compress: '$$product.preview_compress',
                title: '$$product.title',
                discount: '$$product.discount',
                photos_compress: '$$product.photos_compress',
                status: '$$product.status',
                price: {
                  $reduce: {
                    input: '$$product.sizes.price',
                    initialValue: null,
                    in: {
                      $cond: [
                        {
                          $or: [
                            { $eq: ['$$value', null] },
                            { $lt: ['$$this', '$$value'] },
                          ],
                        },
                        '$$this',
                        '$$value',
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          level: 1,
          title: 1,
          to: 1,
          products_full: {
            _id: 1,
            preview: 1,
            preview_compress: 1,
            title: 1,
            discount: 1,
            photos_compress: 1,
            status: {
              in_stock: 1,
              is_sale: 1,
              is_new: 1,
            },
            price: 1,
          },
        },
      },
    ]).toArray();
  }

  async getProductsGroup(dto: GetProductsGroupDTO) {
    return await this.Products.aggregate([
      {
        $match: {
          _id: { $in: dto.products_id.map((el) => new ObjectId(el)) },
          'status.is_hidden': false,
        },
      },
      {
        $project: {
          _id: 1,
          preview: 1,
          photos: 1,
          preview_compress: 1,
          photos_compress: 1,
          title: 1,
          discount: 1,
          status: 1,
          price: {
            $min: '$sizes.price',
          },
        },
      },
    ]).toArray();
  }

  async getVars() {
    return await this.Variables.aggregate([
      {
        $group: {
          _id: '$group',
          variables: {
            $push: {
              _id: '$_id',
              title: '$title',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          group: '$_id',
          variables: 1,
        },
      },
    ]).toArray();
  }
}
