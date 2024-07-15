import { IsMongoId, IsString } from 'class-validator';

export class ChangeTrackNumberDTO {
  @IsMongoId()
  order_id: string;

  @IsString()
  track_number: string;
}
