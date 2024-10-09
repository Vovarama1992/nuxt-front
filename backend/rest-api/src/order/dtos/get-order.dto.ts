import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { OrderStatus } from 'src/common/utils/enums';
import { ProductResponseDTO } from 'src/products/dtos/product.dto';

export class CustomerDTO {
  @ApiProperty({ type: String })
  city: string;

  @ApiProperty({ type: String, required: false })
  address: string;

  @ApiProperty({ type: String, required: false })
  pvz: string;

  @ApiProperty({ type: String })
  profile_id: string;

  @ApiProperty({ type: String })
  first_name: string;

  @ApiProperty({ type: String })
  last_name: string;

  @ApiProperty({ type: String, required: false })
  surname?: string;
}

class DeliveryDetailsDTO {
  @ApiProperty({ type: String })
  delivery_method: string;

  @ApiProperty({ type: String })
  tracking_code: string;
}

class PaymentDetailsDTO {
  @ApiProperty({ type: String })
  promo_code: string;
}

class GetOrderProductDTO {
  @ApiProperty({ type: String })
  size_id: string;

  @ApiProperty({ type: String })
  size_title: string;

  @ApiProperty({ type: Number })
  size_price: number;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: ProductResponseDTO })
  product: ProductResponseDTO;
}

export class GetOrderResponseDTO extends PartialDocumentDTO {
  @ApiProperty({ type: Date })
  created_at: string | Date;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({})
  customer: CustomerDTO;

  @ApiProperty({})
  payment_details: PaymentDetailsDTO;

  @ApiProperty({})
  delivery_details: DeliveryDetailsDTO;

  @ApiProperty({ type: Number })
  total_amount: number;

  @ApiProperty({ type: Number })
  total_amount_promocode: number;

  @ApiProperty({ type: [ GetOrderProductDTO ] })
  items: GetOrderProductDTO[];
}