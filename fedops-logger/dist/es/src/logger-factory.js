function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

import {
    presetLoader
} from '@wix/fedops-presets';
import {
    env,
    hasSendBeacon,
    sendBeacon
} from './env';
import {
    DEFAULT_APP_VERSION
} from './conf';
import {
    create as createReporter
} from './reporter/reporter-factory';
import BaseLogger from './base-logger';
import {
    initializeGlobal,
    setLoadStartTime,
    setSessionId
} from './global-app-data/global-app-data';
import sessionManager from './session-manager/session-manager';
import performance from './performance/performance';
import {
    phasesConfigValues
} from './loading-phases/loading-phases-config';
import {
    CookieOverrides
} from './cookie-overrides';

function getAppVersion() {
    return env().__CI_APP_VERSION__ || DEFAULT_APP_VERSION;
}
/*
 * @param baseUrl
 * @param appId
 * @param disableAutoLoadFinish
 * @param interactionTimeout
 * @param timeoutHook
 * @param startHook
 * @param endHook
 * @param biLoggerFactory
 * @param endpoint
 * @param endpoint artifactData
 */

/**
 * @param {string} appName
 */


export function create(appName, params) {
    if (params === void 0) {
        params = {};
    }

    if (!appName) {
        return null;
    }

    var appNameWithoutDots = appName.replace(/\./g, '-').toLowerCase();
    initializeGlobal(appNameWithoutDots);

    var fullParams = _objectSpread(_objectSpread({}, params), {}, {
        preset: presetLoader(params.presetType)
    });

    var reporter = createReporter(fullParams);
    return new BaseLogger(appNameWithoutDots, getAppVersion(), reporter, fullParams);
}
/**
 * Report application started loading
 * @param {string} appName Application/Dashboard name
 * @param {{artifactData}} artifact data
 */

export function reportAppLoadStarted(appName, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        artifactData = _ref.artifactData,
        presetType = _ref.presetType,
        isPersistent = _ref.isPersistent,
        paramsOverrides = _ref.paramsOverrides;

    initializeGlobal(appName);
    setLoadStartTime(appName, performance.responseEndTime() || performance.now());
    var sessionId = sessionManager.getSessionId();
    setSessionId(sessionId);
    var preset = presetLoader(presetType);
    var endpoint = isPersistent === true ? preset.persistentEndpoint : preset.nonPersistentEndpoint;
    var urlSearchParams = new URLSearchParams();
    urlSearchParams.set('appName', appName);
    urlSearchParams.set('src', preset.src);
    urlSearchParams.set('evid', preset.appLoadStart.eventId);
    urlSearchParams.set('session_id', sessionId);
    urlSearchParams.set('_', Math.random());
    urlSearchParams.set('is_rollout', false);

    if (artifactData) {
        urlSearchParams.set('artifactId', artifactData.id);
        urlSearchParams.set('artifactVersion', artifactData.version);
        urlSearchParams.set('is_rollout', artifactData.isRollout);
    }

    var cookieOverrides = new CookieOverrides().getCookieOverridesForApp(appName);
    Object.keys(cookieOverrides || {}).forEach(function(x) {
        return urlSearchParams.set(x, cookieOverrides[x]);
    });
    Object.keys(paramsOverrides || {}).forEach(function(x) {
        return urlSearchParams.set(x, paramsOverrides[x]);
    });
    var url = "//frog.wix.com/" + endpoint + "?" + urlSearchParams.toString();

    if (hasSendBeacon()) {
        sendBeacon(url);
    } else {
        new Image().src = url;
    }
}
export var phasesConfig = phasesConfigValues;