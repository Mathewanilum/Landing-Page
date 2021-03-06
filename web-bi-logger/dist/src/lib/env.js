"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGlobal = exports.getWindowIfTop = exports.isBackoffice = exports.isWebWorker = exports.getHost = exports.setHost = void 0;
var constants_1 = require("../constants");
var host, hostByDomain;

function setHost(_host) {
    host = _host;
}
exports.setHost = setHost;

function getHost(brand) {
    if (brand === void 0) {
        brand = constants_1.DefaultBrand;
    }
    if (host) {
        return host;
    }
    var hostByDomainOrBrand = '';
    if (typeof hostByDomain === 'undefined') {
        hostByDomain = getGlobal(function(window) {
            if (!window.location || !window.location.hostname) {
                return null;
            }
            var _a = window.location.hostname.match(/\.(wix|editorx)\.com$/) || [],
                domain = _a[1];
            return domain || null;
        }, null);
    }
    hostByDomainOrBrand =
        hostByDomain || constants_1.BrandToHostMap[brand] || constants_1.BrandToHostMap[constants_1.DefaultBrand];
    return "frog." + hostByDomainOrBrand + ".com";
}
exports.getHost = getHost;

function isWebWorker() {
    /* global WorkerGlobalScope */
    //At the moment, this is the most reliable way of detecting if current code is run in a worker
    //Taken from here: https://stackoverflow.com/a/18002694
    return (typeof WorkerGlobalScope !== 'undefined' &&
        self instanceof WorkerGlobalScope);
}
exports.isWebWorker = isWebWorker;

function isBackoffice() {
    return getWindowIfTop(function(_a) {
        var document = _a.document;
        return constants_1.BackofficeDomains.some(function(domain) {
            return document.location.host.indexOf(domain) !== -1;
        });
    });
}
exports.isBackoffice = isBackoffice;
/**
 * Provides a window object to the callback iff current window is the topmost one
 * Otherwise returns null
 */
function getWindowIfTop(cb) {
    if (typeof window !== 'undefined' && window) {
        try {
            return window.top === window.self ? (cb ? cb(window) : window) : null;
        } catch (e) {
            return null;
        }
    }
    return null;
}
exports.getWindowIfTop = getWindowIfTop;

function getGlobal(cb, defaultValue) {
    if (defaultValue === void 0) {
        defaultValue = null;
    }
    if (typeof self !== 'undefined' && self) {
        return cb(self) || defaultValue;
    }
    return defaultValue;
}
exports.getGlobal = getGlobal;
//# sourceMappingURL=env.js.map