import { PartialDocumentDTO } from 'src/common/utils/default';
import { OrderStatus } from 'src/common/utils/enums';

export class PartialDashboardOrderResponseDTO extends PartialDocumentDTO {
  created_at: string | Date;
  total_amount_promocode: number;
  status: OrderStatus;
}