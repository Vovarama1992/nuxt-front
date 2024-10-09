import { PartialType } from '@nestjs/swagger';

import { CreateNewsDTO } from './create-news.dto';

export class UpdateNewsDTO extends PartialType(CreateNewsDTO) {}