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
import {
    SiteAssetsLoadModuleExecutorError
} from '..';
import {
    PagesInfoResolver
} from './pagesInfoResolver';
import {
    stringifyValues
} from '../helper/objectHelper';
import {
    validateSiteAssetsSiteModels
} from './clientValidation';
import {
    getClientSpecMapPromise
} from './getClientSpecMapValue';

function loadModuleExecutor(metricsReporter) {
    return __awaiter(this, void 0, void 0, function() {
        var makeModuleExecutor, err_1, error;
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/ ,
                        import ( /* webpackChunkName: "module-executor" */ '@wix/site-assets-module-executor')
                    ];
                case 1:
                    makeModuleExecutor = (_a.sent()).default;
                    return [2 /*return*/ , makeModuleExecutor];
                case 2:
                    err_1 = _a.sent();
                    error = new SiteAssetsLoadModuleExecutorError(err_1);
                    metricsReporter.reportError(error);
                    throw error;
                case 3:
                    return [2 /*return*/ ];
            }
        });
    });
}
export var ClientModuleExecutor = function(config, collaborators, siteModels, urlBuilder, logger) {
    /**
     * The module validator is a no op because there is no access to the module whitelist
     * The server will validate
     */
    var noOpModuleValidator = {
        validate: function() {
            return Promise.resolve();
        }
    };
    var buildParams = function(request) {
        var params = urlBuilder.siteAssetsParams(request);
        return stringifyValues(params);
    };
    var execute = function(request) {
        try {
            validateSiteAssetsSiteModels(siteModels);
        } catch (e) {
            return Promise.reject(e);
        }
        var moduleExecutorCollaborators = {
            moduleValidator: noOpModuleValidator,
            metricsReporter: collaborators.metricsReporter,
            moduleFetcher: function() {
                return collaborators.moduleFetcher;
            },
            httpClient: collaborators.httpClient // todo get the new module from module-executor (shahar will fix) that uses the httpClient
        };
        var moduleTopology = config.moduleTopology,
            staticsTopology = config.staticsTopology;
        var _a = moduleTopology.environment,
            moduleRepoUrl = _a.moduleRepoUrl,
            fileRepoUrl = _a.fileRepoUrl,
            staticMediaUrl = _a.staticMediaUrl,
            mediaRootUrl = _a.mediaRootUrl;
        var moduleConfig = {
            moduleRepoUrl: moduleRepoUrl,
            fileRepoUrl: fileRepoUrl
        };
        var topology = {
            mediaRootUrl: mediaRootUrl,
            staticMediaUrl: staticMediaUrl
        };
        var moduleExecutorConfig = {
            moduleConfig: moduleConfig,
            staticsConfig: staticsTopology,
            topology: topology,
            moduleTopology: moduleTopology
        };
        return loadModuleExecutor(collaborators.metricsReporter)
            .then(function(makeModuleExecutor) {
                var moduleExecutor = makeModuleExecutor({
                    config: moduleExecutorConfig,
                    collaborators: moduleExecutorCollaborators
                }).moduleExecutor;
                var clientSpecMapPromise = getClientSpecMapPromise(siteModels.metaSiteModel);
                var moduleExecutionParams = {
                    query: buildParams(request),
                    pagesInfoResolver: PagesInfoResolver(siteModels.sitePagesModel),
                    clientSpecMap: clientSpecMapPromise,
                    logger: logger
                };
                return moduleExecutor(request.endpoint.controller).execute(moduleExecutionParams);
            });
    };
    return {
        execute: execute
    };
};