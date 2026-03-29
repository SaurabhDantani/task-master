"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentMapper = void 0;
var CommentMapper = /** @class */ (function () {
    function CommentMapper() {
    }
    CommentMapper.toCommentResponse = function (comment) {
        return {
            id: comment.id,
            content: comment.content,
            taskId: comment.taskId,
            userId: comment.userId,
            createdAt: comment.createdAt,
        };
    };
    CommentMapper.toCommentsResponse = function (comments) {
        var _this = this;
        return comments.map(function (comment) { return _this.toCommentResponse(comment); });
    };
    return CommentMapper;
}());
exports.CommentMapper = CommentMapper;
