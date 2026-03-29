import { ApiProperty } from '@nestjs/swagger';

export class BoardResponseDto {
  @ApiProperty({ example: 'board-uuid-1234' })
  id: string;

  @ApiProperty({ example: 'Development Board' })
  name: string;

  @ApiProperty({ example: 'project-uuid-1234' })
  projectId: string;

  @ApiProperty()
  createdAt: Date;
}
