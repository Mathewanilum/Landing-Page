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
    FEDOPS_OVERRIDES_COOKIE
} from '@wix/fedops-overrides';
import {
    env
} from './env';
export var FEDOPS_OVERRIDES_WINDOW_IDENTIFIER = '__DEFAULT_FEDOPS_OVERRIDES__';
export var CookieOverrides = /*#__PURE__*/ function() {
    /**
     * @param {import('@wix/fedops-overrides').FedopsOverrideCookie} overridesCookie
     */
    function CookieOverrides() {
        var _this$_getOverridesFr;

        this._overridesCookie = (_this$_getOverridesFr = this._getOverridesFromWindow()) != null ? _this$_getOverridesFr : this._getOverridesFromDocumentCookieIfExists();
    }

    var _proto = CookieOverrides.prototype;

    _proto.getCookieOverridesForApp = function getCookieOverridesForApp(appName) {
        return Object.assign({}, this._overridesCookie.paramsOverrides, this._overridesCookie.paramsOverridesForApp && this._overridesCookie.paramsOverridesForApp[appName]);
    };

    _proto._getOverridesFromDocumentCookieIfExists = function _getOverridesFromDocumentCookieIfExists() {
        try {
            var overridesCookieContent = getCookie(FEDOPS_OVERRIDES_COOKIE);
            var overridesObject = parseJsonFromNodeOrScalaServers(overridesCookieContent);

            if (overridesObject && typeof overridesObject === 'object') {
                if (overridesObject.paramsOverridesForApp) {
                    overridesObject.paramsOverridesForApp = Object.entries(overridesObject.paramsOverridesForApp).reduce(toOverridesWithoutDots, {});
                }

                this._persistOverridesToWindow(overridesObject);

                return overridesObject;
            } else {
                return {};
            }
        } catch (err) {
            console.log(err);
            return {};
        }
    };

    _proto._persistOverridesToWindow = function _persistOverridesToWindow(overridesObject) {
        env()[FEDOPS_OVERRIDES_WINDOW_IDENTIFIER] = overridesObject;
    };

    _proto._getOverridesFromWindow = function _getOverridesFromWindow() {
        return env()[FEDOPS_OVERRIDES_WINDOW_IDENTIFIER];
    };

    return CookieOverrides;
}();

function toOverridesWithoutDots(overridesMap, _ref) {
    var _objectSpread2;

    var appName = _ref[0],
        overrides = _ref[1];
    return _objectSpread(_objectSpread({}, overridesMap), {}, (_objectSpread2 = {}, _objectSpread2[appName.replace(/\./g, '-')] = overrides, _objectSpread2));
}

function getCookie(cookieName) {
    if (!env().document || !env().document.cookie) {
        return '';
    }

    var cookieKeyValuePairs = env().document.cookie.split(';').map(function(c) {
        return c.trim().split('=');
    });

    var _cookieKeyValuePairs$ = cookieKeyValuePairs.filter(function(_ref2) {
            var key = _ref2[0];
            return key === cookieName;
        }),
        relevantCookie = _cookieKeyValuePairs$[0];

    if (relevantCookie) {
        var value = relevantCookie[1];
        return value;
    } else {
        return '';
    }
}

function parseJsonFromNodeOrScalaServers(rawPayload) {
    function attemptToParseJsonRecursivelySinceScalaServersSerializeItTwice() {
        try {
            return JSON.parse(JSON.parse(rawPayload));
        } catch (err) {
            return null;
        }
    }

    function attemptURIDecodeAndParseJsonSinceNodeServersUseWithURIEncoding() {
        try {
            return JSON.parse(decodeURIComponent(rawPayload));
        } catch (err) {
            return null;
        }
    }

    return attemptToParseJsonRecursivelySinceScalaServersSerializeItTwice() || attemptURIDecodeAndParseJsonSinceNodeServersUseWithURIEncoding();
}