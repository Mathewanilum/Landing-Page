"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        },
        f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;

    function verb(n) {
        return function(v) {
            return step([n, v]);
        };
    }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRegistryInstanceCache = void 0;
var utils_1 = require("../utils");

function createRegistryInstanceCache(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.cache,
        cache = _c === void 0 ? new Map() : _c;
    var pending = new Map();
    return {
        getRegistryAPI: function(_a) {
            var libraries = _a.libraries,
                factory = _a.factory,
                _b = _a.shouldCache,
                shouldCache = _b === void 0 ? true : _b;
            return __awaiter(this, void 0, void 0, function() {
                var normalized, key, withLocalURLs, instance;
                return __generator(this, function(_c) {
                    switch (_c.label) {
                        case 0:
                            normalized = libraries
                                .map(function(library) {
                                    if (library.hasOwnProperty('version') &&
                                        library.hasOwnProperty('host')) {
                                        return {
                                            url: library.baseURL,
                                            namespace: library.namespace,
                                        };
                                    } else {
                                        return library;
                                    }
                                })
                                .sort(function(a, b) {
                                    return (a.namespace > b.namespace ? 1 : -1);
                                });
                            key = JSON.stringify(normalized);
                            if (cache.has(key)) {
                                return [2 /*return*/ , cache.get(key)];
                            }
                            if (pending.has(key)) {
                                return [2 /*return*/ , pending.get(key)];
                            }
                            pending.set(key, factory());
                            withLocalURLs = normalized.some(function(library) {
                                return utils_1.LOCAL_DEV_HOSTS.some(function(host) {
                                    return library.url.startsWith(host);
                                });
                            });
                            return [4 /*yield*/ , pending.get(key)];
                        case 1:
                            instance = _c.sent();
                            pending.delete(key);
                            if (!withLocalURLs && shouldCache) {
                                cache.set(key, instance);
                            }
                            return [2 /*return*/ , instance];
                    }
                });
            });
        },
    };
}
exports.createRegistryInstanceCache = createRegistryInstanceCache;
//# sourceMappingURL=createRegistryInstanceCache.js.map