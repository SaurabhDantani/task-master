import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTaskDto {
  @ApiProperty({
    example: 'user-1',
    description: 'The user ID to assign the task to (pass null to unassign)',
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string | null;
}
