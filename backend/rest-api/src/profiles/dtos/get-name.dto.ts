import { ApiProperty } from '@nestjs/swagger';

export class GetNameResponseDTO {
  @ApiProperty({ type: String })
  name: string;
}