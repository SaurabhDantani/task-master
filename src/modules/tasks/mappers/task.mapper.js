"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMapper = void 0;
var TaskMapper = /** @class */ (function () {
    function TaskMapper() {
    }
    TaskMapper.toTaskResponse = function (task) {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            columnId: task.columnId,
            assigneeId: task.assigneeId,
            priority: task.priority,
            dueDate: task.dueDate,
            position: task.position,
            createdAt: task.createdAt,
        };
    };
    TaskMapper.toTasksResponse = function (tasks) {
        var _this = this;
        return tasks.map(function (task) { return _this.toTaskResponse(task); });
    };
    return TaskMapper;
}());
exports.TaskMapper = TaskMapper;
