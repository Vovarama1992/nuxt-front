import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { UserRoles } from 'src/common/utils/enums';

export class Profile extends PartialDocumentDTO {
  @ApiProperty({ enum: UserRoles })
  role: UserRoles;
}