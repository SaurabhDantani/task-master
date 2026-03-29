import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service.js';
import { CreateBoardDto } from './dto/create-board.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import { BoardResponseDto } from './dto/board-response.dto.js';
// import { PaginationResult } from 'src/common/dtos/pagination.dto.js';
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

@ApiTags('Boards')
@ApiBearerAuth()
@Controller('projects/:projectId/boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new board in a project' })
  @ApiResponse({ status: 201, description: 'Board created successfully' })
  create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() createBoardDto: CreateBoardDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<BoardResponseDto>> {
    return this.boardsService.create(projectId, createBoardDto, user.loginId);
  }

  @Get()
  @ApiOperation({ summary: 'List all boards for a project' })
  @ApiResponse({ status: 200, description: 'Boards retrieved successfully' })
  findAll(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<BoardResponseDto[]>> {
    return this.boardsService.findAll(projectId, user.loginId);
  }
}
