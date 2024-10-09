import { ApiProperty } from '@nestjs/swagger';

class ScoresHistoryItem {
  @ApiProperty({ type: Date })
  date: string;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Number })
  quantity: number;
}

class Scores {
  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: [ ScoresHistoryItem ] })
  history: ScoresHistoryItem[];
}

export class ScoresResponseDTO {
  @ApiProperty({ type: String })
  promocode: string;

  @ApiProperty({ type: Scores })
  scores: Scores;
}