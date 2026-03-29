"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonResponse = void 0;
var CommonResponse = /** @class */ (function () {
    function CommonResponse() {
    }
    CommonResponse.success = function (message) {
        return {
            status: true,
            message: message,
        };
    };
    CommonResponse.failure = function (message) {
        return {
            status: false,
            message: message,
        };
    };
    CommonResponse.successWithData = function (message, data) {
        var response = {
            status: true,
            message: message,
        };
        if (data !== undefined) {
            response.data = data;
        }
        return response;
    };
    return CommonResponse;
}());
exports.CommonResponse = CommonResponse;
