import { Project } from '../../../infrastructure/database/entities/project.entity.js';
import { ProjectMember } from '../../../infrastructure/database/entities/project-member.entity.js';
import { ProjectResponseDto } from '../dto/project-response.dto.js';
import { ProjectMemberResponseDto } from '../dto/project-member-response.dto.js';

export class ProjectMapper {
  static toProjectResponse(entity: Project): ProjectResponseDto {
    if (!entity) return null as unknown as ProjectResponseDto;
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      ownerId: entity.ownerId,
      createdAt: entity.createdAt,
    };
  }

  static toProjectsResponse(entities: Project[]): ProjectResponseDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.toProjectResponse(entity));
  }

  static toProjectMemberResponse(
    entity: ProjectMember,
  ): ProjectMemberResponseDto {
    if (!entity) return null as unknown as ProjectMemberResponseDto;
    return {
      memberId: entity.id,
      userId: entity.userId,
      name: entity.user?.name,
      email: entity.user?.email,
      role: entity.role,
      joinedAt: entity.joinedAt,
    };
  }

  static toProjectMembersResponse(
    entities: ProjectMember[],
  ): ProjectMemberResponseDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.toProjectMemberResponse(entity));
  }
}
