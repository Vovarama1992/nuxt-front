import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class PartialDocumentDTO {
  @ApiProperty({ type: String })
  _id: string | ObjectId;
}