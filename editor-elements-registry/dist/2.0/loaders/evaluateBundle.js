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
exports.evaluateBundle = exports.getModel = exports.getModelFromContext = exports.getGlobalModel = exports.getEnvironment = exports.requireAMDModule = exports.getGlobal = exports.isOriginalRequireFunctionAvailable = exports.getOriginalRequireFunction = void 0;
/* eslint-disable no-new-func */
/* eslint-disable no-eval */
var editor_elements_conventions_1 = require("@wix/editor-elements-conventions");
var utils_1 = require("../utils");
var workaround = {};
/**
 * trick to leave `require` as is after webpack build
 * it makes possible to run the same bundle on server and client
 */
eval("workaround.getRequireFunction = () => typeof require !== 'undefined' ? require : undefined");

function getOriginalRequireFunction() {
    return workaround.getRequireFunction();
}
exports.getOriginalRequireFunction = getOriginalRequireFunction;

function isOriginalRequireFunctionAvailable() {
    return typeof getOriginalRequireFunction() !== 'undefined';
}
exports.isOriginalRequireFunctionAvailable = isOriginalRequireFunctionAvailable;

function getGlobal() {
    return (typeof globalThis !== 'undefined' ?
        globalThis :
        typeof window !== 'undefined' ?
        window :
        typeof self !== 'undefined' ?
        self :
        typeof global !== 'undefined' ?
        global :
        null);
}
exports.getGlobal = getGlobal;

function requireAMDModule(id) {
    /**
     * This is workaround for webpack...
     * if just use `require` function directly, webpack will transpile it to
     * `__webpack_require__(n)` that always leads to module that throws exception like `module if not defined`
     */
    var localRequire = getOriginalRequireFunction();
    return new Promise(function(resolve) {
        /**
         * Trigger `require` to fix `require.specified`
         * https://github.com/requirejs/requirejs/issues/1305#issuecomment-87924865
         **/
        localRequire([]);
        /**
         * To prevent fetching module with `requirejs`
         */
        if (localRequire.specified(id)) {
            localRequire([id], function(model) {
                resolve(model);
            });
        } else {
            resolve(undefined);
        }
    });
}
exports.requireAMDModule = requireAMDModule;
var parseDefineArguments = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 3) {
        return {
            id: args[0],
            deps: args[1],
            factory: args[2],
        };
    } else if (args.length === 2) {
        return {
            id: typeof args[0] === 'string' ? args[0] : null,
            deps: Array.isArray(args[0]) ? args[0] : [],
            factory: args[1],
        };
    } else {
        return null;
    }
};

function wrapDefineFunction(params) {
    /**
     * If components library was bundled with "umdNamedDefine: true", the UMD header in bundle will be:
     * ...
     * define('bundleId', [], factory)
     * ...
     *
     * If components "umdNamedDefine: false":
     * ...
     * define([], factory)
     * ...
     *
     * So this is anonymous define call, that means that it is not possible to require it after the evaluation
     * Better to track these cases.
     */
    var defineForBundle;
    if (params.define) {
        defineForBundle = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var parsed = parseDefineArguments.apply(void 0, args);
            if (!parsed) {
                throw new Error('x');
            }
            var id = parsed.id,
                deps = parsed.deps,
                factory = parsed.factory;
            var globals = params.globals;
            var filteredDeps = deps.filter(function(key) {
                return !globals || (globals && !globals[key]);
            });
            if (globals) {
                params.define(id, filteredDeps, function() {
                    var values = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        values[_i] = arguments[_i];
                    }
                    var allValues = deps.map(function(dep) {
                        var index = filteredDeps.findIndex(function(_dep) {
                            return _dep === dep;
                        });
                        if (index === -1) {
                            return globals[dep];
                        } else {
                            return values[index];
                        }
                    });
                    return factory.apply(void 0, allValues);
                });
            } else {
                params.define.apply(params, args);
            }
        };
        defineForBundle.amd = params.define.amd;
    }
    return defineForBundle;
}

function getDefineFunction() {
    var currentGlobal = getGlobal();
    return typeof currentGlobal.define === 'function' && currentGlobal.define.amd ?
        currentGlobal.define :
        null;
}

function getEnvironment(_a) {
    var id = _a.id,
        globals = _a.globals;
    var currentGlobal = getGlobal();
    var _define = getDefineFunction();
    var self = currentGlobal;
    if (globals && !_define) {
        self = new Proxy(currentGlobal, {
            get: function(target, key) {
                var store = key in globals ? globals : target;
                var value = store[key];
                if (typeof value === 'function') {
                    var returnValue = function() {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return value.apply(store, args);
                    };
                    Object.assign(returnValue, value);
                    return returnValue;
                } else {
                    return value;
                }
            },
        });
    }
    var currentRequire = getOriginalRequireFunction();
    return {
        /**
         * for requirejs environment
         */
        define: wrapDefineFunction({
            id: id,
            define: _define,
            globals: globals
        }),
        /**
         * `workaround.require` ??? always default require function
         * for SSR ??? it is node require
         * for CSR ??? it is requirejs
         */
        require: currentRequire ?
            function(name) {
                if (globals && globals[name]) {
                    return globals[name];
                }
                return currentRequire(name);
            } :
            undefined,
        /**
         * always force `module` to be undefine during bundle evaluation
         */
        module: undefined,
        /**
         * commonjs & commonjs2
         *
         * for server env. we provide `exports` as plain object
         * after evaluation, it is possible to get the results:
         * env.exports[bundleId]
         */
        exports: utils_1.isServer() && isOriginalRequireFunctionAvailable() ? {} : undefined,
        /**
         *
         */
        self: self,
    };
}
exports.getEnvironment = getEnvironment;

function getGlobalModel(id) {
    var env = getEnvironment({
        id: id
    });
    var model = env.self[id];
    if (!model && typeof env.define === 'function') {
        return requireAMDModule(id);
    }
    return model;
}
exports.getGlobalModel = getGlobalModel;

function getModelFromContext(id, context) {
    if (!context) {
        return null;
    }
    var lazyFactoryID = editor_elements_conventions_1.getLazyFactoryID(id);
    var factory = context[lazyFactoryID];
    if (factory && !factory.invoked) {
        factory.invoked = true;
        factory();
    }
    return context[id];
}
exports.getModelFromContext = getModelFromContext;

function getModel(id) {
    return __awaiter(this, void 0, void 0, function() {
        var factory;
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/ , getGlobalModel(editor_elements_conventions_1.getLazyFactoryID(id))];
                case 1:
                    factory = _a.sent();
                    if (factory && !factory.invoked) {
                        factory.invoked = true;
                        factory();
                    }
                    /**
                     * Probably we need to check pending script tags
                     */
                    return [2 /*return*/ , getGlobalModel(id)];
            }
        });
    });
}
exports.getModel = getModel;

function evaluateBundle(bundle, _a) {
    var _b = _a === void 0 ? {} : _a,
        id = _b.id,
        globals = _b.globals,
        contexts = _b.contexts,
        useExperimentalEval = _b.useExperimentalEval;
    var env = getEnvironment({
        id: id,
        globals: globals
    });
    if (useExperimentalEval) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (function(_a) {
            var define = _a.define,
                require = _a.require,
                module = _a.module,
                exports = _a.exports,
                self = _a.self;
            eval(bundle + "\n//# sourceURL=webpack-internal://");
        })(env);
    } else {
        var evaluateBundleSources = new Function('define', 'require', 'module', 'exports', 'self', bundle);
        evaluateBundleSources(env.define, env.require, env.module, env.exports, env.self);
    }
    if (!id) {
        return;
    }
    if (typeof env.exports === 'object') {
        contexts[id] = env.exports;
    }
}
exports.evaluateBundle = evaluateBundle;
//# sourceMappingURL=evaluateBundle.js.map