import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Board } from '../database/entities/boards.entity.js';
import { ColumnEntity } from '../database/entities/columns.entity.js';
import { Task } from '../database/entities/task.entity.js';
import { IBoardRepository } from '../interfaces/board-repository.interface.js';
import { CreateBoardDto } from '../../modules/boards/dto/create-board.dto.js';
import { UpdateBoardDto } from '../../modules/boards/dto/update-board.dto.js';
// import { PaginationResult } from '../../common/dtos/pagination.dto.js';

@Injectable()
export class BoardRepository implements IBoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(
    createBoardDto: CreateBoardDto,
    projectId: string,
  ): Promise<Board> {
    const board = this.boardRepository.create({
      ...createBoardDto,
      projectId,
    });
    return this.boardRepository.save(board);
  }

  async findAll(projectId: string): Promise<Board[]> {
    return this.boardRepository.find({
      where: { projectId },
      order: { createdAt: 'ASC' },
    });
  }

  // async findAll(
  //   projectId: string,
  //   lastId?: number,
  //   limit: number = 20,
  // ): Promise<PaginationResult<Board>> {
  //   const query = this.boardRepository
  //     .createQueryBuilder('b')
  //     .where('b.projectId = :projectId', { projectId });

  //   if (lastId) {
  //     query.andWhere('b.id > :lastId', { lastId });
  //   }
  //   const [data, totalRecord] = await query
  //     .orderBy('b.id', 'ASC')
  //     .take(limit)
  //     .getManyAndCount();
  //   return new PaginationResult<Board>(
  //     data,
  //     totalRecord,
  //     Number(lastId),
  //     limit,
  //   );
  // }

  async findById(id: string): Promise<Board | null> {
    return this.boardRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.findById(id);
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    Object.assign(board, updateBoardDto);
    return this.boardRepository.save(board);
  }

  async delete(id: string): Promise<void> {
    const board = await this.findById(id);
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    await this.boardRepository.manager.transaction(async (manager) => {
      // 1. Find all columns for this board
      const columns = await manager.find(ColumnEntity, {
        where: { boardId: id },
      });
      const columnIds = columns.map((c) => c.id);

      if (columnIds.length > 0) {
        // 2. Delete tasks in those columns
        await manager.delete(Task, { columnId: In(columnIds) });
        // 3. Delete columns
        await manager.delete(ColumnEntity, { boardId: id });
      }

      // 4. Delete board
      await manager.remove(board);
    });
  }
}
