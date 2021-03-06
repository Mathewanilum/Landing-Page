"use strict";
var __assign = (this && this.__assign) || function() {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTransformers = exports.getPublisher = exports.postMessagePublisher = exports.xhrPublisher = exports.fetchPublisher = exports.beaconPublisher = exports.imagePublisher = exports.resolvePublisher = void 0;
var utils_1 = require("./utils");
var env_1 = require("./env");
var errors_1 = require("./errors");
var types_1 = require("../types");
var transport_1 = require("./transport");
var getHttpMethod = function(context) {
    return context.useBatch ? 'POST' : 'GET';
};
exports.resolvePublisher = function(options, publishFunctions) {
    var publisherFactory;
    var publishFunction;
    if (options.publishMethod === types_1.PublishMethods.PostMessage) {
        publisherFactory = postMessagePublisher;
        publishFunction =
            publishFunctions && publishFunctions[types_1.PublishMethods.PostMessage];
    } else if (options.publishMethod === types_1.PublishMethods.Fetch) {
        publisherFactory = fetchPublisher;
        publishFunction =
            publishFunctions && publishFunctions[types_1.PublishMethods.Fetch];
    } else if (env_1.isWebWorker()) {
        publisherFactory = fetchPublisher;
    } else {
        publisherFactory = beaconPublisher;
    }
    return publisherFactory(options, publishFunction);
};

function imagePublisher(options) {
    if (options === void 0) {
        options = {};
    }
    return function image(params, context) {
        if (context === void 0) {
            context = {};
        }
        if (context.useBatch) {
            throw new errors_1.APINotSupportedError("Can't use image publisher to send batched events.");
        }
        var url = utils_1.buildBiUrl(options, params, context);
        return transport_1.pixelTransport(url, context.image);
    };
}
exports.imagePublisher = imagePublisher;

function beaconPublisher(options) {
    if (options === void 0) {
        options = {};
    }
    return function beacon(params, context) {
        if (context === void 0) {
            context = {};
        }
        var url = utils_1.buildBiUrl(options, params, context);
        return transport_1.beaconTransport(url, params, !!context.useBatch).catch(function() {
            var method = getHttpMethod(context);
            return context.useBatch ?
                transport_1.fetchTransport(url, params, method).catch(function(error) {
                    return error instanceof errors_1.APINotSupportedError ?
                        transport_1.xhrTransport(url, params, method) :
                        Promise.reject(error);
                }) :
                transport_1.pixelTransport(url, context.image);
        });
    };
}
exports.beaconPublisher = beaconPublisher;

function fetchPublisher(options, fetchFunction) {
    if (options === void 0) {
        options = {};
    }
    return function fetch(params, context) {
        if (context === void 0) {
            context = {};
        }
        var url = utils_1.buildBiUrl(options, params, context);
        var method = getHttpMethod(context);
        return transport_1.fetchTransport(url, params, method, fetchFunction).catch(function(error) {
            return error instanceof errors_1.APINotSupportedError ?
                transport_1.xhrTransport(url, params, method) :
                Promise.reject(error);
        });
    };
}
exports.fetchPublisher = fetchPublisher;

function xhrPublisher(options) {
    if (options === void 0) {
        options = {};
    }
    return function xhr(params, context) {
        if (context === void 0) {
            context = {};
        }
        var url = utils_1.buildBiUrl(options, params, context);
        var method = getHttpMethod(context);
        return transport_1.xhrTransport(url, params, method);
    };
}
exports.xhrPublisher = xhrPublisher;

function postMessagePublisher(options, publishFunction) {
    if (options === void 0) {
        options = {};
    }
    return function postMessage(params) {
        return transport_1.postMessageTransport(params, publishFunction);
    };
}
exports.postMessagePublisher = postMessagePublisher;

function getPublisher(options, publishFunctions) {
    return exports.resolvePublisher(options, publishFunctions);
}
exports.getPublisher = getPublisher;
exports.getTransformers = function(factoryOptions, transformer) {
    var _eventTransformer, _payloadTransformer;
    if (transformer) {
        if (typeof transformer !== 'function' &&
            transformer.postMessage &&
            factoryOptions.publishMethod === types_1.PublishMethods.PostMessage) {
            _payloadTransformer = transformer.postMessage;
        } else if (typeof transformer === 'function') {
            _eventTransformer = transformer;
        }
    }
    var eventTransformer = _eventTransformer;
    var payloadTransformer = function(params, publisherContext) {
        if (publisherContext.useBatch) {
            var getEndpoint_1 = function(context) {
                return ((context === null || context === void 0 ? void 0 : context.endpoint) ||
                    publisherContext.endpoint ||
                    factoryOptions.endpoint);
            };
            params.e = params.e.map(function(e) {
                var context = e.context,
                    event = __rest(e, ["context"]);
                var res = __assign(__assign({}, event), {
                    f: __assign(__assign({}, event.f), {
                        _rp: getEndpoint_1(context)
                    })
                });
                return res;
            });
        }
        return _payloadTransformer ? _payloadTransformer(params) : params;
    };
    return {
        eventTransformer: eventTransformer,
        payloadTransformer: payloadTransformer
    };
};
//# sourceMappingURL=publishers.js.map