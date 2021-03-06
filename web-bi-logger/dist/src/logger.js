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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BiLoggerClientFactory = exports.manager = exports.factory = exports.Factory = void 0;
var wix_bi_logger_client_1 = require("@wix/wix-bi-logger-client");
var consent_policy_client_accessor_1 = require("@wix/consent-policy-client-accessor");
var assert = __importStar(require("./lib/assert"));
var publishers_1 = require("./lib/publishers");
var common_config_1 = require("./lib/common-config");
var env_1 = require("./lib/env");
var types_1 = require("./types");
var event_defaults_1 = require("./lib/event-defaults");
var types_2 = require("./types");
Object.defineProperty(exports, "PublishMethods", {
    enumerable: true,
    get: function() {
        return types_2.PublishMethods;
    }
});
Object.defineProperty(exports, "EventCategories", {
    enumerable: true,
    get: function() {
        return types_2.EventCategories;
    }
});
var env_2 = require("./lib/env");
Object.defineProperty(exports, "setHost", {
    enumerable: true,
    get: function() {
        return env_2.setHost;
    }
});
var Factory = /** @class */ (function() {
    function Factory(options) {
        if (options === void 0) {
            options = {};
        }
        this.options = options;
        this.commonConfigGetter = function() {
            return undefined;
        };
        this.initialized = false;
        assert.ok(!options.publishMethod ||
            Object.keys(types_1.PublishMethods)
            .map(function(key) {
                return types_1.PublishMethods[key];
            })
            .indexOf(options.publishMethod) !== -1, "Unsupported publish method \"" + options.publishMethod + "\"");
        Factory.consentPolicyAccessor =
            Factory.consentPolicyAccessor || new consent_policy_client_accessor_1.ConsentPolicyAccessor();
        this.loggerClientFactory = wix_bi_logger_client_1.factory();
    }
    Factory.prototype.initFactory = function() {
        var _this = this;
        if (this.initialized) {
            return this.loggerClientFactory;
        }
        this.initialized = true;
        this.updateDefaults(event_defaults_1.getCommonDefaults(this.commonConfigGetter, Factory.consentPolicyAccessor));
        this.withUserContext(event_defaults_1.getUserDefaults());
        var options = __assign(__assign({}, this.options), {
            host: this.options.host || (function() {
                return env_1.getHost(common_config_1.getBrand(_this.commonConfigGetter));
            })
        });
        var publisher = publishers_1.getPublisher(options, this.publishFunctions);
        var _a = publishers_1.getTransformers(options, this.transformer),
            eventTransformer = _a.eventTransformer,
            payloadTransformer = _a.payloadTransformer;
        var baseFactory = this.loggerClientFactory
            .addPublisher(publisher)
            .withConsentPolicyGetter(function() {
                return Factory.consentPolicyAccessor.getCurrentConsentPolicy();
            });
        if (eventTransformer) {
            baseFactory.withEventTransformer(eventTransformer);
        }
        if (payloadTransformer) {
            baseFactory.withPayloadTransformer(payloadTransformer);
        }
        return baseFactory;
    };
    Factory.prototype.withTransformer = function(transformer) {
        assert.defined(transformer, 'Transformer must be provided');
        assert.ok(typeof transformer === 'function' ||
            (transformer &&
                typeof transformer[types_1.PublishMethods.PostMessage] === 'function'), 'Valid transformer must be provided');
        this.transformer = transformer;
        return this;
    };
    Factory.prototype.withPublishFunction = function(publishFunctions) {
        assert.defined(publishFunctions, 'Publish functions object must be provided');
        assert.ok(this.options.publishMethod &&
            this.options.publishMethod !== types_1.PublishMethods.Auto, 'Publish function can be used only when using a custom publish method');
        assert.ok(publishFunctions &&
            typeof publishFunctions[this.options.publishMethod] === 'function', 'Valid publish function must be provided');
        this.publishFunctions = publishFunctions;
        return this;
    };
    Factory.prototype.withUserContext = function(context) {
        assert.defined(context, 'User context object must be provided');
        this.updateDefaults(event_defaults_1.transformDefaults(context));
        return this;
    };
    Factory.prototype.withUoUContext = function(context) {
        assert.defined(context, 'UoU context object must be provided');
        this.updateDefaults(event_defaults_1.transformDefaults(context));
        return this;
    };
    Factory.prototype.withNonEssentialContext = function(context) {
        assert.defined(context, 'Non-essential context object must be provided');
        this.loggerClientFactory.updateNonEssentialDefaults(event_defaults_1.transformDefaults(context));
        return this;
    };
    Factory.prototype.withCommonConfigGetter = function(commonConfigGetter) {
        assert.defined(commonConfigGetter, 'Common config getter must be provided');
        assert.ok(typeof commonConfigGetter === 'function', 'Common config getter must be a function');
        this.commonConfigGetter = commonConfigGetter;
        return this;
    };
    Factory.prototype.updateDefaults = function(params) {
        this.loggerClientFactory.updateDefaults(params);
        return this;
    };
    Factory.prototype.setMuted = function(isMuted) {
        this.loggerClientFactory.setMuted(isMuted);
        return this;
    };
    Factory.prototype.setEvents = function(events) {
        this.loggerClientFactory.setEvents(events);
        return this;
    };
    Factory.prototype.onError = function(handler) {
        this.loggerClientFactory.setPublisherFailHandler(handler);
        return this;
    };
    Factory.prototype.logger = function(options) {
        if (options === void 0) {
            options = {};
        }
        var _a = this.options,
            endpoint = _a.endpoint,
            useBatch = _a.useBatch;
        var logger = this.initFactory().logger(__assign({
            endpoint: endpoint,
            useBatch: useBatch
        }, options));
        return logger;
    };
    return Factory;
}());
exports.Factory = Factory;
exports.factory = function(options) {
    if (options === void 0) {
        options = {};
    }
    return new Factory(options);
};
exports.manager = wix_bi_logger_client_1.manager;
exports.BiLoggerClientFactory = wix_bi_logger_client_1.BiLoggerFactory;
//# sourceMappingURL=logger.js.map