import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: 'Development Board' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
