"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readCookie = exports.sendBeacon = exports.getWindowSize = exports.getDesktopSize = exports.now = void 0;

function now() {
    return typeof performance !== 'undefined' && performance && performance.now ?
        performance.now() :
        -1;
}
exports.now = now;

function getDesktopSize(window) {
    var width = (window.screen && window.screen.width) || 0;
    var height = (window.screen && window.screen.height) || 0;
    return width + "x" + height;
}
exports.getDesktopSize = getDesktopSize;

function getWindowSize(window) {
    var width = 0;
    var height = 0;
    if (window.innerWidth) {
        width = window.innerWidth;
        height = window.innerHeight;
    } else if (window.document) {
        if (window.document.documentElement &&
            window.document.documentElement.clientWidth) {
            width = window.document.documentElement.clientWidth;
            height = window.document.documentElement.clientHeight;
        } else if (window.document.body && window.document.body.clientWidth) {
            width = window.document.body.clientWidth;
            height = window.document.body.clientHeight;
        }
    }
    return width + "x" + height;
}
exports.getWindowSize = getWindowSize;

function sendBeacon(url, data) {
    if (typeof navigator === 'undefined' || !navigator || !navigator.sendBeacon) {
        return false;
    }
    return navigator.sendBeacon(url, data);
}
exports.sendBeacon = sendBeacon;

function readCookie(cookieName) {
    if (typeof document === 'undefined') {
        return null;
    }
    var cookies = document.cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var pair = cookie.split('=');
        var name_1 = pair[0];
        var value = pair[1];
        while (name_1[0] === ' ') {
            name_1 = name_1.substr(1);
        }
        if (name_1 === cookieName) {
            return value;
        }
    }
    return '';
}
exports.readCookie = readCookie;
//# sourceMappingURL=browser.js.map