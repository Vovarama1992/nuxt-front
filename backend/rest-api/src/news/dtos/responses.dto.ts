import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { PaginationResponseDTO } from 'src/common/utils/paginate';

class PartialNewsDTO extends PartialDocumentDTO {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  subtitle: string;

  @ApiProperty({ type: Date })
  created_at: string | Date;

  @ApiProperty({ type: String })
  preview: string;

  @ApiProperty({ type: String })
  button_label: string;

  @ApiProperty({ type: String })
  to: string;
}

export class GetNewsResponseDTO extends PaginationResponseDTO {
  @ApiProperty({ type: [ PartialNewsDTO ] })
  content: PartialNewsDTO[];
}

export class NewsResponseDTO extends PartialNewsDTO {
  @ApiProperty({ type: String })
  text: string;

  @ApiProperty({ type: [ String ] })
  photos: string[];
}