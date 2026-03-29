import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { Task } from '../../infrastructure/database/entities/task.entity.js';
import { ColumnEntity } from '../../infrastructure/database/entities/columns.entity.js';
import { BoardRepository } from '../../infrastructure/repositories/board.repository.js';
import { ProjectRepository } from '../../infrastructure/repositories/project.repository.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';

import { Board } from '../../infrastructure/database/entities/boards.entity.js';
import { Project } from '../../infrastructure/database/entities/project.entity.js';
import { ProjectMember } from '../../infrastructure/database/entities/project-member.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      ColumnEntity,
      Board,
      Project,
      ProjectMember,
    ]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: BOARD_REPOSITORY,
      useClass: BoardRepository,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
  ],
})
export class TasksModule {}
