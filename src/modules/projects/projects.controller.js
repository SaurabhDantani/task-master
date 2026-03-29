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
exports.ProjectsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
var swagger_1 = require("@nestjs/swagger");
var ProjectsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Projects'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('projects'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _addMember_decorators;
    var _getMembers_decorators;
    var _removeMember_decorators;
    var ProjectsController = _classThis = /** @class */ (function () {
        function ProjectsController_1(projectsService) {
            this.projectsService = (__runInitializers(this, _instanceExtraInitializers), projectsService);
        }
        ProjectsController_1.prototype.create = function (createProjectDto, user) {
            var userId = user.loginId;
            return this.projectsService.create(createProjectDto, userId);
        };
        ProjectsController_1.prototype.findAll = function (user) {
            var userId = user.loginId;
            return this.projectsService.findAll(userId);
        };
        ProjectsController_1.prototype.findOne = function (id, user) {
            var userId = user.loginId;
            return this.projectsService.findOne(id, userId);
        };
        ProjectsController_1.prototype.update = function (id, updateProjectDto, user) {
            var userId = user.loginId;
            return this.projectsService.update(id, updateProjectDto, userId);
        };
        ProjectsController_1.prototype.remove = function (id, user) {
            var userId = user.loginId;
            return this.projectsService.remove(id, userId);
        };
        // Member Management
        ProjectsController_1.prototype.addMember = function (projectId, addMemberDto, user) {
            var userId = user.loginId;
            return this.projectsService.addMember(projectId, addMemberDto, userId);
        };
        ProjectsController_1.prototype.getMembers = function (projectId, user) {
            var userId = user.loginId;
            return this.projectsService.getMembers(projectId, userId);
        };
        ProjectsController_1.prototype.removeMember = function (projectId, memberUserId, user) {
            var userId = user.loginId;
            return this.projectsService.removeMember(projectId, memberUserId, userId);
        };
        return ProjectsController_1;
    }());
    __setFunctionName(_classThis, "ProjectsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a new project' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Project created successfully' })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'List all projects for the logged-in user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Projects retrieved successfully' })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get details of a specific project' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Project details retrieved successfully',
            }), (0, swagger_1.ApiResponse)({ status: 403, description: 'User not member of project' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' })];
        _update_decorators = [(0, common_1.Patch)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update project details' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Project successfully updated' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Unauthorized action' })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Delete a project completely' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Project successfully deleted' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Unauthorized action' })];
        _addMember_decorators = [(0, common_1.Post)(':id/members'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Add a user to the project' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Member added successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Unauthorized action' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'User already project member' })];
        _getMembers_decorators = [(0, common_1.Get)(':id/members'), (0, swagger_1.ApiOperation)({ summary: 'List all members of a project' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Members retrieved successfully' })];
        _removeMember_decorators = [(0, common_1.Delete)(':id/members/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Remove a user from the project' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Member removed successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Unauthorized action' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addMember_decorators, { kind: "method", name: "addMember", static: false, private: false, access: { has: function (obj) { return "addMember" in obj; }, get: function (obj) { return obj.addMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMembers_decorators, { kind: "method", name: "getMembers", static: false, private: false, access: { has: function (obj) { return "getMembers" in obj; }, get: function (obj) { return obj.getMembers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeMember_decorators, { kind: "method", name: "removeMember", static: false, private: false, access: { has: function (obj) { return "removeMember" in obj; }, get: function (obj) { return obj.removeMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectsController = _classThis;
}();
exports.ProjectsController = ProjectsController;
