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
exports.ColumnsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
var swagger_1 = require("@nestjs/swagger");
var ColumnsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Columns'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)(), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _update_decorators;
    var _reorder_decorators;
    var _remove_decorators;
    var ColumnsController = _classThis = /** @class */ (function () {
        function ColumnsController_1(columnsService) {
            this.columnsService = (__runInitializers(this, _instanceExtraInitializers), columnsService);
        }
        ColumnsController_1.prototype.create = function (boardId, createColumnDto, user) {
            return this.columnsService.create(boardId, createColumnDto, user.loginId);
        };
        ColumnsController_1.prototype.findAll = function (boardId, user) {
            return this.columnsService.findAllByBoardId(boardId, user.loginId);
        };
        ColumnsController_1.prototype.update = function (columnId, updateColumnDto, user) {
            return this.columnsService.update(columnId, updateColumnDto, user.loginId);
        };
        ColumnsController_1.prototype.reorder = function (boardId, reorderColumnDto, user) {
            return this.columnsService.reorder(boardId, reorderColumnDto, user.loginId);
        };
        ColumnsController_1.prototype.remove = function (columnId, user) {
            return this.columnsService.delete(columnId, user.loginId);
        };
        return ColumnsController_1;
    }());
    __setFunctionName(_classThis, "ColumnsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('boards/:boardId/columns'), (0, swagger_1.ApiOperation)({ summary: 'Create a new column' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Column created successfully' })];
        _findAll_decorators = [(0, common_1.Get)('boards/:boardId/columns'), (0, swagger_1.ApiOperation)({ summary: 'Get all columns for a board' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Columns retrieved successfully' })];
        _update_decorators = [(0, common_1.Patch)('columns/:columnId'), (0, swagger_1.ApiOperation)({ summary: 'Update a column' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Column updated successfully' })];
        _reorder_decorators = [(0, common_1.Patch)('boards/:boardId/columns/reorder'), (0, swagger_1.ApiOperation)({ summary: 'Reorder columns in a board' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Columns reordered successfully' })];
        _remove_decorators = [(0, common_1.Delete)('columns/:columnId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Delete a column' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Column deleted successfully' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reorder_decorators, { kind: "method", name: "reorder", static: false, private: false, access: { has: function (obj) { return "reorder" in obj; }, get: function (obj) { return obj.reorder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColumnsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColumnsController = _classThis;
}();
exports.ColumnsController = ColumnsController;
