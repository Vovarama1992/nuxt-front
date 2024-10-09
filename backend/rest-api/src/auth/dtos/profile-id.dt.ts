import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/profiles/dtos/profile.dto';

export class ProfileIdResponseDTO {
  @ApiProperty()
  profile_id: Profile;
}