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
                    if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
exports.createException = exports.RegistryError = exports.RegistryErrorCode = void 0;
var FetchError = 100;
var NoComponentsAtHostBundle = 201;
var NoComponentsAtComponentBundle = 202;
var NoRegistryOverrideForHost = 301;
var Unknown = -1;
exports.RegistryErrorCode = {
    FetchError: FetchError,
    NoComponentsAtHostBundle: NoComponentsAtHostBundle,
    NoComponentsAtComponentBundle: NoComponentsAtComponentBundle,
    Unknown: Unknown,
    NoRegistryOverrideForHost: NoRegistryOverrideForHost,
};
/**
 * NOTE: all error methods should be defined as the arrow functions
 * because of typescript issue when target is set `es5`
 */
var RegistryError = /** @class */ (function(_super) {
    __extends(RegistryError, _super);

    function RegistryError(message, code) {
        if (code === void 0) {
            code = Unknown;
        }
        var _this = this;
        var stack = ["Registry Error - \"" + code + "\"", message];
        _this = _super.call(this, stack.filter(function(m) {
            return !!m;
        }).join('\n')) || this;
        _this.name = _this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, RegistryError);
        }
        return _this;
    }
    return RegistryError;
}(Error));
exports.RegistryError = RegistryError;
var createException = function(code, message) {
    if (message === void 0) {
        message = '';
    }
    var e = new RegistryError(message, code);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(e, exports.createException);
    }
    return e;
};
exports.createException = createException;
//# sourceMappingURL=createException.js.map