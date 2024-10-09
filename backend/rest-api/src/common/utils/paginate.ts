import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Document } from 'mongodb';

const DEFAULT_LIMIT = 10;

export class PaginationDTO {
  @ApiProperty({ type: Number, default: DEFAULT_LIMIT })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  @Max(40)
  limit: number;

  @ApiProperty({ type: Number, default: 1 })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  page: number;
}

export abstract class PaginationResponseDTO {
  abstract content: any[];

  @ApiProperty({ type: Number })
  total_pages: number;

  @ApiProperty({ type: Number })
  total_items: number;
}

interface PaginationOptions {
  omitProps?: string[];
  sort?: Record<string, any>;
  addFields?: Record<string, any>;
}

export function getPaginationAggregationSteps(dto: PaginationDTO, options: PaginationOptions = {}) {
  const $project = options.omitProps.reduce((p, c) => ({ ...p, [c]: 0 }), {});
  const limit = dto.limit;

  const content: Document[] = [
    { $skip: (dto.page - 1) * limit },
    { $limit: limit },
  ];

  if (options.addFields)
    content.push({ $addFields: options.addFields });

  content.push({ $project });

  if (options.sort)
    content.unshift({ $sort: options.sort });

  return [
    {
      $facet: {
        content,
        counted: [
          {
            $count: 'count'
          }
        ]
      },
    },
    {
      $addFields: {
        total_items: {
          $arrayElemAt: ['$counted.count', 0]
        },
        total_pages: {
          $ceil: {
            $divide: [
              {
                $arrayElemAt: ['$counted.count', 0]
              },
              limit
            ]
          }
        }
      }
    },
    {
      $project: { counted: 0 }
    }
  ];
}