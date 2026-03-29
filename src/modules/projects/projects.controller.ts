import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { AddMemberDto } from './dto/add-member.dto.js';
import { ProjectResponseDto } from './dto/project-response.dto.js';
import { ProjectMemberResponseDto } from './dto/project-member-response.dto.js';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

interface JwtPayload {
  loginId: string;
  role: string;
}

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<ProjectResponseDto>> {
    const userId = user.loginId;
    return this.projectsService.create(createProjectDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  findAll(
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<ProjectResponseDto[]>> {
    const userId = user.loginId;
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific project' })
  @ApiResponse({
    status: 200,
    description: 'Project details retrieved successfully',
  })
  @ApiResponse({ status: 403, description: 'User not member of project' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<ProjectResponseDto>> {
    const userId = user.loginId;
    return this.projectsService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project details' })
  @ApiResponse({ status: 200, description: 'Project successfully updated' })
  @ApiResponse({ status: 403, description: 'Unauthorized action' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<ProjectResponseDto>> {
    const userId = user.loginId;
    return this.projectsService.update(id, updateProjectDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a project completely' })
  @ApiResponse({ status: 200, description: 'Project successfully deleted' })
  @ApiResponse({ status: 403, description: 'Unauthorized action' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<null>> {
    const userId = user.loginId;
    return this.projectsService.remove(id, userId);
  }

  // Member Management
  @Post(':id/members')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a user to the project' })
  @ApiResponse({ status: 201, description: 'Member added successfully' })
  @ApiResponse({ status: 403, description: 'Unauthorized action' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'User already project member' })
  addMember(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body() addMemberDto: AddMemberDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<ProjectMemberResponseDto>> {
    const userId = user.loginId;
    return this.projectsService.addMember(projectId, addMemberDto, userId);
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'List all members of a project' })
  @ApiResponse({ status: 200, description: 'Members retrieved successfully' })
  getMembers(
    @Param('id', ParseUUIDPipe) projectId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<ProjectMemberResponseDto[]>> {
    const userId = user.loginId;
    return this.projectsService.getMembers(projectId, userId);
  }

  @Delete(':id/members/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove a user from the project' })
  @ApiResponse({ status: 200, description: 'Member removed successfully' })
  @ApiResponse({ status: 403, description: 'Unauthorized action' })
  removeMember(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Param('userId', ParseUUIDPipe) memberUserId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<null>> {
    const userId = user.loginId;
    return this.projectsService.removeMember(projectId, memberUserId, userId);
  }
}
