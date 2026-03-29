"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriority = void 0;
var TaskPriority;
(function (TaskPriority) {
    TaskPriority[TaskPriority["LOW"] = 1] = "LOW";
    TaskPriority[TaskPriority["MEDIUM"] = 2] = "MEDIUM";
    TaskPriority[TaskPriority["HIGH"] = 3] = "HIGH";
    TaskPriority[TaskPriority["CRITICAL"] = 4] = "CRITICAL";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
