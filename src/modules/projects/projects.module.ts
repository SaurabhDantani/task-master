import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../infrastructure/database/entities/project.entity.js';
import { ProjectMember } from '../../infrastructure/database/entities/project-member.entity.js';
import { User } from '../../infrastructure/database/entities/user.entity.js';
import { ProjectsController } from './projects.controller.js';
import { ProjectsService } from './projects.service.js';
import { ProjectRepository } from '../../infrastructure/repositories/project.repository.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';
import { UserRepository } from '../../infrastructure/repositories/user.repository.js';
import { USER_REPOSITORY } from '../../infrastructure/interfaces/user-repository.interface.js';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectMember, User])],
  controllers: [ProjectsController],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    ProjectsService,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
