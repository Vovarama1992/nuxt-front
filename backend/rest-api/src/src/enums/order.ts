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
  PRICE = 'price'
}