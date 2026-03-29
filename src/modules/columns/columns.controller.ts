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
import { ColumnsService } from './columns.service.js';
import { CreateColumnDto } from './dto/create-column.dto.js';
import { UpdateColumnDto } from './dto/update-column.dto.js';
import { ReorderColumnDto } from './dto/reorder-column.dto.js';
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

@ApiTags('Columns')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtAuthGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post('boards/:boardId/columns')
  @ApiOperation({ summary: 'Create a new column' })
  @ApiResponse({ status: 201, description: 'Column created successfully' })
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createColumnDto: CreateColumnDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.columnsService.create(boardId, createColumnDto, user.loginId);
  }

  @Get('boards/:boardId/columns')
  @ApiOperation({ summary: 'Get all columns for a board' })
  @ApiResponse({ status: 200, description: 'Columns retrieved successfully' })
  findAll(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.columnsService.findAllByBoardId(boardId, user.loginId);
  }

  @Patch('columns/:columnId')
  @ApiOperation({ summary: 'Update a column' })
  @ApiResponse({ status: 200, description: 'Column updated successfully' })
  update(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.columnsService.update(columnId, updateColumnDto, user.loginId);
  }

  @Patch('boards/:boardId/columns/reorder')
  @ApiOperation({ summary: 'Reorder columns in a board' })
  @ApiResponse({ status: 200, description: 'Columns reordered successfully' })
  reorder(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() reorderColumnDto: ReorderColumnDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.columnsService.reorder(boardId, reorderColumnDto, user.loginId);
  }

  @Delete('columns/:columnId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a column' })
  @ApiResponse({ status: 200, description: 'Column deleted successfully' })
  remove(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.columnsService.delete(columnId, user.loginId);
  }
}
