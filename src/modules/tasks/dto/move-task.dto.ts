import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveTaskDto {
  @ApiProperty({
    example: 'column-1',
    description: 'The column ID where the task is moved',
  })
  @IsNotEmpty()
  @IsString()
  targetColumnId: string;

  @ApiProperty({
    example: 1,
    description: 'The new position of the task in the column',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  position: number;
}
