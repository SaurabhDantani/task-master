import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'Todo' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
