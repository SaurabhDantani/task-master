import { ColumnEntity } from '../../../infrastructure/database/entities/columns.entity.js';
import { ColumnResponseDto } from '../dto/column-response.dto.js';

export class ColumnMapper {
  static toColumnResponse(column: ColumnEntity): ColumnResponseDto {
    const dto = new ColumnResponseDto();
    dto.id = column.id;
    dto.name = column.name;
    dto.boardId = column.boardId;
    dto.position = column.position;
    return dto;
  }

  static toColumnsResponse(columns: ColumnEntity[]): ColumnResponseDto[] {
    return columns.map((column) => this.toColumnResponse(column));
  }
}
