import { join } from 'path';
import { Collection } from 'mongodb';

import { File } from '../integrations/mongodb/mongodb.interfaces';
import { SizeTableEnum } from '../utils/enums';

const STATIC_DIRECTORY = join(process.cwd(), 'uploads');

export type SizeTable = {
  [key in SizeTableEnum]: number;
}

const SIZE_TABLE: SizeTable = {
  thumb: 128,
  small: 256,
  medium: 512,
  large: 1024,
  original: -1,

  t: NaN,
  s: NaN,
  m: NaN,
  l: NaN,
  o: NaN,
};

for (const name in SIZE_TABLE)
  SIZE_TABLE[name[0]] = SIZE_TABLE[name];

export { SIZE_TABLE };

export function deabbreviateFileSize(size: SizeTableEnum | string): SizeTableEnum {
  switch (size) {
    case 'small':
    case 's':
      return 'small' as SizeTableEnum;
    case 'medium':
    case 'm':
      return 'medium' as SizeTableEnum;
    case 'large':
    case 'l':
      return 'large' as SizeTableEnum;
    case 'original':
    case 'o':
      return 'original' as SizeTableEnum;
    case 'thumb':
    case 't':
    default:
      return 'thumb' as SizeTableEnum;
  }
}

export function hashPath(hash: string) {
  return join(STATIC_DIRECTORY, hash.slice(0, 2), hash.slice(2, 4), hash);
}

export function upload(collection: Collection<File>) {}