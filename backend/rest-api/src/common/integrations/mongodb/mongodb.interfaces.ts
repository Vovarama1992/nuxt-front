import { ObjectId } from 'mongodb';
import { OrderStatus, SizeTableEnum, UserRoles } from 'src/common/utils/enums';

interface CartItem {
  product_id: ObjectId;
  size_id: ObjectId;
  quantity: number;
}

type Cart = CartItem[];

export interface Promocode {
  _id: ObjectId;
  code: string;
  quantity: number;
  price?: number;
  discount?: number;
}

export interface Profile {
  _id: ObjectId;
  telegram_id: bigint;
  role: UserRoles;
  create_at: Date;
  phone_number: string;
  orders: ObjectId[];
  addresses: { city: string; address: string }[];
  promocode?: string;
  profile_picture?: string;
  last_fetched_profile_picture?: number;
  scores: {
    quantity: number;
    history: {
      created_at: Date;
      message: string;
      quantity: number;
    }[];
  };
  cart: Cart;
  favourites: ObjectId[];
}

export interface Variable {
  _id: ObjectId;
  title: string;
}

export interface File {
  _id: ObjectId;
  hash: string;
  mimetype: string;
  available_sizes: SizeTableEnum[];
}

export interface Product {
  _id: ObjectId;
  preview: string;
  preview_compress: string;
  title: string;
  discount: number;
  photos: string[];
  photos_compress: string[];
  created_at: Date;
  type: string;
  brand: string;
  size_grid: string;
  similar: ObjectId[];

  status: {
    is_hidden: boolean;
    in_stock: boolean;
    is_sale: boolean;
    is_new: boolean;
  };

  sizes: {
    _id: ObjectId;
    title: string;
    price: number;
    quantity: number;
  }[];

  package: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
}

export interface Collection {
  _id: ObjectId;
  title: string;
  to: string;
  level: 0;
  products: ObjectId[];
}

export interface Order {
  _id: ObjectId;
  created_at: Date;
  status: OrderStatus;
  comment?: string;

  total_amount: number;
  total_amount_promocode: number;

  history: {
    _id: ObjectId;
    created_at: Date;
    status: OrderStatus;
  }[];

  delivery_details: {
    tracking_code?: string;
    delivery_method: string;
  };

  payment_details: {
    promo_code: string | null;
    date?: Date;
    amount?: number;
  };

  customer: {
    profile_id: ObjectId;
    last_name: string;
    first_name: string;
    surname?: string;
    city: string;
    address: string;
    postal_code: string;
    phone_number: string;
    pvz: string;
  };

  items: {
    product_id: ObjectId;
    product_title: string;
    product_brand: string;
    product_type: string;
    product_size_grid: string;
    size_id: ObjectId;
    size_title: string;
    size_price: number;
    quantity: number;
  }[];

  chat: {
    message_quantity: number;
    messages: {
      sender: ObjectId;
      message: string;
      created_at: Date;
    }[];
  };
}

export interface News {
  _id: ObjectId;
  created_at: Date;
  title: string;
  subtitle: string;
  text: string;
  preview: string;
  photos: string[];
  to?: string;
  button_label?: string;
}