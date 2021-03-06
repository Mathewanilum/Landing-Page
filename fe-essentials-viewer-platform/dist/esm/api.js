import {
    __assign
} from "tslib";
import Experiments, {
    ReadOnlyExperiments,
} from './exports/experiments';
import {
    factory as biLoggerFactory
} from './exports/bi';
import {
    create as createFedopsLogger
} from './exports/fedops';
import Raven from './exports/raven-js';
import {
    createRavenClient,
} from './exports/error-monitor';
import {
    HttpClient
} from './exports/http-client';
export * from './types';
/**
 * Essentials for the Viewer platform
 */
var ViewerPlatformEssentials = /** @class */ (function() {
    function ViewerPlatformEssentials(env) {
        this.env = env;
        /**
         * A Fedops Logger factory
         */
        this.createFedopsLogger = createFedopsLogger;
        /**
         * A bi Logger and Factory for more loggers
         */
        this.biLoggerFactory = biLoggerFactory;
        this.env = env;
        this.experiments = new ReadOnlyExperiments({
            experiments: env.conductedExperiments,
        });
    }
    /**
     * Method for creating Essentials for an App
     * @param env
     */
    ViewerPlatformEssentials.prototype.createAppEssentials = function(env) {
        return new _AppEssentials({
            env: __assign(__assign({}, env), {
                platformEnv: this.env
            }),
            essentials: this,
        });
    };
    /**
     * Method for creating Essentials for a Controller
     * @param env
     */
    ViewerPlatformEssentials.prototype.createControllerEssentials = function(env, appEssentials) {
        return new _ControllerEssentials({
            // @ts-expect-error accessing TS-private field 😢
            env: __assign(__assign({}, env), {
                appEnv: appEssentials.env
            }),
            essentials: this,
            appEssentials: appEssentials,
        });
    };
    return ViewerPlatformEssentials;
}());
export {
    ViewerPlatformEssentials
};
/**
 * Essentials for Apps within the Viewer platform
 */
var _AppEssentials = /** @class */ (function() {
    function _AppEssentials(_a) {
        var _this = this;
        var env = _a.env;
        var _b, _c;
        /**
         * A bi Logger and Factory for more loggers
         */
        this.biLoggerFactory = function(options) {
            return _this.env.biLoggerFactory(options);
        };
        /**
         * An ErrorMonitor factory (@wix/error-monitor)
         */
        this.createErrorMonitor = function(options) {
            return createRavenClient(__assign({
                Raven: Raven
            }, options));
        };
        this.env = env;
        this.experiments = new ReadOnlyExperiments({
            experiments: (_c = (_b = this.env.platformEnv.appsConductedExperiments) === null || _b === void 0 ? void 0 : _b[env.appDefId]) !== null && _c !== void 0 ? _c : {},
        });
        this.httpClient = new HttpClient({
            isSSR: this.env.platformEnv.isSSR,
            getAppToken: function() {
                return env.platformEnv.getAppToken(env.appDefId);
            },
        });
    }
    /**
     * An Experiments object factory
     */
    _AppEssentials.prototype.createExperiments = function(_a) {
        var scopes = _a.scopes,
            _b = _a.useNewApi,
            useNewApi = _b === void 0 ? true : _b,
            baseUrl = _a.baseUrl,
            requestContext = _a.requestContext;
        return new Experiments({
            scopes: scopes,
            useNewApi: useNewApi,
            requestContext: requestContext,
            baseUrl: baseUrl
        });
    };
    return _AppEssentials;
}());
export {
    _AppEssentials
};
/**
 * Essentials for Controllers within the Viewer platform
 */
var _ControllerEssentials = /** @class */ (function() {
    function _ControllerEssentials(_a) {
        var _this = this;
        var env = _a.env,
            appEssentials = _a.appEssentials;
        /**
         * A bi Logger and Factory for more loggers
         */
        this.biLoggerFactory = function(options) {
            return _this.appEssentials.biLoggerFactory(options);
        };
        /**
         * An ErrorMonitor factory (@wix/error-monitor)
         */
        this.createErrorMonitor = function(options) {
            return _this.appEssentials.createErrorMonitor(options);
        };
        /**
         * An Experiments object factory
         */
        this.createExperiments = function(options) {
            return _this.appEssentials.createExperiments(options);
        };
        this.env = env;
        this.appEssentials = appEssentials;
        this.fedopsLogger = this.env.appEnv.getLoggerForWidget({
            appId: this.env.appEnv.appDefId,
            widgetId: this.env.widgetId,
        });
        this.experiments = this.appEssentials.experiments;
        this.httpClient = this.appEssentials.httpClient;
    }
    return _ControllerEssentials;
}());
export {
    _ControllerEssentials
};
//# sourceMappingURL=api.js.map