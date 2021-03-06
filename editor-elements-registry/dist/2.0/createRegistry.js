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
var __spreadArray = (this && this.__spreadArray) || function(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRegistry = exports.loadContext = exports.isLibraryTopology = exports.withDefaultOptions = void 0;
var editor_elements_conventions_1 = require("@wix/editor-elements-conventions");
var createResourceLoader_1 = require("./loaders/createResourceLoader");
var createManifestAPI_1 = require("./manifest/createManifestAPI");
var createComponentLoaders_1 = require("./loaders/createComponentLoaders");
var loadExternalRegistry_1 = require("./loaders/loadExternalRegistry");
var validateLibraryURL_1 = require("./toolbox/validateLibraryURL");
var utils_1 = require("./utils");

function withDefaultOptions(options) {
    return __assign({
        dev: false,
        useScriptsInsteadOfEval: false,
        usePartialManifests: false,
        useExperimentalEval: false
    }, options);
}
exports.withDefaultOptions = withDefaultOptions;
var isLibraryTopology = function(library) {
    return library.hasOwnProperty('namespace') && library.hasOwnProperty('url');
};
exports.isLibraryTopology = isLibraryTopology;

function loadContext(_a) {
    var host = _a.host,
        libraries = _a.libraries,
        resourceLoader = _a.resourceLoader,
        options = _a.options;
    return __awaiter(this, void 0, void 0, function() {
        var urls, manifests, loadManifests, _b, _c, _d;
        var _this = this;
        return __generator(this, function(_e) {
            switch (_e.label) {
                case 0:
                    urls = [];
                    manifests = [];
                    libraries.forEach(function(library, index) {
                        if (exports.isLibraryTopology(library)) {
                            var manifestName = editor_elements_conventions_1.getManifestName({
                                namespace: library.namespace,
                                host: host,
                                isDev: false,
                            });
                            var url = library.url + "/" + manifestName;
                            urls.push({
                                url: url,
                                order: index
                            });
                        } else {
                            manifests.push({
                                manifest: createManifestAPI_1.createManifestAPI(library),
                                order: index,
                            });
                        }
                    });
                    loadManifests = function() {
                        return Promise.all(urls.map(function(_a) {
                            var url = _a.url,
                                order = _a.order;
                            return __awaiter(_this, void 0, void 0, function() {
                                var manifest;
                                return __generator(this, function(_b) {
                                    switch (_b.label) {
                                        case 0:
                                            return [4 /*yield*/ , resourceLoader.fetchLibraryManifest({
                                                url: url,
                                            })];
                                        case 1:
                                            manifest = _b.sent();
                                            return [2 /*return*/ , {
                                                order: order,
                                                manifest: createManifestAPI_1.createManifestAPI(manifest),
                                            }];
                                    }
                                });
                            });
                        }));
                    };
                    if (!!options.usePartialManifests) return [3 /*break*/ , 2];
                    _c = (_b = manifests.push).apply;
                    _d = [manifests];
                    return [4 /*yield*/ , loadManifests()];
                case 1:
                    _c.apply(_b, _d.concat([(_e.sent())]));
                    _e.label = 2;
                case 2:
                    return [2 /*return*/ , {
                        manifests: manifests,
                        urls: urls.map(function(_a) {
                            var url = _a.url;
                            return url;
                        }),
                        loadManifests: options.usePartialManifests ? loadManifests : null,
                    }];
            }
        });
    });
}
exports.loadContext = loadContext;

function splitLibraries(libraries) {
    return libraries.reduce(function(acc, lib) {
        if (exports.isLibraryTopology(lib) &&
            lib.namespace === loadExternalRegistry_1.EXTERNAL_REGISTRY_OVERRIDE_NAMESPACE) {
            acc.registryOverrideLibrary = lib;
        } else {
            acc.libraries.push(lib);
        }
        return acc;
    }, {
        libraries: [],
        registryOverrideLibrary: null,
    });
}

function filterUntrustedURLs(libraries) {
    return libraries.filter(function(library) {
        if (exports.isLibraryTopology(library)) {
            return validateLibraryURL_1.validateLibraryURL(library.url);
        } else {
            return validateLibraryURL_1.validateLibraryURL(library.baseURL);
        }
    });
}

function createRegistry(_a) {
    var _this = this;
    var host = _a.host;
    return function(params) {
        return __awaiter(_this, void 0, void 0, function() {
            function createComponentLoaders(manifests) {
                return __awaiter(this, void 0, void 0, function() {
                    var tasks;
                    var _this = this;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                tasks = manifests.map(function(_a) {
                                    var order = _a.order,
                                        manifest = _a.manifest;
                                    return __awaiter(_this, void 0, void 0, function() {
                                        var loadBundle, namespace, mode, _b, _c, _d;
                                        return __generator(this, function(_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    loadBundle = resourceLoader.createBundleLoader({
                                                        environment: manifest.getEnvironment(),
                                                    });
                                                    namespace = editor_elements_conventions_1.withProdNamespace(manifest.getNamespace());
                                                    mode = (params.modes && params.modes[namespace]) || params.mode || 'lazy';
                                                    // @ts-expect-error
                                                    _b = librariesComponents;
                                                    _c = order;
                                                    if (!(mode === 'lazy')) return [3 /*break*/ , 1];
                                                    _d = createComponentLoaders_1.createLazyComponentLoaders({
                                                        manifest: manifest,
                                                        loadBundle: loadBundle,
                                                    });
                                                    return [3 /*break*/ , 3];
                                                case 1:
                                                    return [4 /*yield*/ , createComponentLoaders_1.createEagerComponentLoaders({
                                                        manifest: manifest,
                                                        loadBundle: loadBundle,
                                                    })];
                                                case 2:
                                                    _d = _e.sent();
                                                    _e.label = 3;
                                                case 3:
                                                    // @ts-expect-error
                                                    _b[_c] = _d;
                                                    return [2 /*return*/ ];
                                            }
                                        });
                                    });
                                });
                                return [4 /*yield*/ , Promise.all(tasks)];
                            case 1:
                                _a.sent();
                                loaders = {};
                                Object.keys(librariesComponents)
                                    .map(function(v) {
                                        return parseInt(v, 10);
                                    })
                                    .sort()
                                    .forEach(function(index) {
                                        Object.assign(loaders, librariesComponents[index]);
                                    });
                                return [2 /*return*/ ];
                        }
                    });
                });
            }
            var options, resourceLoader, _a, libraries, registryOverrideLibrary, registry, context, loaders, librariesComponents, loadComponents, isContextFulfilled;
            var _this = this;
            return __generator(this, function(_b) {
                switch (_b.label) {
                    case 0:
                        options = withDefaultOptions(params.options || {});
                        resourceLoader = createResourceLoader_1.createResourceLoader({
                            options: options,
                            fetcher: params.fetcher,
                            globals: params.globals,
                        });
                        _a = splitLibraries(filterUntrustedURLs(params.libraries)), libraries = _a.libraries, registryOverrideLibrary = _a.registryOverrideLibrary;
                        if (!registryOverrideLibrary) return [3 /*break*/ , 2];
                        return [4 /*yield*/ , loadExternalRegistry_1.loadExternalRegistry({
                            resourceLoader: resourceLoader,
                            host: host,
                            url: registryOverrideLibrary.url,
                        })];
                    case 1:
                        registry = _b.sent();
                        return [2 /*return*/ , registry(__assign(__assign({}, params), {
                            libraries: libraries
                        }))];
                    case 2:
                        return [4 /*yield*/ , loadContext({
                            host: host,
                            libraries: libraries,
                            resourceLoader: resourceLoader,
                            options: options,
                        })];
                    case 3:
                        context = _b.sent();
                        loaders = {};
                        librariesComponents = {};
                        return [4 /*yield*/ , createComponentLoaders(context.manifests)];
                    case 4:
                        _b.sent();
                        loadComponents = function(componentNames) {
                            return __awaiter(_this, void 0, void 0, function() {
                                var pending, models;
                                var _this = this;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            pending = componentNames.map(function(componentName) {
                                                return __awaiter(_this, void 0, void 0, function() {
                                                    var _a;
                                                    return __generator(this, function(_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _a = {
                                                                    componentName: componentName
                                                                };
                                                                return [4 /*yield*/ , loaders[componentName]()];
                                                            case 1:
                                                                return [2 /*return*/ , (_a.model = _b.sent(),
                                                                    _a)];
                                                        }
                                                    });
                                                });
                                            });
                                            return [4 /*yield*/ , Promise.all(pending)];
                                        case 1:
                                            models = _a.sent();
                                            return [2 /*return*/ , models.reduce(function(acc, _a) {
                                                var model = _a.model,
                                                    componentName = _a.componentName;
                                                acc[componentName] = model;
                                                return acc;
                                            }, {})];
                                    }
                                });
                            });
                        };
                        isContextFulfilled = false;
                        return [2 /*return*/ , {
                            getComponentsLoaders: function() {
                                return loaders;
                            },
                            getManifestURLs: function() {
                                return __spreadArray([], context.urls);
                            },
                            getHostBundleAssets: function() {
                                return utils_1.flat(context.manifests.map(function(_a) {
                                    var manifest = _a.manifest;
                                    var model = manifest.getHostBundleModel();
                                    return createComponentLoaders_1.getComponentAssets({
                                        resource: model
                                    });
                                }));
                            },
                            loadComponents: function(componentNames) {
                                return __awaiter(this, void 0, void 0, function() {
                                    return __generator(this, function(_a) {
                                        return [2 /*return*/ , loadComponents(componentNames)];
                                    });
                                });
                            },
                            loadAllComponents: function() {
                                var componentNames = Object.keys(loaders);
                                return loadComponents(componentNames);
                            },
                            getLibrariesAssets: function() {
                                return utils_1.flat(context.manifests.map(function(_a) {
                                    var manifest = _a.manifest;
                                    return manifest.getLibraryAssets();
                                }));
                            },
                            getRuntime: function() {
                                var _libraries = __spreadArray([], context.manifests.map(function(_a) {
                                    var manifest = _a.manifest;
                                    return manifest.getManifest();
                                }));
                                if (registryOverrideLibrary) {
                                    _libraries.push(registryOverrideLibrary);
                                }
                                return {
                                    libraries: _libraries,
                                };
                            },
                            ensureManifestsAreLoaded: function() {
                                return __awaiter(this, void 0, void 0, function() {
                                    var manifests;
                                    return __generator(this, function(_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(!isContextFulfilled && context.loadManifests)) return [3 /*break*/ , 3];
                                                return [4 /*yield*/ , context.loadManifests()];
                                            case 1:
                                                manifests = _a.sent();
                                                return [4 /*yield*/ , createComponentLoaders(manifests)];
                                            case 2:
                                                _a.sent();
                                                isContextFulfilled = true;
                                                _a.label = 3;
                                            case 3:
                                                return [2 /*return*/ ];
                                        }
                                    });
                                });
                            },
                        }];
                }
            });
        });
    };
}
exports.createRegistry = createRegistry;
//# sourceMappingURL=createRegistry.js.map