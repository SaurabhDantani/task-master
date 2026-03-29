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
exports.BoardsDetailsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_js_1 = require("../../common/guards/jwt-auth.guard.js");
var swagger_1 = require("@nestjs/swagger");
var BoardsDetailsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Boards'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('boards'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var BoardsDetailsController = _classThis = /** @class */ (function () {
        function BoardsDetailsController_1(boardsService) {
            this.boardsService = (__runInitializers(this, _instanceExtraInitializers), boardsService);
        }
        BoardsDetailsController_1.prototype.findOne = function (boardId, user) {
            return this.boardsService.getBoardById(boardId, user.loginId);
        };
        BoardsDetailsController_1.prototype.update = function (boardId, updateBoardDto, user) {
            return this.boardsService.updateBoard(boardId, updateBoardDto, user.loginId);
        };
        BoardsDetailsController_1.prototype.remove = function (boardId, user) {
            return this.boardsService.deleteBoard(boardId, user.loginId);
        };
        return BoardsDetailsController_1;
    }());
    __setFunctionName(_classThis, "BoardsDetailsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findOne_decorators = [(0, common_1.Get)(':boardId'), (0, swagger_1.ApiOperation)({ summary: 'Get details of a specific board' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Board retrieved successfully' })];
        _update_decorators = [(0, common_1.Patch)(':boardId'), (0, swagger_1.ApiOperation)({ summary: 'Update board details' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Board updated successfully' })];
        _remove_decorators = [(0, common_1.Delete)(':boardId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Delete a board' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Board deleted successfully' })];
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BoardsDetailsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BoardsDetailsController = _classThis;
}();
exports.BoardsDetailsController = BoardsDetailsController;
