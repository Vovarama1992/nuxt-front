import { PartialDocument } from './common';
import { SizeTableEnum } from '../enums/files';

export interface File<T = string> extends PartialDocument<T> {
  hash: string;
  mimetype: string;
  available_sizes: SizeTableEnum[];
}