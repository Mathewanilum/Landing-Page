"use strict";
var __extends = (this && this.__extends) || (function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({
                    __proto__: []
                }
                instanceof Array && function(d, b) {
                    d.__proto__ = b;
                }) ||
            function(d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function(d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.APINotSupportedError = exports.AssertionError = void 0;
var AssertionError = /** @class */ (function(_super) {
    __extends(AssertionError, _super);

    function AssertionError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
var APINotSupportedError = /** @class */ (function(_super) {
    __extends(APINotSupportedError, _super);

    function APINotSupportedError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return APINotSupportedError;
}(Error));
exports.APINotSupportedError = APINotSupportedError;
//# sourceMappingURL=errors.js.map