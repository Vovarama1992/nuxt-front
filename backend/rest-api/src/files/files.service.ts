import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { xxh3 } from '@node-rs/xxhash';
import { join } from 'path';
import sharp from 'sharp';

import { File } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { deabbreviateFileSize, hashPath, SIZE_TABLE } from 'src/common/services/files';
import { SizeTableEnum } from 'src/common/utils/enums';

@Injectable()
export class FilesService {
  private Files: Collection<File>;
  private readonly QUALITY_PERCENT = 90;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
  ) {
    this.Files = mongodbService.db('3hundred').collection('files');
  }

  private async upload(file: Express.Multer.File) {
    const { fileTypeFromBuffer } = await import('file-type/core'); // ESM module :(
    const { mime } = await fileTypeFromBuffer(file.buffer);
    if (!mime.startsWith('image/'))
      throw 'Файл не является изображением.';

    const hash = xxh3.xxh128(file.buffer).toString(16);
    const path = hashPath(hash);

    if (!existsSync(path)) {
      await mkdir(path, { recursive: true });
      await writeFile(join(path, 'original'), file.buffer);
    }

    return { hash, mimetype: mime };
  }

  public async post(file: Express.Multer.File) {
    const { hash, mimetype } = await this.upload(file);
    const { insertedId } = await this.Files.insertOne({
      _id: new ObjectId(),
      hash,
      mimetype,
      available_sizes: []
    });

    return insertedId;
  }

  public async get(id: ObjectId) {
    return await this.Files.findOne({ _id: id });
  }

  // XXX: maybe? maybe not?
  private formETag(hash: string, sizeParam: SizeTableEnum) {
    return [hash, sizeParam].join('')
  }

  public async getFile(id: ObjectId, sizeParam: SizeTableEnum | string) {
    const file = await this.Files.findOne({ _id: id });
    const size = deabbreviateFileSize(sizeParam);

    const path = hashPath(file.hash);
    const sizePath = join(path, size);

    if (file.available_sizes.includes(size) || size === 'original') {
      return {
        mimetype: size === 'original' ? file.mimetype : 'image/webp',
        buffer: await readFile(sizePath)
      };
    }

    if (existsSync(sizePath)) {
      await this.Files.updateOne({ _id: id }, {
        $push: { available_sizes: size }
      });

      return {
        mimetype: 'image/webp',
        buffer: await readFile(sizePath)
      };
    }

    const instance = sharp(join(path, 'original'))
      .toFormat('webp', { quality: this.QUALITY_PERCENT })
      .resize(SIZE_TABLE[size]);

    const [ buffer ] = await Promise.all([
      instance.toBuffer(),
      instance.toFile(sizePath)
    ]);

    await this.Files.updateOne({ _id: id }, {
      $push: { available_sizes: size }
    });

    return {
      mimetype: 'image/webp',
      buffer
    };
  }

  public async patch(id: ObjectId, file: Express.Multer.File) {
    const { hash, mimetype } = await this.upload(file);
    return await this.Files.updateOne(
      { _id: id },
      {
        $set: {
          hash,
          mimetype,
          available_sizes: []
        }
      }
    );
  }

  public async delete(id: ObjectId) {
    return await this.Files.deleteOne({ _id: id });
  }
}