import { Board } from '../../../infrastructure/database/entities/boards.entity.js';
import { BoardResponseDto } from '../dto/board-response.dto.js';

export class BoardMapper {
  static toBoardResponse(board: Board): BoardResponseDto {
    const dto = new BoardResponseDto();
    dto.id = board.id;
    dto.name = board.name;
    dto.projectId = board.projectId;
    dto.createdAt = board.createdAt;
    return dto;
  }

  static toBoardsResponse(boards: Board[]): BoardResponseDto[] {
    return boards.map((board) => this.toBoardResponse(board));
  }
}
