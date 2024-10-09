export enum SizeTableEnum {
  THUMB = 't',
  SMALL = 's',
  MEDIUM = 'm',
  LARGE = 'l',
  ORIGINAL = 'o',

  THUMB_EXT = 'thumb',
  SMALL_EXT = 'small',
  MEDIUM_EXT = 'medium',
  LARGE_EXT = 'large',
  ORIGINAL_EXT = 'original'
}

export enum OrderStatus {
  CREATED = 'created',
  PAID = 'paid',
  DELIVERY = 'delivery',
  COMPLETE = 'complete',
  REFUND = 'refund',
  REFUND_COMPLETE = 'refund_complete',
  REJECTED = 'rejected'
}

export enum PromocodeTypes {
  DISCOUNT = 'discount',
  PARTNER = 'partner',
  PRICE = 'price',
  UNKNOWN = 'unknown'
}

export enum VariableGroupType {
  BRAND = 'brand',
  TYPE = 'type'
}

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user'
}

export enum DeliveryMethod {
  EXPRESS_MSK = 'express_msk',
  CDEK = 'cdek',
  POSTAL = 'postal'
}