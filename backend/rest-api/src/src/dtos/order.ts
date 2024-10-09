import { PartialDocument } from './common';
import { PromocodeTypes, OrderStatus } from '../enums/order';

export interface BasePromocode<T = string> {
  discount?: number;
  price?: number;
  partner?: T;
  type: PromocodeTypes;
}

export interface DiscountPromocode<T> extends BasePromocode<T> {
  discount: number;
  type: PromocodeTypes.DISCOUNT
}

export interface PartnerPromocode<T> extends BasePromocode<T> {
  partner: T
  type: PromocodeTypes.PARTNER
}

export interface PricePromocode<T> extends BasePromocode<T> {
  price: number;
  type: PromocodeTypes.PRICE
}

export type Promocode<T> = DiscountPromocode<T>
  | PartnerPromocode<T>
  | PricePromocode<T>;

export interface OrderHistory<T = string, I = string> extends PartialDocument<T> {
  created_at: I;
  status: OrderStatus;
}

export interface PartialOrder<T = string, I = string> extends PartialDocument<T> {
  created_at: I;
  status: OrderStatus;
  total_amount_promocode: number;
}

export interface CustomerData<T = string> {
  profile_id: T;
  first_name: string;
  last_name: string;
  surname?: string;

  city: string;
  address: string;
  postal_code: string;
  phone_number: string;
  pvz: string;
}

export interface ChatMessage<T = string, I = string> {
  sender: T;
  message: string;
  created_at: I;
}

export interface Order<T = string, I = string> extends PartialOrder<I> {
  comment?: string;

  total_amount: number;
  total_amount_promocode: number;

  history: OrderHistory<T, I>[];

  delivery_details: {
    tracking_code?: string;
    delivery_method: string;
  };

  items: {
    product_id: T;
    product_title: string;
    product_brand: string;
    product_type: string;
    product_size_grid: string;
    size_id: T;
    size_title: string;
    size_price: number;
    quantity: number;
  }[];

  payment_details: {
    promo_code: string | null;
    date?: I;
    amount?: number;
  };

  customer: CustomerData<T>;

  chat?: {
    message_quantity: number;
    messages: ChatMessage<T, I>[];
  };
}