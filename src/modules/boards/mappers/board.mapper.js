"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMapper = void 0;
var board_response_dto_js_1 = require("../dto/board-response.dto.js");
var BoardMapper = /** @class */ (function () {
    function BoardMapper() {
    }
    BoardMapper.toBoardResponse = function (board) {
        var dto = new board_response_dto_js_1.BoardResponseDto();
        dto.id = board.id;
        dto.name = board.name;
        dto.projectId = board.projectId;
        dto.createdAt = board.createdAt;
        return dto;
    };
    BoardMapper.toBoardsResponse = function (boards) {
        var _this = this;
        return boards.map(function (board) { return _this.toBoardResponse(board); });
    };
    return BoardMapper;
}());
exports.BoardMapper = BoardMapper;
