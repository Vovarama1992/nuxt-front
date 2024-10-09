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
} from './dtos/product-by-ids.dto';
import { getPaginationAggregationSteps } from 'src/common/utils/paginate';

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

  private getMongoFilters(dto: GetProductDTO, excludePrice = false) {
    const filters: Record<string, unknown> = {};

    if (dto.q?.length)
      filters.$text = {
        $search: dto.q
      };

    if (dto.brand?.length)
      filters.brand = {
        $in: Array.isArray(dto.brand) ? dto.brand : [ dto.brand ],
      };

    if (dto.type?.length)
      filters.type = {
        $in: Array.isArray(dto.type) ? dto.type : [ dto.type ],
      };

    if (!excludePrice && (dto.min_price !== undefined || dto.max_price !== undefined))
      filters['sizes.price'] = {
        $gte: dto.min_price,
        $lte: dto.max_price
      };

    if (dto.sizes)
      filters['sizes.title'] = {
        $in: Array.isArray(dto.sizes) ? dto.sizes : [ dto.sizes ]
      };

    return {
      $match: { 'status.is_hidden': false, ...filters },
    };
  }

  async getFilters(dto: GetProductDTO) {
    const aggregation = await this.Products.aggregate([
      this.getMongoFilters(dto, true),
      {
        $facet: {
          brands: [
            {
              $group: {
                _id: '$brand',
                count: {
                  $sum: 1
                }
              }
            },
            { $sort: { count: -1 } }
          ],

          types: [
            {
              $group: {
                _id: '$type',
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],

          sizes: [
            { $unwind: '$sizes' },
            {
              $group: {
                _id: '$sizes.title',
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],

          price: [
            this.getMongoFilters(dto, true),
            { $unwind: '$sizes' },
            {
              $group: {
                _id: null,
                min: {
                  $min: '$sizes.price'
                },
                max: {
                  $max: '$sizes.price'
                }
              }
            },
            {
              $project: {
                _id: 0,
                min: 1,
                max: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          brands: '$brands',
          types: '$types',
          sizes: '$sizes',
          price: {
            $arrayElemAt: [ '$price', 0 ]
          }
        }
      }
    ]).toArray();

    return aggregation[0];
  }

  async getProducts(dto: GetProductDTO) {
    const aggregation = await this.Products.aggregate([
      this.getMongoFilters(dto),
      ...getPaginationAggregationSteps(dto, {
        omitProps: [
          'type',
          'brand',
          'size_grid',
          'similar',
          'package',
          'sizes'
        ],
        addFields: {
          min_price: {
            $min: '$sizes.price'
          }
        }
      })
    ]).toArray();

    return aggregation[0];
  }

  async getProduct(_id: ObjectId) {
    return await this.Products.findOne({ _id });
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
                min_price: {
                  $min: '$$product.sizes.price'
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
            min_price: 1,
          },
        },
      },
    ]).toArray();
  }

  async getProductsGroup(dto: GetProductsGroupDTO) {
    const ids = Array.isArray(dto.product_id) ? dto.product_id : [ dto.product_id ];

    return await this.Products.aggregate([
      {
        $match: {
          _id: { $in: ids.map((el) => new ObjectId(el)) },
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
