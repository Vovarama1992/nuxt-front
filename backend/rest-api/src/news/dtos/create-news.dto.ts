import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateNewsDTO {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  text: string;

  @IsString()
  preview: string;

  @IsArray()
  @IsString({ each: true })
  photos: string[];

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  button_label?: string;
}