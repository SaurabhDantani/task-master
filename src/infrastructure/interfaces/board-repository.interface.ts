import { Board } from '../database/entities/boards.entity.js';
import { CreateBoardDto } from '../../modules/boards/dto/create-board.dto.js';
import { UpdateBoardDto } from '../../modules/boards/dto/update-board.dto.js';
// import { PaginationResult } from '../../common/dtos/pagination.dto.js';

export interface IBoardRepository {
  create(createBoardDto: CreateBoardDto, projectId: string): Promise<Board>;
  // findAll(
  //   projectId: string,
  //   lastId?: number,
  //   limit?: number,
  // ): Promise<PaginationResult<Board>>;
  findAll(projectId: string): Promise<Board[]>;
  findById(id: string): Promise<Board | null>;
  update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board>;
  delete(id: string): Promise<void>;
}

export const BOARD_REPOSITORY = 'BOARD_REPOSITORY';
