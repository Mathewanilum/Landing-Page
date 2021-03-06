"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postMessageTransport = exports.xhrTransport = exports.fetchTransport = exports.pixelTransport = exports.beaconTransport = void 0;
var browser_1 = require("./browser");
var errors_1 = require("./errors");

function beaconTransport(url, params, sendInBody) {
    if (sendInBody === void 0) {
        sendInBody = false;
    }
    return new Promise(function(resolve, reject) {
        return browser_1.sendBeacon(url, sendInBody ? JSON.stringify(params) : undefined) ?
            resolve() :
            reject(new Error('Transport Error: Cannot send bi using beacon'));
    });
}
exports.beaconTransport = beaconTransport;

function pixelTransport(url, image) {
    return new Promise(function(resolve, reject) {
        var biImage = image || new window.Image(0, 0);
        biImage.onload = function() {
            return resolve();
        };
        biImage.onerror = function() {
            return reject(new Error('Transport Error: Cannot send bi using pixel'));
        };
        biImage.src = url;
    });
}
exports.pixelTransport = pixelTransport;

function fetchTransport(url, params, method, fetchFunction) {
    if (method === void 0) {
        method = 'GET';
    }
    if (typeof fetchFunction === 'undefined') {
        if (typeof fetch === 'undefined') {
            return Promise.reject(new errors_1.APINotSupportedError('fetch'));
        }
        fetchFunction = fetch;
    }
    var options = {
        method: method,
        credentials: 'include',
    };
    if (method === 'POST') {
        options.body = JSON.stringify(params);
    } else {
        options.keepalive = true;
    }
    return fetchFunction(url, options).then(function(response) {
        if (!response.ok) {
            throw Error("Transport Error: Cannot send bi using fetch. Status: " + response.status);
        }
    });
}
exports.fetchTransport = fetchTransport;

function xhrTransport(url, params, method) {
    if (method === void 0) {
        method = 'GET';
    }
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, "" + location.protocol + url);
        xhr.onload = resolve;
        xhr.onerror = function() {
            reject(new Error("Transport Error: Cannot send bi using xhr."));
        };
        xhr.withCredentials = true;
        if (method === 'POST') {
            xhr.send(JSON.stringify(params));
        } else {
            xhr.send();
        }
    });
}
exports.xhrTransport = xhrTransport;

function postMessageTransport(message, postMesasage) {
    if (postMesasage === void 0) {
        postMesasage = self.postMessage;
    }
    var messageArgs = [message];
    // when not in a web worker...
    if (typeof WorkerGlobalScope === 'undefined') {
        messageArgs.push('*');
    }
    return postMesasage.apply(self, messageArgs);
}
exports.postMessageTransport = postMessageTransport;
//# sourceMappingURL=transport.js.map