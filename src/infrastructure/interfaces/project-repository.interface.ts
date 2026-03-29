import { Project } from '../database/entities/project.entity.js';
import { ProjectMember } from '../database/entities/project-member.entity.js';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { CreateProjectDto } from '../../modules/projects/dto/create-project.dto.js';
import { UpdateProjectDto } from '../../modules/projects/dto/update-project.dto.js';

export interface IProjectRepository {
  create(createProjectDto: CreateProjectDto, ownerId: string): Promise<Project>;
  findAll(userId: string): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
  delete(id: string): Promise<void>;

  // Member Management
  addMember(
    projectId: string,
    userId: string,
    role: ProjectRole,
  ): Promise<ProjectMember>;
  removeMember(projectId: string, userId: string): Promise<void>;
  getMembers(projectId: string): Promise<ProjectMember[]>;
  findMember(projectId: string, userId: string): Promise<ProjectMember | null>;
  updateMemberRole(
    projectId: string,
    userId: string,
    role: ProjectRole,
  ): Promise<ProjectMember>;
}

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';
