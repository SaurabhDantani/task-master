import { TaskPriority } from '../../../common/enums/task-priority.enum.js';

export class TaskResponseDto {
  id: string;
  title: string;
  description: string | null;
  columnId: string;
  assigneeId: string | null;
  priority: TaskPriority;
  dueDate: Date | null;
  position: number;
  createdAt: Date;
}
