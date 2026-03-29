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
exports.TasksService = void 0;
var common_1 = require("@nestjs/common");
var project_role_enum_js_1 = require("../../common/enums/project-role.enum.js");
var task_entity_js_1 = require("../../infrastructure/database/entities/task.entity.js");
var task_mapper_js_1 = require("./mappers/task.mapper.js");
var api_response_js_1 = require("../../common/responses/api-response.js");
var TasksService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TasksService = _classThis = /** @class */ (function () {
        function TasksService_1(taskRepository, columnRepository, boardRepository, projectRepository) {
            this.taskRepository = taskRepository;
            this.columnRepository = columnRepository;
            this.boardRepository = boardRepository;
            this.projectRepository = projectRepository;
        }
        TasksService_1.prototype.verifyColumnAccess = function (columnId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var column, board, member;
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
                            return [4 /*yield*/, this.projectRepository.findMember(board.projectId, userId)];
                        case 3:
                            member = _a.sent();
                            if (!member) {
                                throw new common_1.ForbiddenException('User is not a member of this project');
                            }
                            return [2 /*return*/, { column: column, board: board, projectId: board.projectId, member: member }];
                    }
                });
            });
        };
        TasksService_1.prototype.verifyTaskAccess = function (taskId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var task, _a, projectId, member;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.taskRepository.findOne({ where: { id: taskId } })];
                        case 1:
                            task = _b.sent();
                            if (!task)
                                throw new common_1.NotFoundException('Task not found');
                            return [4 /*yield*/, this.verifyColumnAccess(task.columnId, userId)];
                        case 2:
                            _a = _b.sent(), projectId = _a.projectId, member = _a.member;
                            return [2 /*return*/, { task: task, projectId: projectId, member: member }];
                    }
                });
            });
        };
        TasksService_1.prototype.create = function (columnId, createTaskDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var existingTasks, position, task, savedTask;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyColumnAccess(columnId, userId)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.taskRepository.find({
                                    where: { columnId: columnId },
                                })];
                        case 2:
                            existingTasks = _a.sent();
                            position = existingTasks.length > 0
                                ? Math.max.apply(Math, existingTasks.map(function (t) { return t.position; })) + 1
                                : 1;
                            task = this.taskRepository.create(__assign(__assign({}, createTaskDto), { columnId: columnId, position: position }));
                            return [4 /*yield*/, this.taskRepository.save(task)];
                        case 3:
                            savedTask = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Task created successfully', task_mapper_js_1.TaskMapper.toTaskResponse(savedTask))];
                    }
                });
            });
        };
        TasksService_1.prototype.findAllByColumnId = function (columnId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var tasks;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyColumnAccess(columnId, userId)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.taskRepository.find({
                                    where: { columnId: columnId },
                                    order: { position: 'ASC' },
                                })];
                        case 2:
                            tasks = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Tasks retrieved successfully', task_mapper_js_1.TaskMapper.toTasksResponse(tasks))];
                    }
                });
            });
        };
        TasksService_1.prototype.findOne = function (taskId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var task;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyTaskAccess(taskId, userId)];
                        case 1:
                            task = (_a.sent()).task;
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Task retrieved successfully', task_mapper_js_1.TaskMapper.toTaskResponse(task))];
                    }
                });
            });
        };
        TasksService_1.prototype.update = function (taskId, updateTaskDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var task, updatedTask;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyTaskAccess(taskId, userId)];
                        case 1:
                            task = (_a.sent()).task;
                            if (updateTaskDto.title !== undefined) {
                                task.title = updateTaskDto.title;
                            }
                            if (updateTaskDto.description !== undefined) {
                                task.description = updateTaskDto.description;
                            }
                            if (updateTaskDto.priority !== undefined) {
                                task.priority = updateTaskDto.priority;
                            }
                            if (updateTaskDto.dueDate !== undefined) {
                                task.dueDate = updateTaskDto.dueDate;
                            }
                            return [4 /*yield*/, this.taskRepository.save(task)];
                        case 2:
                            updatedTask = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Task updated successfully', task_mapper_js_1.TaskMapper.toTaskResponse(updatedTask))];
                    }
                });
            });
        };
        TasksService_1.prototype.assignTask = function (taskId, assignTaskDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, task, projectId, isMember, updatedTask;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.verifyTaskAccess(taskId, userId)];
                        case 1:
                            _a = _b.sent(), task = _a.task, projectId = _a.projectId;
                            if (!assignTaskDto.userId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.projectRepository.findMember(projectId, assignTaskDto.userId)];
                        case 2:
                            isMember = _b.sent();
                            if (!isMember) {
                                throw new common_1.BadRequestException('Assignee is not a member of the project');
                            }
                            task.assigneeId = assignTaskDto.userId;
                            return [3 /*break*/, 4];
                        case 3:
                            task.assigneeId = null;
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.taskRepository.save(task)];
                        case 5:
                            updatedTask = _b.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Task assigned successfully', task_mapper_js_1.TaskMapper.toTaskResponse(updatedTask))];
                    }
                });
            });
        };
        TasksService_1.prototype.moveTask = function (taskId, moveTaskDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var task, targetColumnId, position, finalTask;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyTaskAccess(taskId, userId)];
                        case 1:
                            task = (_a.sent()).task;
                            // Check if new column exists and user has access
                            return [4 /*yield*/, this.verifyColumnAccess(moveTaskDto.targetColumnId, userId)];
                        case 2:
                            // Check if new column exists and user has access
                            _a.sent();
                            targetColumnId = moveTaskDto.targetColumnId, position = moveTaskDto.position;
                            return [4 /*yield*/, this.taskRepository.manager.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                                    var tasksInNewColumn, otherTasks, maxPosition, targetPosition, currentPos, _i, otherTasks_1, t, oldColumnTasks, remainingOldTasks, pos, _a, remainingOldTasks_1, t;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, manager.find(task_entity_js_1.Task, {
                                                    where: { columnId: targetColumnId },
                                                    order: { position: 'ASC' },
                                                })];
                                            case 1:
                                                tasksInNewColumn = _b.sent();
                                                otherTasks = tasksInNewColumn.filter(function (t) { return t.id !== taskId; });
                                                maxPosition = otherTasks.length + 1;
                                                targetPosition = Math.min(Math.max(1, position), maxPosition);
                                                currentPos = 1;
                                                _i = 0, otherTasks_1 = otherTasks;
                                                _b.label = 2;
                                            case 2:
                                                if (!(_i < otherTasks_1.length)) return [3 /*break*/, 5];
                                                t = otherTasks_1[_i];
                                                if (currentPos === targetPosition)
                                                    currentPos++;
                                                t.position = currentPos++;
                                                return [4 /*yield*/, manager.save(t)];
                                            case 3:
                                                _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                _i++;
                                                return [3 /*break*/, 2];
                                            case 5:
                                                // Update the moved task
                                                task.columnId = targetColumnId;
                                                task.position = targetPosition;
                                                return [4 /*yield*/, manager.save(task)];
                                            case 6:
                                                _b.sent();
                                                if (!(task.columnId !== targetColumnId)) return [3 /*break*/, 11];
                                                return [4 /*yield*/, manager.find(task_entity_js_1.Task, {
                                                        where: { columnId: task.columnId },
                                                        order: { position: 'ASC' },
                                                    })];
                                            case 7:
                                                oldColumnTasks = _b.sent();
                                                remainingOldTasks = oldColumnTasks.filter(function (t) { return t.id !== taskId; });
                                                pos = 1;
                                                _a = 0, remainingOldTasks_1 = remainingOldTasks;
                                                _b.label = 8;
                                            case 8:
                                                if (!(_a < remainingOldTasks_1.length)) return [3 /*break*/, 11];
                                                t = remainingOldTasks_1[_a];
                                                t.position = pos++;
                                                return [4 /*yield*/, manager.save(t)];
                                            case 9:
                                                _b.sent();
                                                _b.label = 10;
                                            case 10:
                                                _a++;
                                                return [3 /*break*/, 8];
                                            case 11: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.taskRepository.findOne({
                                    where: { id: taskId },
                                })];
                        case 4:
                            finalTask = _a.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.successWithData('Task moved successfully', task_mapper_js_1.TaskMapper.toTaskResponse(finalTask))];
                    }
                });
            });
        };
        TasksService_1.prototype.remove = function (taskId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, task, member;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.verifyTaskAccess(taskId, userId)];
                        case 1:
                            _a = _b.sent(), task = _a.task, member = _a.member;
                            if (member.role !== project_role_enum_js_1.ProjectRole.OWNER &&
                                member.role !== project_role_enum_js_1.ProjectRole.ADMIN) {
                                throw new common_1.ForbiddenException('You do not have permission to delete this task');
                            }
                            return [4 /*yield*/, this.taskRepository.manager.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                                    var columnId, remainingTasks, pos, _i, remainingTasks_1, t;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                columnId = task.columnId;
                                                return [4 /*yield*/, manager.remove(task)];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, manager.find(task_entity_js_1.Task, {
                                                        where: { columnId: columnId },
                                                        order: { position: 'ASC' },
                                                    })];
                                            case 2:
                                                remainingTasks = _a.sent();
                                                pos = 1;
                                                _i = 0, remainingTasks_1 = remainingTasks;
                                                _a.label = 3;
                                            case 3:
                                                if (!(_i < remainingTasks_1.length)) return [3 /*break*/, 6];
                                                t = remainingTasks_1[_i];
                                                t.position = pos++;
                                                return [4 /*yield*/, manager.save(t)];
                                            case 4:
                                                _a.sent();
                                                _a.label = 5;
                                            case 5:
                                                _i++;
                                                return [3 /*break*/, 3];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, api_response_js_1.CommonResponse.success('Task deleted successfully')];
                    }
                });
            });
        };
        return TasksService_1;
    }());
    __setFunctionName(_classThis, "TasksService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TasksService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TasksService = _classThis;
}();
exports.TasksService = TasksService;
