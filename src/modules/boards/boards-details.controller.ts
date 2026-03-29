import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service.js';
import { UpdateBoardDto } from './dto/update-board.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import { BoardResponseDto } from './dto/board-response.dto.js';
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
@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsDetailsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(':boardId')
  @ApiOperation({ summary: 'Get details of a specific board' })
  @ApiResponse({ status: 200, description: 'Board retrieved successfully' })
  findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<BoardResponseDto>> {
    return this.boardsService.getBoardById(boardId, user.loginId);
  }

  @Patch(':boardId')
  @ApiOperation({ summary: 'Update board details' })
  @ApiResponse({ status: 200, description: 'Board updated successfully' })
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<BoardResponseDto>> {
    return this.boardsService.updateBoard(
      boardId,
      updateBoardDto,
      user.loginId,
    );
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a board' })
  @ApiResponse({ status: 200, description: 'Board deleted successfully' })
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<CommonResponse<null>> {
    return this.boardsService.deleteBoard(boardId, user.loginId);
  }
}
