"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMemberResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var project_role_enum_js_1 = require("../../../common/enums/project-role.enum.js");
var ProjectMemberResponseDto = function () {
    var _a;
    var _memberId_decorators;
    var _memberId_initializers = [];
    var _memberId_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _joinedAt_decorators;
    var _joinedAt_initializers = [];
    var _joinedAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ProjectMemberResponseDto() {
                this.memberId = __runInitializers(this, _memberId_initializers, void 0);
                this.userId = (__runInitializers(this, _memberId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
                this.name = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.role = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.joinedAt = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _joinedAt_initializers, void 0));
                __runInitializers(this, _joinedAt_extraInitializers);
            }
            return ProjectMemberResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _memberId_decorators = [(0, swagger_1.ApiProperty)({
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    description: 'Unique identifier of the membership record',
                })];
            _userId_decorators = [(0, swagger_1.ApiProperty)({
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    description: 'UUID of the user',
                })];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    example: 'John Doe',
                    description: 'Name of the user (if joined)',
                })];
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    example: 'john@example.com',
                    description: 'Email form user (if joined)',
                })];
            _role_decorators = [(0, swagger_1.ApiProperty)({
                    enum: project_role_enum_js_1.ProjectRole,
                    example: project_role_enum_js_1.ProjectRole.MEMBER,
                    description: 'Role of the user in the project',
                })];
            _joinedAt_decorators = [(0, swagger_1.ApiProperty)({
                    example: '2024-03-09T10:00:00.000Z',
                    description: 'Date the user joined the project',
                })];
            __esDecorate(null, null, _memberId_decorators, { kind: "field", name: "memberId", static: false, private: false, access: { has: function (obj) { return "memberId" in obj; }, get: function (obj) { return obj.memberId; }, set: function (obj, value) { obj.memberId = value; } }, metadata: _metadata }, _memberId_initializers, _memberId_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _joinedAt_decorators, { kind: "field", name: "joinedAt", static: false, private: false, access: { has: function (obj) { return "joinedAt" in obj; }, get: function (obj) { return obj.joinedAt; }, set: function (obj, value) { obj.joinedAt = value; } }, metadata: _metadata }, _joinedAt_initializers, _joinedAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProjectMemberResponseDto = ProjectMemberResponseDto;
