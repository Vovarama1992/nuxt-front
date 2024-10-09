import { IsEnum, IsMongoId, IsString } from 'class-validator';
import { OrderStatus } from 'src/common/utils/enums';

export class ChangeStatusDTO {
  @IsMongoId()
  order_id: string;

  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
