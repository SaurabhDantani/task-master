import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../../infrastructure/database/entities/columns.entity.js';
import { Task } from '../../infrastructure/database/entities/task.entity.js';
import { CreateColumnDto } from './dto/create-column.dto.js';
import { UpdateColumnDto } from './dto/update-column.dto.js';
import { ReorderColumnDto } from './dto/reorder-column.dto.js';
import { ColumnResponseDto } from './dto/column-response.dto.js';
import { ColumnMapper } from './mappers/column.mapper.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import type { IBoardRepository } from '../../infrastructure/interfaces/board-repository.interface.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import type { IProjectRepository } from '../../infrastructure/interfaces/project-repository.interface.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  private async verifyProjectMembership(projectId: string, userId: string) {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const member = await this.projectRepository.findMember(projectId, userId);
    if (!member) {
      throw new ForbiddenException('User is not a member of this project');
    }
    return member;
  }

  async create(
    boardId: string,
    createColumnDto: CreateColumnDto,
    userId: string,
  ): Promise<CommonResponse<ColumnResponseDto>> {
    const board = await this.boardRepository.findById(boardId);
    if (!board) throw new NotFoundException('Board not found');

    await this.verifyProjectMembership(board.projectId, userId);

    const existingColumns = await this.columnRepository.find({
      where: { boardId },
    });

    // Determine column position: place at the end
    const position =
      existingColumns.length > 0
        ? Math.max(...existingColumns.map((c) => c.position)) + 1
        : 1;

    const column = this.columnRepository.create({
      ...createColumnDto,
      boardId,
      position,
    });

    const savedColumn = await this.columnRepository.save(column);

    return CommonResponse.successWithData(
      'Column created successfully',
      ColumnMapper.toColumnResponse(savedColumn),
    );
  }

  async findAllByBoardId(
    boardId: string,
    userId: string,
  ): Promise<CommonResponse<ColumnResponseDto[]>> {
    const board = await this.boardRepository.findById(boardId);
    if (!board) throw new NotFoundException('Board not found');

    await this.verifyProjectMembership(board.projectId, userId);

    const columns = await this.columnRepository.find({
      where: { boardId },
      order: { position: 'ASC' },
    });

    return CommonResponse.successWithData(
      'Columns retrieved successfully',
      ColumnMapper.toColumnsResponse(columns),
    );
  }

  async update(
    columnId: string,
    updateColumnDto: UpdateColumnDto,
    userId: string,
  ): Promise<CommonResponse<ColumnResponseDto>> {
    const column = await this.columnRepository.findOne({
      where: { id: columnId },
    });
    if (!column) throw new NotFoundException('Column not found');

    const board = await this.boardRepository.findById(column.boardId);
    if (!board) throw new NotFoundException('Board not found');

    const member = await this.verifyProjectMembership(board.projectId, userId);

    if (
      member.role !== ProjectRole.OWNER &&
      member.role !== ProjectRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to update this column',
      );
    }

    if (updateColumnDto.name !== undefined) {
      column.name = updateColumnDto.name;
    }

    const updatedColumn = await this.columnRepository.save(column);
    return CommonResponse.successWithData(
      'Column updated successfully',
      ColumnMapper.toColumnResponse(updatedColumn),
    );
  }

  async reorder(
    boardId: string,
    reorderColumnDto: ReorderColumnDto,
    userId: string,
  ): Promise<CommonResponse<ColumnResponseDto[]>> {
    const board = await this.boardRepository.findById(boardId);
    if (!board) throw new NotFoundException('Board not found');

    await this.verifyProjectMembership(board.projectId, userId);

    const { columnOrder } = reorderColumnDto;

    const columns = await this.columnRepository.find({
      where: { boardId },
    });

    const columnIds = columns.map((c) => c.id);
    const isValidOrder =
      columnOrder.length === columns.length &&
      columnOrder.every((id) => columnIds.includes(id));

    if (!isValidOrder) {
      throw new NotFoundException('Invalid column order');
    }

    await this.columnRepository.manager.transaction(async (manager) => {
      for (let i = 0; i < columnOrder.length; i++) {
        await manager.update(ColumnEntity, columnOrder[i], {
          position: i + 1,
        });
      }
    });

    return this.findAllByBoardId(boardId, userId);
  }

  async delete(
    columnId: string,
    userId: string,
  ): Promise<CommonResponse<null>> {
    const column = await this.columnRepository.findOne({
      where: { id: columnId },
    });
    if (!column) throw new NotFoundException('Column not found');

    const boardId = column.boardId;
    const board = await this.boardRepository.findById(boardId);
    if (!board) throw new NotFoundException('Board not found');

    const member = await this.verifyProjectMembership(board.projectId, userId);

    if (
      member.role !== ProjectRole.OWNER &&
      member.role !== ProjectRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this column',
      );
    }

    await this.columnRepository.manager.transaction(async (manager) => {
      await manager.delete(Task, { columnId });
      await manager.delete(ColumnEntity, { id: columnId });

      const remainingColumns = await manager.find(ColumnEntity, {
        where: { boardId },
        order: { position: 'ASC' },
      });

      let pos = 1;
      for (const col of remainingColumns) {
        col.position = pos++;
        await manager.save(col);
      }
    });

    return CommonResponse.success('Column deleted successfully');
  }
}
