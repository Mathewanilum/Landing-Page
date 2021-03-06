"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var policy_1 = require("../lib/policy");
var ConfigStorage = /** @class */ (function() {
    function ConfigStorage(getConsentPolicy, getCommonConfig) {
        this.getConsentPolicy = getConsentPolicy;
        this.getCommonConfig = getCommonConfig;
    }
    ConfigStorage.prototype.isAllowed = function() {
        if (!policy_1.isPolicyAllowsBsi(this.getPolicy())) {
            this.destroy();
            return false;
        }
        return true;
    };
    ConfigStorage.prototype.call = function(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var config = this.getCommonConfig();
        return (config &&
            typeof config[method] === 'function' && config[method].apply(config, args));
    };
    ConfigStorage.prototype.getPolicy = function() {
        var policy = this.call('get', 'consentPolicy');
        if (policy) {
            return {
                policy: policy
            };
        }
        return typeof this.getConsentPolicy === 'function' ?
            this.getConsentPolicy() :
            null;
    };
    ConfigStorage.prototype.get = function() {
        if (!this.isAllowed()) {
            return null;
        }
        return this.call('get', 'bsi') || null;
    };
    ConfigStorage.prototype.set = function(bsi) {
        if (!this.isAllowed()) {
            return null;
        }
        this.call('set', 'bsi', bsi);
        return bsi;
    };
    ConfigStorage.prototype.subscribe = function(handler) {
        var _this = this;
        this.call('subscribe', function() {
            var bsi = _this.call('get', 'bsi');
            if (bsi !== _this.bsi) {
                _this.bsi = bsi;
                handler(bsi);
            }
        });
        return this;
    };
    ConfigStorage.prototype.destroy = function() {
        this.call('set', 'bsi', null);
    };
    return ConfigStorage;
}());
exports.ConfigStorage = ConfigStorage;
//# sourceMappingURL=config-storage.js.map