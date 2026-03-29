import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../database/entities/project.entity.js';
import { ProjectMember } from '../database/entities/project-member.entity.js';
import { ProjectRole } from '../../common/enums/project-role.enum.js';
import { IProjectRepository } from '../interfaces/project-repository.interface.js';
import { CreateProjectDto } from '../../modules/projects/dto/create-project.dto.js';
import { UpdateProjectDto } from '../../modules/projects/dto/update-project.dto.js';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectMember)
    private readonly memberRepository: Repository<ProjectMember>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    ownerId: string,
  ): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      ownerId,
    });
    return this.projectRepository.save(project);
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project_members', 'member', 'member.projectId = project.id')
      .where('member.userId = :userId', { userId })
      .orderBy('project.createdAt', 'DESC')
      .getMany();
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async delete(id: string): Promise<void> {
    const project = await this.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    // Delete members first if cascade not handled by DB (though we added onDelete: 'CASCADE')
    await this.memberRepository.delete({ projectId: id });
    await this.projectRepository.remove(project);
  }

  // Member Management
  async addMember(
    projectId: string,
    userId: string,
    role: ProjectRole,
  ): Promise<ProjectMember> {
    const member = this.memberRepository.create({
      projectId,
      userId,
      role,
    });
    return this.memberRepository.save(member);
  }

  async removeMember(projectId: string, userId: string): Promise<void> {
    const result = await this.memberRepository.delete({ projectId, userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Member not found in project`);
    }
  }

  async getMembers(projectId: string): Promise<ProjectMember[]> {
    return this.memberRepository.find({
      where: { projectId },
      relations: ['user'],
      order: { joinedAt: 'ASC' },
    });
  }

  async findMember(
    projectId: string,
    userId: string,
  ): Promise<ProjectMember | null> {
    return this.memberRepository.findOne({
      where: { projectId, userId },
    });
  }

  async updateMemberRole(
    projectId: string,
    userId: string,
    role: ProjectRole,
  ): Promise<ProjectMember> {
    const member = await this.findMember(projectId, userId);
    if (!member) {
      throw new NotFoundException(`Member not found in project`);
    }
    member.role = role;
    return this.memberRepository.save(member);
  }
}
