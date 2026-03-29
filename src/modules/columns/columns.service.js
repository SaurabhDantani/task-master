"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnsService = void 0;
var common_1 = require("@nestjs/common");
var project_role_enum_js_1 = require("../../common/enums/project-role.enum.js");
var columns_entity_js_1 = require("../../infrastructure/database/entities/columns.entity.js");
var task_entity_js_1 = require("../../infrastructure/database/entities/task.entity.js");
var column_mapper_js_1 = require("./mappers/column.mapper.js");
var api_response_js_1 = require("../../common/responses/api-response.js");
var ColumnsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ColumnsService = _classThis = /** @class */ (function () {
        function ColumnsService_1(columnRepository, taskRepository, boardRepository, projectRepository) {
            this.columnRepository = columnRepository;
            this.taskRepository = taskRepository;
            this.boardRepository = boardRepository;
            this.projectRepository = projectRepository;
        }
        ColumnsService_1.prototype.verifyProjectMembership = function (projectId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var project, member;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.projectRepository.findById(projectId)];
                        case 1:
                            project = _a.sent();
                            if (!project) {
                                throw new common_1.NotFoundException('Project not found');
                            }
                            return [4 /*yield*/, this.projectRepository.findMember(projectId, userId)];
                        case 2:
                            member = _a.sent();
                            if (!member) {
                                throw new common_1.ForbiddenException('User is not a member of this project');
                            }
                            return [2 /*return*/, member];
                    }
                });
            });
        };
        ColumnsService_1.prototype.create = function (boardId, createColumnDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var board, existingColumns, position, column, savedColumn;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.boardRepository.findById(boardId)];
                        case 1:
                            board = _a.sent();
                            if (!board)
                                throw new common_1.NotFoundException('Board not found');
                            return [4 /*yield*/, this.verifyProjectMembership(board.projectId, userId)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.columnRepository.find({
                                    where: { boardId: boardId },
                                })];
                        case 3:
                            existingColumns = _a.sent();
                            position = existingColumns.length > 0
                                ? Math.max.apply(Math, existingColumns.map(function (c) { return c.position; })) + 1
                                : 1;
                            column = this.columnRepository.create(__assign(__assign({}, createColumnDto), { boardId: boardId, position: position }));
                            return [4 /*yield*/, this.columnRepository.save(column)];
                        case 4:
                            savedColumn = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Column created successfully', column_mapper_js_1.ColumnMapper.toColumnResponse(savedColumn))];
                    }
                });
            });
        };
        ColumnsService_1.prototype.findAllByBoardId = function (boardId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var board, columns;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.boardRepository.findById(boardId)];
                        case 1:
                            board = _a.sent();
                            if (!board)
                                throw new common_1.NotFoundException('Board not found');
                            return [4 /*yield*/, this.verifyProjectMembership(board.projectId, userId)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.columnRepository.find({
                                    where: { boardId: boardId },
                                    order: { position: 'ASC' },
                                })];
                        case 3:
                            columns = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Columns retrieved successfully', column_mapper_js_1.ColumnMapper.toColumnsResponse(columns))];
                    }
                });
            });
        };
        ColumnsService_1.prototype.update = function (columnId, updateColumnDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var column, board, member, updatedColumn;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.columnRepository.findOne({
                                where: { id: columnId },
                            })];
                        case 1:
                            column = _a.sent();
                            if (!column)
                                throw new common_1.NotFoundException('Column not found');
                            return [4 /*yield*/, this.boardRepository.findById(column.boardId)];
                        case 2:
                            board = _a.sent();
                            if (!board)
                                throw new common_1.NotFoundException('Board not found');
                            return [4 /*yield*/, this.verifyProjectMembership(board.projectId, userId)];
                        case 3:
                            member = _a.sent();
                            if (member.role !== project_role_enum_js_1.ProjectRole.OWNER &&
                                member.role !== project_role_enum_js_1.ProjectRole.ADMIN) {
                                throw new common_1.ForbiddenException('You do not have permission to update this column');
                            }
                            if (updateColumnDto.name !== undefined) {
                                column.name = updateColumnDto.name;
                            }
                            return [4 /*yield*/, this.columnRepository.save(column)];
                        case 4:
                            updatedColumn = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Column updated successfully', column_mapper_js_1.ColumnMapper.toColumnResponse(updatedColumn))];
                    }
                });
            });
        };
        ColumnsService_1.prototype.reorder = function (boardId, reorderColumnDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var board, columnOrder, columns, columnIds, isValidOrder;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.boardRepository.findById(boardId)];
                        case 1:
                            board = _a.sent();
                            if (!board)
                                throw new common_1.NotFoundException('Board not found');
                            return [4 /*yield*/, this.verifyProjectMembership(board.projectId, userId)];
                        case 2:
                            _a.sent();
                            columnOrder = reorderColumnDto.columnOrder;
                            return [4 /*yield*/, this.columnRepository.find({
                                    where: { boardId: boardId },
                                })];
                        case 3:
                            columns = _a.sent();
                            columnIds = columns.map(function (c) { return c.id; });
                            isValidOrder = columnOrder.length === columns.length &&
                                columnOrder.every(function (id) { return columnIds.includes(id); });
                            if (!isValidOrder) {
                                throw new common_1.NotFoundException('Invalid column order');
                            }
                            return [4 /*yield*/, this.columnRepository.manager.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                                    var i;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                i = 0;
                                                _a.label = 1;
                                            case 1:
                                                if (!(i < columnOrder.length)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, manager.update(columns_entity_js_1.ColumnEntity, columnOrder[i], {
                                                        position: i + 1,
                                                    })];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3:
                                                i++;
                                                return [3 /*break*/, 1];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.findAllByBoardId(boardId, userId)];
                    }
                });
            });
        };
        ColumnsService_1.prototype.delete = function (columnId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var column, boardId, board, member;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.columnRepository.findOne({
                                where: { id: columnId },
                            })];
                        case 1:
                            column = _a.sent();
                            if (!column)
                                throw new common_1.NotFoundException('Column not found');
                            boardId = column.boardId;
                            return [4 /*yield*/, this.boardRepository.findById(boardId)];
                        case 2:
                            board = _a.sent();
                            if (!board)
                                throw new common_1.NotFoundException('Board not found');
                            return [4 /*yield*/, this.verifyProjectMembership(board.projectId, userId)];
                        case 3:
                            member = _a.sent();
                            if (member.role !== project_role_enum_js_1.ProjectRole.OWNER &&
                                member.role !== project_role_enum_js_1.ProjectRole.ADMIN) {
                                throw new common_1.ForbiddenException('You do not have permission to delete this column');
                            }
                            return [4 /*yield*/, this.columnRepository.manager.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                                    var remainingColumns, pos, _i, remainingColumns_1, col;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, manager.delete(task_entity_js_1.Task, { columnId: columnId })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, manager.delete(columns_entity_js_1.ColumnEntity, { id: columnId })];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, manager.find(columns_entity_js_1.ColumnEntity, {
                                                        where: { boardId: boardId },
                                                        order: { position: 'ASC' },
                                                    })];
                                            case 3:
                                                remainingColumns = _a.sent();
                                                pos = 1;
                                                _i = 0, remainingColumns_1 = remainingColumns;
                                                _a.label = 4;
                                            case 4:
                                                if (!(_i < remainingColumns_1.length)) return [3 /*break*/, 7];
                                                col = remainingColumns_1[_i];
                                                col.position = pos++;
                                                return [4 /*yield*/, manager.save(col)];
                                            case 5:
                                                _a.sent();
                                                _a.label = 6;
                                            case 6:
                                                _i++;
                                                return [3 /*break*/, 4];
                                            case 7: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.success('Column deleted successfully')];
                    }
                });
            });
        };
        return ColumnsService_1;
    }());
    __setFunctionName(_classThis, "ColumnsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColumnsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColumnsService = _classThis;
}();
exports.ColumnsService = ColumnsService;
