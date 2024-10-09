import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { DeleteProductDTO } from './dtos/delete-product.dto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CreateSizeDTO } from './dtos/create-size.dto';

@Injectable()
export class DashboardProductsService {
  private Products: Collection<Product>;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
  ) {
    this.Products = mongodbService.db('3hundred').collection('products');
  }

  async createProduct(dto: CreateProductDTO) {
    // const { insertedId } = await this.Products.insertOne({
    //   _id: new ObjectId(),
    //   created_at: new Date(),
    //   title: dto.title,
    //   brand: dto.brand,
    //   type: dto.type,
    //   is_hidden: true,
    //   in_stock: dto.in_stock,
    //   is_new: dto.in_new,
    //   is_sale: dto.in_sale,
    //   gallery: dto.photos,
    //   preview: dto.preview,
    //   size_grid: dto.size_grid,
    //   package: {
    //     width: dto.width,
    //     height: dto.height,
    //     length: dto.length,
    //     weight: dto.weight,
    //   },
    //   similar_products: [],
    //   sizes: [],
    // } as Product);

    return 'insertedId';
  }

  // TODO: Добавить удаление изображений;
  async deleteProduct(dto: DeleteProductDTO) {
    await this.Products.deleteOne({
      _id: new ObjectId(dto.product_id),
    });
  }

  async createProductSize(dto: CreateSizeDTO) {
    console.log(dto);
    await this.Products.updateOne(
      { _id: new ObjectId(dto.product_id) },
      {
        $push: {
          sizes: {
            _id: new ObjectId(),
            price: +dto.current_price,
            quantity: +dto.quantity,
            title: dto.value,
          },
        },
      },
    );
  }

  async saveImage(file: Express.Multer.File) {
    await writeFile(join('..', 'static', file.originalname), file.buffer);
  }

  async getProducts(page: number, limit: number) {
    const result = await this.Products.find({})
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray();

    console.log(result);

    return result;
  }

  async getProduct(productId: ObjectId) {
    return await this.Products.findOne({ _id: productId });
  }

  async updateProduct(dto: UpdateProductDTO) {
    const { product_id, ...setObj } = dto;

    delete dto.photos;
    delete dto.delete_photos;

    await this.Products.updateOne(
      { _id: new ObjectId(product_id) },
      {
        // $set: setObj,
        // $push: {
        //   gallery: {
        //     $each: photos,
        //   },
        // },
        // $pull: {
        //   gallery: {
        //     $in: delete_photos,
        //   } as FilterOperations<PhotoDTO>,
        // },
      },
    );
  }
}
