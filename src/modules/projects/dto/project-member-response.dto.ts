import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectRole } from '../../../common/enums/project-role.enum.js';

export class ProjectMemberResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the membership record',
  })
  memberId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the user',
  })
  userId: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Name of the user (if joined)',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'Email form user (if joined)',
  })
  email?: string;

  @ApiProperty({
    enum: ProjectRole,
    example: ProjectRole.MEMBER,
    description: 'Role of the user in the project',
  })
  role: ProjectRole;

  @ApiProperty({
    example: '2024-03-09T10:00:00.000Z',
    description: 'Date the user joined the project',
  })
  joinedAt: Date;
}
