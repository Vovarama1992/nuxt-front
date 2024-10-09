import { PartialDocument } from './common';
import { VariableGroupType } from '../enums/product';

export interface PartialProduct<T = string> extends PartialDocument<T> {
  preview: string;
  preview_compress: string;
  title: string;
  discount: number;
  photos: string[];
  photos_compress: string[];

  status: {
    is_hidden: boolean;
    in_stock: boolean;
    is_sale: boolean;
    is_new: boolean;
  };

  sizes: {
    _id: T;
    title: string;
    price: number;
    quantity: number;
  }[];
}

export interface Product<T = string, I = string> extends PartialProduct<T> {
  created_at: I;
  type: string;
  brand: string;
  size_grid: string;
  similar: T[];

  package: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
}

export interface Variable<T = string> extends PartialDocument<T> {
  title: string;
}

export interface VariableGroup<T = string> {
  group: VariableGroupType;
  variables: Variable<T>[];
}

export interface Collection<T = string, I = PartialProduct<T>> {
  level: number;
  title: string;
  to: string;
  products_full: I[];
}

export interface GetProductRequest {
  max_price?: number;
  min_price?: number;
  type?: string[] | string;
  brand?: string[] | string;
  sizes?: string[] | string;
  q?: string;
  is_new?: boolean;
  is_sale?: boolean;
  in_stock?: boolean;
}

export interface GetProductGroupRequest {
  products_id: string[];
}