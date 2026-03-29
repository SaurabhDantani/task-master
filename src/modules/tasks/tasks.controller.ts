import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { MoveTaskDto } from './dto/move-task.dto.js';
import { AssignTaskDto } from './dto/assign-task.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

interface JwtPayload {
  loginId: string;
  role: string;
}

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('columns/:columnId/tasks')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  create(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.create(columnId, createTaskDto, user.loginId);
  }

  @Get('columns/:columnId/tasks')
  @ApiOperation({ summary: 'Get all tasks for a column' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  findAll(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.findAllByColumnId(columnId, user.loginId);
  }

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get task details' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  findOne(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.findOne(taskId, user.loginId);
  }

  @Patch('tasks/:taskId')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.update(taskId, updateTaskDto, user.loginId);
  }

  @Patch('tasks/:taskId/assign')
  @ApiOperation({ summary: 'Assign task to user' })
  @ApiResponse({ status: 200, description: 'Task assigned successfully' })
  assign(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() assignTaskDto: AssignTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.assignTask(taskId, assignTaskDto, user.loginId);
  }

  @Patch('tasks/:taskId/move')
  @ApiOperation({ summary: 'Move task between columns' })
  @ApiResponse({ status: 200, description: 'Task moved successfully' })
  move(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() moveTaskDto: MoveTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.moveTask(taskId, moveTaskDto, user.loginId);
  }

  @Delete('tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  remove(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tasksService.remove(taskId, user.loginId);
  }
}
