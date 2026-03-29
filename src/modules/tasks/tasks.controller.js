"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
var swagger_1 = require("@nestjs/swagger");
var TasksController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Tasks'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)(), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _assign_decorators;
    var _move_decorators;
    var _remove_decorators;
    var TasksController = _classThis = /** @class */ (function () {
        function TasksController_1(tasksService) {
            this.tasksService = (__runInitializers(this, _instanceExtraInitializers), tasksService);
        }
        TasksController_1.prototype.create = function (columnId, createTaskDto, user) {
            return this.tasksService.create(columnId, createTaskDto, user.loginId);
        };
        TasksController_1.prototype.findAll = function (columnId, user) {
            return this.tasksService.findAllByColumnId(columnId, user.loginId);
        };
        TasksController_1.prototype.findOne = function (taskId, user) {
            return this.tasksService.findOne(taskId, user.loginId);
        };
        TasksController_1.prototype.update = function (taskId, updateTaskDto, user) {
            return this.tasksService.update(taskId, updateTaskDto, user.loginId);
        };
        TasksController_1.prototype.assign = function (taskId, assignTaskDto, user) {
            return this.tasksService.assignTask(taskId, assignTaskDto, user.loginId);
        };
        TasksController_1.prototype.move = function (taskId, moveTaskDto, user) {
            return this.tasksService.moveTask(taskId, moveTaskDto, user.loginId);
        };
        TasksController_1.prototype.remove = function (taskId, user) {
            return this.tasksService.remove(taskId, user.loginId);
        };
        return TasksController_1;
    }());
    __setFunctionName(_classThis, "TasksController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('columns/:columnId/tasks'), (0, swagger_1.ApiOperation)({ summary: 'Create a new task' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Task created successfully' })];
        _findAll_decorators = [(0, common_1.Get)('columns/:columnId/tasks'), (0, swagger_1.ApiOperation)({ summary: 'Get all tasks for a column' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Tasks retrieved successfully' })];
        _findOne_decorators = [(0, common_1.Get)('tasks/:taskId'), (0, swagger_1.ApiOperation)({ summary: 'Get task details' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Task retrieved successfully' })];
        _update_decorators = [(0, common_1.Patch)('tasks/:taskId'), (0, swagger_1.ApiOperation)({ summary: 'Update a task' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Task updated successfully' })];
        _assign_decorators = [(0, common_1.Patch)('tasks/:taskId/assign'), (0, swagger_1.ApiOperation)({ summary: 'Assign task to user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Task assigned successfully' })];
        _move_decorators = [(0, common_1.Patch)('tasks/:taskId/move'), (0, swagger_1.ApiOperation)({ summary: 'Move task between columns' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Task moved successfully' })];
        _remove_decorators = [(0, common_1.Delete)('tasks/:taskId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Delete a task' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Task deleted successfully' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assign_decorators, { kind: "method", name: "assign", static: false, private: false, access: { has: function (obj) { return "assign" in obj; }, get: function (obj) { return obj.assign; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _move_decorators, { kind: "method", name: "move", static: false, private: false, access: { has: function (obj) { return "move" in obj; }, get: function (obj) { return obj.move; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TasksController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TasksController = _classThis;
}();
exports.TasksController = TasksController;
