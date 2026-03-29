import { IsArray, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderColumnDto {
  @ApiProperty({ example: ['column1', 'column3', 'column2'] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  columnOrder: string[];
}
