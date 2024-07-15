import { ObjectId } from 'mongodb';

export interface Variable {
  _id: ObjectId;
  group: string;
  title: string;
}

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
  role: string;
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
  cart: {
    product_id: ObjectId;
    size_id: ObjectId;
    quantity: number;
  }[];
  favourites: ObjectId[];
}

export interface Product {
  _id: ObjectId;
  created_at: Date;
  type: string;
  brand: string;
  preview: string;
  preview_compress: string;
  title: string;
  size_grid: string;
  discount: number;
  photos: string[];
  photos_compress: string[];
  similar: ObjectId[];

  status: {
    is_hidden: boolean;
    in_stock: boolean;
    is_sale: boolean;
    is_new: boolean;
  };

  package: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };

  sizes: {
    _id: ObjectId;
    title: string;
    price: number;
    quantity: number;
  }[];
}

// created - когда заказ только создается, еще не оплачен
// rejected - отклонен по какой либо причине
// paid - заказ оплачен и готов к оработе
// completed - заказ завершен

// На возврате / refaund
// Возвращен / returned
// Сейчас в пути /
// Отменен
// Доставлен

// created / ждет оплаты
// rejected / отменен
// paid / оплачен
// delivered / сейчас в пути
// completed / Выполнен
// refaund /  На возврате
// returned / Возвращен

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
  status:
    | 'created'
    | 'rejected'
    | 'paid'
    | 'delivered'
    | 'completed'
    | 'refaund'
    | 'returned';
  comment?: string;

  total_amount: number;
  total_amount_promocode: number;

  history: {
    _id: ObjectId;
    created_at: Date;
    status: string;
  }[];

  delivery_details: {
    trak_number?: string;
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
