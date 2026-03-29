import { Comment } from '../../../infrastructure/database/entities/comments.entity.js';
import { CommentResponseDto } from '../dto/comment-response.dto.js';

export class CommentMapper {
  static toCommentResponse(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      taskId: comment.taskId,
      userId: comment.userId,
      createdAt: comment.createdAt,
    };
  }

  static toCommentsResponse(comments: Comment[]): CommentResponseDto[] {
    return comments.map((comment) => this.toCommentResponse(comment));
  }
}
