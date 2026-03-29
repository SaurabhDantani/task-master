import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../infrastructure/database/entities/task.entity.js';
import { ColumnEntity } from '../../infrastructure/database/entities/columns.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { MoveTaskDto } from './dto/move-task.dto.js';
import { AssignTaskDto } from './dto/assign-task.dto.js';
import { TaskResponseDto } from './dto/task-response.dto.js';
import { TaskMapper } from './mappers/task.mapper.js';
import { CommonResponse } from '../../common/responses/api-response.js';

import type { IBoardRepository } from '../../infrastructure/interfaces/board-repository.interface.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import type { IProjectRepository } from '../../infrastructure/interfaces/project-repository.interface.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';

@Injectable()
export class TasksService {
  constructor(
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
    columnId: string,
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<CommonResponse<TaskResponseDto>> {
    await this.verifyColumnAccess(columnId, userId);

    const existingTasks = await this.taskRepository.find({
      where: { columnId },
    });

    const position =
      existingTasks.length > 0
        ? Math.max(...existingTasks.map((t) => t.position)) + 1
        : 1;

    const task = this.taskRepository.create({
      ...createTaskDto,
      columnId,
      position,
    });

    const savedTask = await this.taskRepository.save(task);

    return CommonResponse.successWithData(
      'Task created successfully',
      TaskMapper.toTaskResponse(savedTask),
    );
  }

  async findAllByColumnId(
    columnId: string,
    userId: string,
  ): Promise<CommonResponse<TaskResponseDto[]>> {
    await this.verifyColumnAccess(columnId, userId);

    const tasks = await this.taskRepository.find({
      where: { columnId },
      order: { position: 'ASC' },
    });

    return CommonResponse.successWithData(
      'Tasks retrieved successfully',
      TaskMapper.toTasksResponse(tasks),
    );
  }

  async findOne(
    taskId: string,
    userId: string,
  ): Promise<CommonResponse<TaskResponseDto>> {
    const { task } = await this.verifyTaskAccess(taskId, userId);

    return CommonResponse.successWithData(
      'Task retrieved successfully',
      TaskMapper.toTaskResponse(task),
    );
  }

  async update(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<CommonResponse<TaskResponseDto>> {
    const { task } = await this.verifyTaskAccess(taskId, userId);

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.priority !== undefined) {
      task.priority = updateTaskDto.priority;
    }
    if (updateTaskDto.dueDate !== undefined) {
      task.dueDate = updateTaskDto.dueDate;
    }

    const updatedTask = await this.taskRepository.save(task);

    return CommonResponse.successWithData(
      'Task updated successfully',
      TaskMapper.toTaskResponse(updatedTask),
    );
  }

  async assignTask(
    taskId: string,
    assignTaskDto: AssignTaskDto,
    userId: string,
  ): Promise<CommonResponse<TaskResponseDto>> {
    const { task, projectId } = await this.verifyTaskAccess(taskId, userId);

    if (assignTaskDto.userId) {
      const isMember = await this.projectRepository.findMember(
        projectId,
        assignTaskDto.userId,
      );
      if (!isMember) {
        throw new BadRequestException(
          'Assignee is not a member of the project',
        );
      }
      task.assigneeId = assignTaskDto.userId;
    } else {
      task.assigneeId = null;
    }

    const updatedTask = await this.taskRepository.save(task);

    return CommonResponse.successWithData(
      'Task assigned successfully',
      TaskMapper.toTaskResponse(updatedTask),
    );
  }

  async moveTask(
    taskId: string,
    moveTaskDto: MoveTaskDto,
    userId: string,
  ): Promise<CommonResponse<TaskResponseDto>> {
    const { task } = await this.verifyTaskAccess(taskId, userId);

    // Check if new column exists and user has access
    await this.verifyColumnAccess(moveTaskDto.targetColumnId, userId);

    const { targetColumnId, position } = moveTaskDto;

    await this.taskRepository.manager.transaction(async (manager) => {
      // Get tasks from the target column to adjust positions
      const tasksInNewColumn = await manager.find(Task, {
        where: { columnId: targetColumnId },
        order: { position: 'ASC' },
      });

      // Filter out the current task if it's already in the same column
      const otherTasks = tasksInNewColumn.filter((t) => t.id !== taskId);

      // Insert at the new position (bounded between 1 and length + 1)
      const maxPosition = otherTasks.length + 1;
      const targetPosition = Math.min(Math.max(1, position), maxPosition);

      // Adjust positions for other tasks
      let currentPos = 1;
      for (const t of otherTasks) {
        if (currentPos === targetPosition) currentPos++;
        t.position = currentPos++;
        await manager.save(t);
      }

      // Update the moved task
      task.columnId = targetColumnId;
      task.position = targetPosition;
      await manager.save(task);

      // Also to keep the old column positions sequential if we changed columns
      if (task.columnId !== targetColumnId) {
        const oldColumnTasks = await manager.find(Task, {
          where: { columnId: task.columnId },
          order: { position: 'ASC' },
        });
        const remainingOldTasks = oldColumnTasks.filter((t) => t.id !== taskId);
        let pos = 1;
        for (const t of remainingOldTasks) {
          t.position = pos++;
          await manager.save(t);
        }
      }
    });

    const finalTask = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    return CommonResponse.successWithData(
      'Task moved successfully',
      TaskMapper.toTaskResponse(finalTask!),
    );
  }

  async remove(taskId: string, userId: string): Promise<CommonResponse<null>> {
    const { task, member } = await this.verifyTaskAccess(taskId, userId);

    if (
      member.role !== ProjectRole.OWNER &&
      member.role !== ProjectRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this task',
      );
    }

    await this.taskRepository.manager.transaction(async (manager) => {
      const columnId = task.columnId;
      await manager.remove(task);

      // Reorder remaining tasks in the column
      const remainingTasks = await manager.find(Task, {
        where: { columnId },
        order: { position: 'ASC' },
      });

      let pos = 1;
      for (const t of remainingTasks) {
        t.position = pos++;
        await manager.save(t);
      }
    });

    return CommonResponse.success('Task deleted successfully');
  }
}
