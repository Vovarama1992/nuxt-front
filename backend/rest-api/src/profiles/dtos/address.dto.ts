import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class AddressDTO {
  @ApiProperty({ type: String })
  @IsString()
  @Length(2, 256)
  city: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(2, 512)
  address: string;
}

export class AddressesDTO {
  @ApiProperty({ type: [ AddressDTO ] })
  addresses: AddressDTO[];
}