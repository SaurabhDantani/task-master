import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Task Management System',
    description: 'Name of the project',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Backend development project',
    description: 'Brief description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
