"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnMapper = void 0;
var column_response_dto_js_1 = require("../dto/column-response.dto.js");
var ColumnMapper = /** @class */ (function () {
    function ColumnMapper() {
    }
    ColumnMapper.toColumnResponse = function (column) {
        var dto = new column_response_dto_js_1.ColumnResponseDto();
        dto.id = column.id;
        dto.name = column.name;
        dto.boardId = column.boardId;
        dto.position = column.position;
        return dto;
    };
    ColumnMapper.toColumnsResponse = function (columns) {
        var _this = this;
        return columns.map(function (column) { return _this.toColumnResponse(column); });
    };
    return ColumnMapper;
}());
exports.ColumnMapper = ColumnMapper;
