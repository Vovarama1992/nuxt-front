import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class ChangeStatusDTO {
  @IsMongoId()
  order_id: string;

  @IsString()
  @IsEnum([
    'created',
    'paid',
    'on_its_way',
    'completed',
    'completed_refaund',
    'rejected',
    'refaund',
  ])
  status:
    | 'created'
    | 'paid'
    | 'on_its_way'
    | 'completed'
    | 'completed_refaund'
    | 'rejected'
    | 'refaund';
}
