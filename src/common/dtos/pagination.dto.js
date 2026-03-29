"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResult = void 0;
var PaginationResult = /** @class */ (function () {
    function PaginationResult(data, totalRecord, currentPage, pageSize) {
        this.data = data;
        this.totalRecord = totalRecord;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }
    Object.defineProperty(PaginationResult.prototype, "totalPages", {
        get: function () {
            return Math.ceil(this.totalRecord / this.pageSize);
        },
        enumerable: false,
        configurable: true
    });
    return PaginationResult;
}());
exports.PaginationResult = PaginationResult;
