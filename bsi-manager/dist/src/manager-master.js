"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var cookie_storage_1 = require("./storage/cookie-storage");
var config_storage_1 = require("./storage/config-storage");
var utils_1 = require("./lib/utils");
var MasterBsiManager = /** @class */ (function() {
    function MasterBsiManager() {
        this.initialized = false;
        this.session = null;
    }
    MasterBsiManager.create = function(api) {
        return new MasterBsiManager().init(api);
    };
    MasterBsiManager.prototype.createSession = function(pageNumber, bsi) {
        if (bsi === void 0) {
            bsi = this.api.genGuid();
        }
        this.session = {
            bsi: bsi,
            pageNumber: pageNumber,
            basePageNumber: 1,
            delta: pageNumber,
        };
        return this.session;
    };
    MasterBsiManager.prototype.readSession = function(pageNumber, bsiString) {
        if (!bsiString) {
            return null;
        }
        var _a = ("" + bsiString).split('|'),
            bsi = _a[0],
            pn = _a[1];
        return {
            bsi: bsi,
            pageNumber: pageNumber,
            basePageNumber: (this.session && this.session.basePageNumber) || parseInt(pn, 10) || 1,
            delta: (this.session && this.session.delta) || 1,
        };
    };
    MasterBsiManager.prototype.extend = function(_a) {
        var _this = this;
        var bsi = _a.bsi,
            pageNumber = _a.pageNumber,
            basePageNumber = _a.basePageNumber,
            delta = _a.delta,
            bsiString = _a.bsiString;
        var _b = this.cookie.set(bsi + "|" + (basePageNumber + pageNumber - delta)),
            newBsiString = _b.bsi,
            ttl = _b.ttl;
        this.session = this.readSession(pageNumber, newBsiString);
        // Update local commonConfig and trigger subscribers in slaves (only if the bsi string actually changed)
        if (newBsiString !== bsiString) {
            this.config.set(newBsiString);
            if (this.session) {
                this.session.bsiString = newBsiString;
            }
        }
        clearTimeout(this.timeout);
        if (ttl) {
            // Simulate activity after the cookie expires so we always have a valid bsi value
            this.timeout = setTimeout(function() {
                return _this.extend(_this.createSession(pageNumber));
            }, ttl);
        }
        return newBsiString;
    };
    MasterBsiManager.prototype.getAndExtend = function(pageNumber) {
        if (pageNumber === void 0) {
            pageNumber = 1;
        }
        var session = this.readSession(pageNumber, this.cookie.get() || this.config.get()) ||
            this.createSession(pageNumber);
        return this.extend(session);
    };
    MasterBsiManager.prototype.init = function(api) {
        utils_1.validateExternalApi(api, 'genGuid', 'getCommonConfig');
        this.api = api;
        this.config = new config_storage_1.ConfigStorage(this.api.getConsentPolicy, this.api.getCommonConfig);
        this.cookie = new cookie_storage_1.CookieStorage(this.config, this.api.getCookieReaderWriter);
        this.getAndExtend();
        this.initialized = true;
        return this;
    };
    MasterBsiManager.prototype.destroy = function() {
        clearTimeout(this.timeout);
    };
    MasterBsiManager.prototype.getBsi = function(pageNumber, _a) {
        if (pageNumber === void 0) {
            pageNumber = 1;
        }
        var extend = (_a === void 0 ? {
            extend: true
        } : _a).extend;
        if (!this.initialized) {
            throw new Error('bsiManager: please call init() first');
        }
        if (extend) {
            return this.getAndExtend(pageNumber);
        }
        return this.session && this.session.bsiString;
    };
    return MasterBsiManager;
}());
exports.MasterBsiManager = MasterBsiManager;
//# sourceMappingURL=manager-master.js.map