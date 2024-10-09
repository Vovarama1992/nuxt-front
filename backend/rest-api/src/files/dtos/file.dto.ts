import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { SizeTableEnum } from 'src/common/utils/enums';

export class FileResponseDTO extends PartialDocumentDTO {
  @ApiProperty({ type: String })
  hash: string;

  @ApiProperty({ type: String })
  mimetype: string;

  @ApiProperty({ enum: SizeTableEnum, isArray: true })
  available_sizes: SizeTableEnum[];
}