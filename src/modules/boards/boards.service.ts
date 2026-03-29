import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { CreateBoardDto } from './dto/create-board.dto.js';
import { UpdateBoardDto } from './dto/update-board.dto.js';
import { BoardResponseDto } from './dto/board-response.dto.js';
import { BoardMapper } from './mappers/board.mapper.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import type { IBoardRepository } from '../../infrastructure/interfaces/board-repository.interface.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import type { IProjectRepository } from '../../infrastructure/interfaces/project-repository.interface.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
// import { PaginationResult } from 'src/common/dtos/pagination.dto.js';
// import { Board } from 'src/infrastructure/database/entities/boards.entity.js';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
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
  }

  async create(
    projectId: string,
    createBoardDto: CreateBoardDto,
    userId: string,
  ): Promise<CommonResponse<BoardResponseDto>> {
    await this.verifyProjectMembership(projectId, userId);

    const board = await this.boardRepository.create(createBoardDto, projectId);
    await this.cacheManager.del(`boards_${projectId}`);

    return CommonResponse.successWithData(
      'Board created successfully',
      BoardMapper.toBoardResponse(board),
    );
  }

  async findAll(
    projectId: string,
    userId: string,
    // lastId?: number,
    // limit: number = 20,
  ): Promise<CommonResponse<BoardResponseDto[]>> {
    await this.verifyProjectMembership(projectId, userId);

    const cacheKey = `boards_${projectId}`;
    const cacheDataExist: BoardResponseDto[] | undefined =
      await this.cacheManager.get(cacheKey);

    if (cacheDataExist) {
      return CommonResponse.successWithData(
        'Boards retrieved successfully',
        cacheDataExist,
      );
    }

    const boards = await this.boardRepository.findAll(projectId);

    const mappedData = BoardMapper.toBoardsResponse(boards);
    await this.cacheManager.set(cacheKey, mappedData, 12000);

    return CommonResponse.successWithData(
      'Boards retrieved successfully',
      mappedData,
    );
  }

  async getBoardById(
    id: string,
    userId: string,
  ): Promise<CommonResponse<BoardResponseDto>> {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    await this.verifyProjectMembership(board.projectId, userId);

    return CommonResponse.successWithData(
      'Board retrieved successfully',
      BoardMapper.toBoardResponse(board),
    );
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
    userId: string,
  ): Promise<CommonResponse<BoardResponseDto>> {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const member = await this.projectRepository.findMember(
      board.projectId,
      userId,
    );
    if (!member) {
      throw new ForbiddenException('User is not a member of this project');
    }

    if (
      member.role !== ProjectRole.OWNER &&
      member.role !== ProjectRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to update this board',
      );
    }

    const updatedBoard = await this.boardRepository.update(id, updateBoardDto);
    await this.cacheManager.del(`boards_${board.projectId}`);

    return CommonResponse.successWithData(
      'Board updated successfully',
      BoardMapper.toBoardResponse(updatedBoard),
    );
  }

  async deleteBoard(id: string, userId: string): Promise<CommonResponse<null>> {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const member = await this.projectRepository.findMember(
      board.projectId,
      userId,
    );
    if (!member) {
      throw new ForbiddenException('User is not a member of this project');
    }

    if (
      member.role !== ProjectRole.OWNER &&
      member.role !== ProjectRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this board',
      );
    }

    await this.boardRepository.delete(id);
    await this.cacheManager.del(`boards_${board.projectId}`);

    return CommonResponse.success('Board deleted successfully');
  }
}
