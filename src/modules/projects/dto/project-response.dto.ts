import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the project',
  })
  id: string;

  @ApiProperty({
    example: 'Task Management System',
    description: 'Name of the project',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Backend development project',
    description: 'Brief description',
  })
  description?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the project owner',
  })
  ownerId: string;

  @ApiProperty({
    example: '2024-03-09T10:00:00.000Z',
    description: 'Project creation date',
  })
  createdAt: Date;
}
