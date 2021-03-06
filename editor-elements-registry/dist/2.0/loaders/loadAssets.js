"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadAssets = void 0;
var utils_1 = require("../utils");

function isCSSAssetLoaded(url) {
    return (
        // pre fetched (inlined) style tag
        document.querySelector("style[data-href=\"" + url + "\"]") !== null ||
        // normal CSS import
        document.querySelector("link[href=\"" + url + "\"]"));
}

function injectStyleTag(url) {
    return new Promise(function(resolve, reject) {
        var style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('type', 'text/css');
        style.setAttribute('href', url);
        style.addEventListener('load', function() {
            return resolve(url);
        });
        style.addEventListener('error', function(e) {
            return reject(e);
        });
        document.head.appendChild(style);
    });
}

function loadAssets(assets) {
    if (utils_1.isServer()) {
        return Promise.resolve();
    }
    return Promise.all(assets
        .filter(function(url) {
            return !isCSSAssetLoaded(url);
        })
        .map(function(url) {
            return injectStyleTag(url);
        }));
}
exports.loadAssets = loadAssets;
//# sourceMappingURL=loadAssets.js.map