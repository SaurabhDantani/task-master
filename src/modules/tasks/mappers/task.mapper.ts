import { Task } from '../../../infrastructure/database/entities/task.entity.js';
import { TaskResponseDto } from '../dto/task-response.dto.js';

export class TaskMapper {
  static toTaskResponse(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      columnId: task.columnId,
      assigneeId: task.assigneeId,
      priority: task.priority,
      dueDate: task.dueDate,
      position: task.position,
      createdAt: task.createdAt,
    };
  }

  static toTasksResponse(tasks: Task[]): TaskResponseDto[] {
    return tasks.map((task) => this.toTaskResponse(task));
  }
}
