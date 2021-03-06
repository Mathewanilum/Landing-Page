"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCommonDefaults = exports.getUserDefaults = exports.transformDefaults = void 0;
var constants_1 = require("../constants");
var browser_1 = require("./browser");
var common_config_1 = require("./common-config");
var utils_1 = require("./utils");
exports.transformDefaults = function(context) {
    return Object.keys(context).reduce(function(res, key) {
        var mappedKey = constants_1.EventContextMap[key] || key;
        if (constants_1.EventContextMap[key] && typeof context[key] !== 'undefined') {
            res[mappedKey] = context[key];
        } else {
            res[key] = context[key];
        }
        return res;
    }, {});
};
exports.getUserDefaults = function() {
    return utils_1.getCookies({
        clientId: '_wixCIDX',
        uuid: {
            name: '_wixUIDX',
            transform: function(value) {
                return typeof value === 'string' && value.split('|')[1];
            },
        },
    });
};
exports.getCommonDefaults = function(commonConfigGetter, consentPolicyGetter) {
    return exports.transformDefaults({
        brandId: function() {
            return common_config_1.getBrand(commonConfigGetter);
        },
        siteBranchId: function() {
            return common_config_1.getBranchId(commonConfigGetter);
        },
        ms: function() {
            return Math.round(browser_1.now());
        },
        lv: constants_1.LoggerVersion,
    });
};
//# sourceMappingURL=event-defaults.js.map