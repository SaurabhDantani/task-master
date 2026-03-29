import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './columns.controller.js';
import { ColumnsService } from './columns.service.js';
import { ColumnEntity } from '../../infrastructure/database/entities/columns.entity.js';
import { Task } from '../../infrastructure/database/entities/task.entity.js';
import { BoardRepository } from '../../infrastructure/repositories/board.repository.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import { ProjectRepository } from '../../infrastructure/repositories/project.repository.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';
import { Board } from '../../infrastructure/database/entities/boards.entity.js';
import { Project } from '../../infrastructure/database/entities/project.entity.js';
import { ProjectMember } from '../../infrastructure/database/entities/project-member.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColumnEntity,
      Task,
      Board,
      Project,
      ProjectMember,
    ]),
  ],
  controllers: [ColumnsController],
  providers: [
    ColumnsService,
    {
      provide: BOARD_REPOSITORY,
      useClass: BoardRepository,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
  ],
  exports: [ColumnsService],
})
export class ColumnsModule {}
