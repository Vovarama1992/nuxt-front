export interface IPorductCard {
  _id: string;
  title: string;
  in_stock: boolean;
  is_sale: boolean;
  is_new: boolean;
  discount: number;
  price: number;
  preview: string;
  photos: string[];
  is_liked: boolean;
}

export interface IPorductCardStroke {
  _id: string;
  title: string;
  sizeValue: string;
  sizeGrid: string;
  discount: number;
  price: number;
  preview: string;
  isLiked: boolean;
}