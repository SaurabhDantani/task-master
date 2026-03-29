"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMapper = void 0;
var ProjectMapper = /** @class */ (function () {
    function ProjectMapper() {
    }
    ProjectMapper.toProjectResponse = function (entity) {
        if (!entity)
            return null;
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            ownerId: entity.ownerId,
            createdAt: entity.createdAt,
        };
    };
    ProjectMapper.toProjectsResponse = function (entities) {
        var _this = this;
        if (!entities)
            return [];
        return entities.map(function (entity) { return _this.toProjectResponse(entity); });
    };
    ProjectMapper.toProjectMemberResponse = function (entity) {
        var _a, _b;
        if (!entity)
            return null;
        return {
            memberId: entity.id,
            userId: entity.userId,
            name: (_a = entity.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = entity.user) === null || _b === void 0 ? void 0 : _b.email,
            role: entity.role,
            joinedAt: entity.joinedAt,
        };
    };
    ProjectMapper.toProjectMembersResponse = function (entities) {
        var _this = this;
        if (!entities)
            return [];
        return entities.map(function (entity) { return _this.toProjectMemberResponse(entity); });
    };
    return ProjectMapper;
}());
exports.ProjectMapper = ProjectMapper;
