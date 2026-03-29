import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Create Login API',
    description: 'The title of the task',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    example: 'Implement authentication endpoints',
    description: 'The description of the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
