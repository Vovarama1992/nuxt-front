import { IsString, Length } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  @Length(2, 256)
  city: string;

  @IsString()
  @Length(2, 512)
  address: string;
}
