import { IsEnum, IsUUID } from 'class-validator';
import { ProjectRole } from '../../../common/enums/project-role.enum.js';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the user',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    enum: ProjectRole,
    example: ProjectRole.MEMBER,
    description: 'Role in the project (1=OWNER, 2=ADMIN, 3=MEMBER)',
  })
  @IsEnum(ProjectRole)
  role: ProjectRole;
}
