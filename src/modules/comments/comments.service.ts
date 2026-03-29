import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../infrastructure/database/entities/comments.entity.js';
import { Task } from '../../infrastructure/database/entities/task.entity.js';
import { ColumnEntity } from '../../infrastructure/database/entities/columns.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentResponseDto } from './dto/comment-response.dto.js';
import { CommentMapper } from './mappers/comment.mapper.js';
import { CommonResponse } from '../../common/responses/api-response.js';

import type { IBoardRepository } from '../../infrastructure/interfaces/board-repository.interface.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import type { IProjectRepository } from '../../infrastructure/interfaces/project-repository.interface.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  private async verifyColumnAccess(columnId: string, userId: string) {
    const column = await this.columnRepository.findOne({
      where: { id: columnId },
    });
    if (!column) throw new NotFoundException('Column not found');

    const board = await this.boardRepository.findById(column.boardId);
    if (!board) throw new NotFoundException('Board not found');

    const member = await this.projectRepository.findMember(
      board.projectId,
      userId,
    );
    if (!member) {
      throw new ForbiddenException('User is not a member of this project');
    }

    return { column, board, projectId: board.projectId, member };
  }

  private async verifyTaskAccess(taskId: string, userId: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    const { projectId, member } = await this.verifyColumnAccess(
      task.columnId,
      userId,
    );

    return { task, projectId, member };
  }

  async create(
    taskId: string,
    createCommentDto: CreateCommentDto,
    userId: string,
  ): Promise<CommonResponse<CommentResponseDto>> {
    await this.verifyTaskAccess(taskId, userId);

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      taskId,
      userId,
    });

    const savedComment = await this.commentRepository.save(comment);

    return CommonResponse.successWithData(
      'Comment created successfully',
      CommentMapper.toCommentResponse(savedComment),
    );
  }

  async findAllByTaskId(
    taskId: string,
    userId: string,
  ): Promise<CommonResponse<CommentResponseDto[]>> {
    await this.verifyTaskAccess(taskId, userId);

    const comments = await this.commentRepository.find({
      where: { taskId },
      order: { createdAt: 'ASC' },
    });

    return CommonResponse.successWithData(
      'Comments retrieved successfully',
      CommentMapper.toCommentsResponse(comments),
    );
  }

  async remove(
    commentId: string,
    userId: string,
  ): Promise<CommonResponse<null>> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    const { member } = await this.verifyTaskAccess(comment.taskId, userId);

    if (
      comment.userId !== userId &&
      member.role !== ProjectRole.OWNER &&
      member.role !== ProjectRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );
    }

    await this.commentRepository.remove(comment);

    return CommonResponse.success('Comment deleted successfully');
  }
}
