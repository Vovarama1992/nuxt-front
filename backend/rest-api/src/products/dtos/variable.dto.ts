import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { VariableGroupType } from 'src/common/utils/enums';

class Variable extends PartialDocumentDTO {
  @ApiProperty({ type: String })
  title: string;
}

export class VariableGroupResponseDTO {
  @ApiProperty({
    enum: VariableGroupType
  })
  group: VariableGroupType;

  @ApiProperty({
    type: [ Variable ]
  })
  variables: Variable[];
}