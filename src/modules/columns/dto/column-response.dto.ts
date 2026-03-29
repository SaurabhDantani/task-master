import { ApiProperty } from '@nestjs/swagger';

export class ColumnResponseDto {
  @ApiProperty({ example: 'column-uuid-1234' })
  id: string;

  @ApiProperty({ example: 'Todo' })
  name: string;

  @ApiProperty({ example: 'board-uuid-1234' })
  boardId: string;

  @ApiProperty({ example: 1 })
  position: number;
}
