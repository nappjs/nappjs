"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lib_1 = require('../../lib');
var MiddlewareTest3 = (function (_super) {
    __extends(MiddlewareTest3, _super);
    function MiddlewareTest3(test) {
        _super.call(this);
        this.blah = "hello " + test;
    }
    MiddlewareTest3.prototype.start = function (napp) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.blah += '...we just started';
        return null;
    };
    return MiddlewareTest3;
}(lib_1.NappJSService));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MiddlewareTest3;
//# sourceMappingURL=test3.js.map