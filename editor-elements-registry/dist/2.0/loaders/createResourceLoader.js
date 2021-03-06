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
exports.createResourceLoader = exports.getScriptTag = void 0;
var utils_1 = require("../utils");
var evaluateBundle_1 = require("./evaluateBundle");
var loadAssets_1 = require("./loadAssets");
var RETRY_TIMES = 3;
/**
 * we need to pass hot bundle id for AMD cases
 * otherwise hot bundle will never be executed
 */
var HOT_BUNDLE_ID = 'hot';

function getScriptTag(url) {
    if (!utils_1.isBrowserMainThread()) {
        return null;
    }
    var element = document.querySelector("script[src=\"" + url + "\"]");
    return element;
}
exports.getScriptTag = getScriptTag;

function createPromiseGuard() {
    var _this = this;
    var requests = new Map();
    return function(id, _a) {
        var factory = _a.factory,
            _b = _a.persistent,
            persistent = _b === void 0 ? true : _b;
        return __awaiter(_this, void 0, void 0, function() {
            var pending, model, e_1;
            return __generator(this, function(_c) {
                switch (_c.label) {
                    case 0:
                        if (requests.has(id)) {
                            return [2 /*return*/ , requests.get(id)];
                        }
                        pending = factory();
                        requests.set(id, pending);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/ , pending];
                    case 2:
                        model = _c.sent();
                        if (!persistent) {
                            requests.delete(id);
                        }
                        return [2 /*return*/ , model];
                    case 3:
                        e_1 = _c.sent();
                        if (requests.has(id)) {
                            requests.delete(id);
                        }
                        throw e_1;
                    case 4:
                        return [2 /*return*/ ];
                }
            });
        });
    };
}

function withRetry(_a) {
    var _this = this;
    var times = _a.times,
        task = _a.task;
    var counter = 0;
    return new Promise(function(resolve, reject) {
        var run = function() {
            return __awaiter(_this, void 0, void 0, function() {
                var response, e_2;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/ , task()];
                        case 1:
                            response = _a.sent();
                            resolve(response);
                            return [3 /*break*/ , 3];
                        case 2:
                            e_2 = _a.sent();
                            counter++;
                            if (counter >= times) {
                                reject(e_2);
                            } else {
                                run();
                            }
                            return [3 /*break*/ , 3];
                        case 3:
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        run();
    });
}
var _fetcher = function(url) {
    return __awaiter(void 0, void 0, void 0, function() {
        var response;
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/ , fetch(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/ , response.text()];
            }
        });
    });
};

function createResourceLoader(_a) {
    var _this = this;
    var options = _a.options,
        globals = _a.globals,
        _b = _a.fetcher,
        fetcher = _b === void 0 ? _fetcher : _b;
    var contexts = {};
    var loadResource = function(_a) {
        var id = _a.id,
            url = _a.url;
        return withRetry({
            times: RETRY_TIMES,
            task: function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var script_1, pending_1, e_3, bundle;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(options && options.useScriptsInsteadOfEval && utils_1.isBrowser())) return [3 /*break*/ , 5];
                                script_1 = document.createElement('script');
                                script_1.src = url;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                pending_1 = new Promise(function(resolve, reject) {
                                    script_1.addEventListener('load', function() {
                                        return resolve();
                                    });
                                    script_1.addEventListener('error', function() {
                                        return reject();
                                    });
                                });
                                document.head.appendChild(script_1);
                                return [4 /*yield*/ , pending_1];
                            case 2:
                                _a.sent();
                                return [3 /*break*/ , 4];
                            case 3:
                                e_3 = _a.sent();
                                script_1.remove();
                                throw e_3;
                            case 4:
                                return [3 /*break*/ , 7];
                            case 5:
                                return [4 /*yield*/ , fetcher(url)];
                            case 6:
                                bundle = _a.sent();
                                evaluateBundle_1.evaluateBundle(bundle, {
                                    id: id,
                                    globals: globals,
                                    contexts: contexts,
                                    useExperimentalEval: options && options.useExperimentalEval,
                                });
                                _a.label = 7;
                            case 7:
                                return [2 /*return*/ ];
                        }
                    });
                });
            },
        });
    };
    var getModelByBundleID = function(id) {
        if (utils_1.isServer() && evaluateBundle_1.isOriginalRequireFunctionAvailable()) {
            return evaluateBundle_1.getModelFromContext(id, contexts[id]);
        } else {
            return evaluateBundle_1.getModel(id);
        }
    };
    return {
        fetch: function(_a) {
            var url = _a.url;
            return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_b) {
                    return [2 /*return*/ , fetcher(url)];
                });
            });
        },
        fetchLibraryManifest: function(_a) {
            var url = _a.url;
            return __awaiter(this, void 0, void 0, function() {
                var response;
                return __generator(this, function(_b) {
                    switch (_b.label) {
                        case 0:
                            return [4 /*yield*/ , fetcher(url)];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/ , JSON.parse(response)];
                    }
                });
            });
        },
        createBundleLoader: function(_a) {
            var _this = this;
            var environment = _a.environment;
            var guard = createPromiseGuard();
            var pendingEnvironmentPromise = null;
            var fetchEnvironment = function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var load;
                    return __generator(this, function(_a) {
                        if (pendingEnvironmentPromise) {
                            return [2 /*return*/ , pendingEnvironmentPromise];
                        }
                        load = function(_a) {
                            var id = _a.id,
                                url = _a.url;
                            if (!url) {
                                return;
                            }
                            var element = getScriptTag(url);
                            if (element) {
                                return Promise.resolve();
                            }
                            return loadResource({
                                id: id,
                                url: url,
                            });
                        };
                        pendingEnvironmentPromise = Promise.all([
                            load({
                                url: environment.runtime
                            }),
                            utils_1.isBrowser() ?
                            load({
                                id: HOT_BUNDLE_ID,
                                url: environment.hot
                            }) :
                            null,
                        ]).then(function() {
                            /**
                             * Trigger hot bundle for requirejs env.
                             * otherwise ??? hot bundle will be loaded but never initialized
                             **/
                            return getModelByBundleID(HOT_BUNDLE_ID);
                        });
                        return [2 /*return*/ , pendingEnvironmentPromise];
                    });
                });
            };
            return function(_a) {
                var url = _a.url,
                    id = _a.id,
                    _b = _a.assets,
                    assets = _b === void 0 ? [] : _b;
                return __awaiter(_this, void 0, void 0, function() {
                    var model;
                    var _this = this;
                    return __generator(this, function(_c) {
                        switch (_c.label) {
                            case 0:
                                /**
                                 * `loadingAssetsPromise` ??? not sure we should wait until CSS is loaded,
                                 * since it may cause waterfall
                                 */
                                if (assets) {
                                    loadAssets_1.loadAssets(assets.filter(function(a) {
                                        return !!a;
                                    }));
                                }
                                if (!(id && (utils_1.isBrowser() || utils_1.isWorker()))) return [3 /*break*/ , 2];
                                return [4 /*yield*/ , evaluateBundle_1.getModel(id)];
                            case 1:
                                model = _c.sent();
                                if (model) {
                                    return [2 /*return*/ , model];
                                }
                                _c.label = 2;
                            case 2:
                                return [4 /*yield*/ , (url ?
                                    guard(url, {
                                        persistent: !utils_1.LOCAL_DEV_HOSTS.some(function(host) {
                                            return url.startsWith(host);
                                        }),
                                        factory: function() {
                                            return __awaiter(_this, void 0, void 0, function() {
                                                return __generator(this, function(_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!environment) return [3 /*break*/ , 2];
                                                            return [4 /*yield*/ , fetchEnvironment()];
                                                        case 1:
                                                            _a.sent();
                                                            _a.label = 2;
                                                        case 2:
                                                            return [2 /*return*/ , loadResource({
                                                                id: id,
                                                                url: url,
                                                            })];
                                                    }
                                                });
                                            });
                                        },
                                    }) :
                                    null)];
                            case 3:
                                _c.sent();
                                if (!id) {
                                    return [2 /*return*/ , null];
                                }
                                return [2 /*return*/ , getModelByBundleID(id)];
                        }
                    });
                });
            };
        },
    };
}
exports.createResourceLoader = createResourceLoader;
//# sourceMappingURL=createResourceLoader.js.map