import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { PrismaService } from 'src/common/integrations/prisma/prisma.service';
import {
  Product_photos,
  Product_sizes,
  Products,
  Similar_products,
} from '@prisma/client';
import { CreateProductSizeDTO } from './dtos/create-product-size.dto';
import { CreateProductPhotoDTO } from './dtos/create-product-photo.dto';
import { CreateProductSimilarDTO } from './dtos/create-product-similar.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ProductStatus } from './products.types';
import { DeleteProductDTO } from './dtos/delete-product.dto';
import { UpdateProductSizeDTO } from './dtos/update-product-size.dto';
import { DeleteProductSizeDTO } from './dtos/delete-product-size.dto';
import { GetProductsQueryParams } from './dtos/get-products-query.dto';

@Injectable()
export class ProductsService {
  private logger: Logger;

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(ProductsService.name);
  }

  async getProducts(params: GetProductsQueryParams) {
    try {
      const products = await this.prismaService.products.findMany({
        where: {
          OR: [
            ...params.filters.brands.map((id) => ({
              brand_id: id,
            })),
            ...params.filters.types.map((id) => ({
              type_id: id,
            })),
          ],
        },
        orderBy: [
          {
            created_at: params.sort.date === 1 ? 'asc' : 'desc',
          },
        ],
        skip: params.limit * params.page,
        take: params.limit,
      });

      return products;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('');
    }
  }

  async getProduct(id: number) {
    return id;
  }

  async createProduct(dto: CreateProductDTO) {
    const [brandId, typeId, statusId] = await Promise.all([
      this.getBrandIdByTitle(dto.brand),
      this.getTypeIdByTitle(dto.type),
      this.getStatusIdByTitle('HIDDEN'),
    ]);

    try {
      await this.prismaService.products.create({
        data: {
          created_at: new Date(),
          brand_id: brandId,
          type_id: typeId,
          product_status_id: statusId,
          title: dto.title,
        } as Products,
        select: {
          id: true,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'the product could not be created',
      );
    }
  }

  async updateProduct(dto: UpdateProductDTO) {
    const data: any = {};

    if (dto.brand) {
      data.brand_id = await this.getBrandIdByTitle(dto.brand);
    }

    if (dto.status) {
      data.product_status_id = await this.getStatusIdByTitle(dto.status);
    }

    if (dto.type) {
      data.type_id = await this.getTypeIdByTitle(dto.type);
    }

    if (dto.title) {
      data.title = dto.title;
    }

    try {
      await this.prismaService.products.update({
        data,
        where: {
          id: dto.product_id,
        },
        select: {
          id: true,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('failed to update the product');
    }
  }

  async deleteProduct(dto: DeleteProductDTO) {
    const statusId = await this.getStatusIdByTitle('DELETED');

    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.products.update({
          data: {
            product_status_id: statusId,
          },
          where: {
            id: dto.product_id,
          },
          select: {
            id: true,
          },
        });

        await tx.product_photos.deleteMany({
          where: {
            product_id: dto.product_id,
          } as Product_photos,
        });

        await tx.similar_products.deleteMany({
          where: {
            OR: [
              {
                product_id: dto.product_id,
              },
              {
                similar_product_id: dto.product_id,
              },
            ],
          },
        });
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'the product could not be deleted',
      );
    }
  }

  async createProductSize(dto: CreateProductSizeDTO) {
    try {
      await this.prismaService.product_sizes.create({
        data: dto as Product_sizes,
        select: { id: true },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('failed to add size');
    }
  }

  async updateProductSize(dto: UpdateProductSizeDTO) {
    const { product_id, ...updateDTO } = dto;

    try {
      await this.prismaService.product_sizes.update({
        select: {
          id: true,
        },
        data: updateDTO,
        where: {
          id: product_id,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new Error('the size of the product could not be changed');
    }
  }

  async deleteProductSize(dto: DeleteProductSizeDTO) {
    try {
      await this.prismaService.product_sizes.delete({
        where: {
          id: dto.product_size_id,
        },
        select: {
          id: true,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'The product size could not be deleted',
      );
    }
  }

  async createProductPhoto(dto: CreateProductPhotoDTO) {
    try {
      await this.prismaService.product_photos.create({
        data: dto as Product_photos,
        select: { id: true },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('failed to add photo');
    }
  }

  async deleteProductPhoto(dto: DeleteProductSizeDTO) {
    try {
      await this.prismaService.product_photos.delete({
        where: {
          id: dto.product_size_id,
        },
        select: {
          id: true,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'The product photo could not be deleted',
      );
    }
  }

  async createProductSimilar(dto: CreateProductSimilarDTO) {
    try {
      await this.prismaService.similar_products.create({
        data: dto as Similar_products,
        select: { id: true },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('failed to add similar product');
    }
  }

  async deleteProductSimilar(dto: DeleteProductDTO) {
    try {
      await this.prismaService.similar_products.deleteMany({
        where: {
          OR: [
            { product_id: dto.product_id },
            { similar_product_id: dto.product_id },
          ],
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'The product size could not be deleted',
      );
    }
  }

  private async getBrandIdByTitle(title: string): Promise<number> {
    try {
      let brand = await this.prismaService.brands.findUnique({
        where: {
          title: title,
        },
        select: {
          id: true,
        },
      });

      if (!brand) {
        brand = await this.prismaService.brands.create({
          data: {
            title,
          },
          select: {
            id: true,
          },
        });
      }

      return brand.id;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'the product could not be created',
      );
    }
  }

  private async getTypeIdByTitle(title: string): Promise<number> {
    try {
      let type = await this.prismaService.types.findUnique({
        where: {
          title: title,
        },
        select: {
          id: true,
        },
      });

      if (!type) {
        type = await this.prismaService.types.create({
          data: {
            title,
          },
          select: {
            id: true,
          },
        });
      }

      return type.id;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'the product could not be created',
      );
    }
  }

  private async getStatusIdByTitle(title: ProductStatus): Promise<number> {
    try {
      let status = await this.prismaService.product_statuses.findUnique({
        where: {
          title: title,
        },
        select: {
          id: true,
        },
      });

      if (!status) {
        status = await this.prismaService.product_statuses.create({
          data: {
            title,
          },
          select: {
            id: true,
          },
        });
      }

      return status.id;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'the product could not be created',
      );
    }
  }
}
