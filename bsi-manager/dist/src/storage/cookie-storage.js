"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var config_1 = require("../config");
var policy_1 = require("../lib/policy");
var utils_1 = require("../lib/utils");
var cookieDomain;
var cookiePath = '/';
var extractWixDomain = function() {
    return config_1.WIX_DOMAINS.reduce(function(res, domain) {
        if (!res && window.document.location.hostname.indexOf(domain) !== -1) {
            return domain;
        }
        return res;
    }, null);
};
var getCookieDomain = function() {
    if (!cookieDomain) {
        var wixDomain = extractWixDomain();
        cookieDomain = wixDomain || window.document.location.hostname;
    }
    return cookieDomain;
};
var CookieStorage = /** @class */ (function() {
    function CookieStorage(configStorage, getCookieReaderWriter) {
        if (getCookieReaderWriter === void 0) {
            getCookieReaderWriter = function() {
                return ({
                    read: utils_1.readCookie,
                    write: utils_1.writeCookie,
                    destroy: utils_1.destroyCookie,
                });
            };
        }
        this.configStorage = configStorage;
        this.getCookieReaderWriter = getCookieReaderWriter;
    }
    CookieStorage.prototype.isAllowed = function() {
        if (!policy_1.isPolicyAllowsBsi(this.configStorage.getPolicy())) {
            this.destroy();
            return false;
        }
        return true;
    };
    CookieStorage.prototype.get = function() {
        if (!this.isAllowed()) {
            return null;
        }
        return this.getCookieReaderWriter().read(config_1.COOKIE_NAME);
    };
    CookieStorage.prototype.set = function(bsi) {
        if (!this.isAllowed()) {
            return {
                bsi: null,
                ttl: null
            };
        }
        var now = Date.now();
        var expires = Math.min(now + config_1.SESSION_DURATION, utils_1.getNextLocalMidnight());
        var domain = getCookieDomain();
        this.getCookieReaderWriter().write(config_1.COOKIE_NAME, "" + bsi, expires, cookiePath, domain);
        return {
            bsi: bsi,
            ttl: expires - now
        };
    };
    CookieStorage.prototype.destroy = function() {
        this.getCookieReaderWriter().destroy(config_1.COOKIE_NAME, cookiePath, getCookieDomain());
        // Destroy local storage items set by the old bsi implementation in Santa
        try {
            window.localStorage.removeItem('beatSessionTs');
            window.localStorage.removeItem('beatSessionId');
        } catch (e) {}
    };
    return CookieStorage;
}());
exports.CookieStorage = CookieStorage;
//# sourceMappingURL=cookie-storage.js.map