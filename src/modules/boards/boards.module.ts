import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller.js';
import { BoardsDetailsController } from './boards-details.controller.js';
import { BoardsService } from './boards.service.js';
import { Board } from '../../infrastructure/database/entities/boards.entity.js';
import { Project } from '../../infrastructure/database/entities/project.entity.js';
import { ProjectMember } from '../../infrastructure/database/entities/project-member.entity.js';
import { ColumnEntity } from '../../infrastructure/database/entities/columns.entity.js';
import { Task } from '../../infrastructure/database/entities/task.entity.js';
import { BoardRepository } from '../../infrastructure/repositories/board.repository.js';
import { BOARD_REPOSITORY } from '../../infrastructure/interfaces/board-repository.interface.js';
import { ProjectRepository } from '../../infrastructure/repositories/project.repository.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board,
      Project,
      ProjectMember,
      ColumnEntity,
      Task,
    ]),
  ],
  controllers: [BoardsController, BoardsDetailsController],
  providers: [
    BoardsService,
    {
      provide: BOARD_REPOSITORY,
      useClass: BoardRepository,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
  ],
  exports: [BoardsService],
})
export class BoardsModule {}
