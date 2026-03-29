import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { AddMemberDto } from './dto/add-member.dto.js';
import type { IUserRepository } from '../../infrastructure/interfaces/user-repository.interface.js';
import { USER_REPOSITORY } from '../../infrastructure/interfaces/user-repository.interface.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import type { IProjectRepository } from '../../infrastructure/interfaces/project-repository.interface.js';
import { PROJECT_REPOSITORY } from '../../infrastructure/interfaces/project-repository.interface.js';
import { ProjectMapper } from './mappers/project.mapper.js';
import { ProjectResponseDto } from './dto/project-response.dto.js';
import { ProjectMemberResponseDto } from './dto/project-member-response.dto.js';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<CommonResponse<ProjectResponseDto>> {
    const project = await this.projectRepository.create(
      createProjectDto,
      userId,
    );

    await this.projectRepository.addMember(
      project.id,
      userId,
      ProjectRole.OWNER,
    );

    return CommonResponse.successWithData(
      'Project created successfully',
      ProjectMapper.toProjectResponse(project),
    );
  }

  async findAll(userId: string): Promise<CommonResponse<ProjectResponseDto[]>> {
    const projects = await this.projectRepository.findAll(userId);
    return CommonResponse.successWithData(
      'Projects retrieved successfully',
      ProjectMapper.toProjectsResponse(projects),
    );
  }

  async findOne(
    id: string,
    userId: string,
  ): Promise<CommonResponse<ProjectResponseDto>> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const member = await this.projectRepository.findMember(id, userId);
    if (!member) {
      throw new ForbiddenException('User not member of project');
    }

    return CommonResponse.successWithData(
      'Project retrieved successfully',
      ProjectMapper.toProjectResponse(project),
    );
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ): Promise<CommonResponse<ProjectResponseDto>> {
    const member = await this.projectRepository.findMember(id, userId);
    if (
      !member ||
      (member.role !== ProjectRole.OWNER && member.role !== ProjectRole.ADMIN)
    ) {
      throw new ForbiddenException('Unauthorized action');
    }

    const updatedProject = await this.projectRepository.update(
      id,
      updateProjectDto,
    );
    return CommonResponse.successWithData(
      'Project updated successfully',
      ProjectMapper.toProjectResponse(updatedProject),
    );
  }

  async remove(id: string, userId: string): Promise<CommonResponse<null>> {
    const member = await this.projectRepository.findMember(id, userId);
    if (!member || member.role !== ProjectRole.OWNER) {
      throw new ForbiddenException('Unauthorized action');
    }

    await this.projectRepository.delete(id);
    return CommonResponse.success('Project deleted successfully');
  }

  // Member Management
  async addMember(
    projectId: string,
    addMemberDto: AddMemberDto,
    userId: string,
  ): Promise<CommonResponse<ProjectMemberResponseDto>> {
    const requester = await this.projectRepository.findMember(
      projectId,
      userId,
    );
    if (
      !requester ||
      (requester.role !== ProjectRole.OWNER &&
        requester.role !== ProjectRole.ADMIN)
    ) {
      throw new ForbiddenException('Unauthorized action');
    }

    // Step 2: Check user exists
    const userToAdd = await this.userRepository.findById(addMemberDto.userId);
    if (!userToAdd) {
      throw new NotFoundException('User not found');
    }

    // Step 3: Check user is not already member
    const existingMember = await this.projectRepository.findMember(
      projectId,
      addMemberDto.userId,
    );
    if (existingMember) {
      throw new ConflictException('User already project member');
    }

    const member = await this.projectRepository.addMember(
      projectId,
      addMemberDto.userId,
      addMemberDto.role,
    );
    return CommonResponse.successWithData(
      'Member added successfully',
      ProjectMapper.toProjectMemberResponse(member),
    );
  }

  async removeMember(
    projectId: string,
    memberUserId: string,
    userId: string,
  ): Promise<CommonResponse<null>> {
    const requester = await this.projectRepository.findMember(
      projectId,
      userId,
    );
    if (
      !requester ||
      (requester.role !== ProjectRole.OWNER &&
        requester.role !== ProjectRole.ADMIN)
    ) {
      throw new ForbiddenException('Unauthorized action');
    }

    const memberToRemove = await this.projectRepository.findMember(
      projectId,
      memberUserId,
    );
    if (!memberToRemove) {
      throw new NotFoundException('User not member of project');
    }

    if (memberToRemove.role === ProjectRole.OWNER) {
      throw new ForbiddenException('Unauthorized action');
    }

    await this.projectRepository.removeMember(projectId, memberUserId);
    return CommonResponse.success('Member removed successfully');
  }

  async getMembers(
    projectId: string,
    userId: string,
  ): Promise<CommonResponse<ProjectMemberResponseDto[]>> {
    const requester = await this.projectRepository.findMember(
      projectId,
      userId,
    );
    if (!requester) {
      throw new ForbiddenException('User not member of project');
    }

    const members = await this.projectRepository.getMembers(projectId);

    return CommonResponse.successWithData(
      'Members retrieved successfully',
      ProjectMapper.toProjectMembersResponse(members),
    );
  }
}
