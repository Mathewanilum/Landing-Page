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
import {
    noOpSiteAssetsLoggerFactory
} from './siteAssetsNoOpLoggerFactory';
import {
    NotReportingMetricsReporter
} from './notReportingMetricsReporter';
import {
    NoOpModuleFetcher
} from './noOpModuleFetcher';
export var thinToFatConfig = function(config) {
    return ({
        artifactId: config.artifactId,
        isStagingRequest: false,
        moduleTopology: {
            publicEnvironment: {
                fileRepoUrl: '',
                mediaRootUrl: '',
                moduleRepoUrl: '',
                siteAssetsServerUrl: config.publicSiteAssetsServerUrl,
                staticMediaUrl: ''
            },
            environment: {
                fileRepoUrl: '',
                mediaRootUrl: '',
                moduleRepoUrl: '',
                siteAssetsServerUrl: config.siteAssetsServerUrl,
                staticMediaUrl: ''
            }
        },
        staticsTopology: {
            baseURLs: []
        }
    });
};
export var thinToFatSiteModels = function(siteModels) {
    return ({
        metaSiteModel: __assign({
            clientSpecMap: {},
            clientSpecMapSupplier: function() {
                return Promise.resolve({});
            }
        }, siteModels.metaSiteModel),
        sitePagesModel: __assign({
            pageJsonFileNames: {},
            protectedPageIds: [],
            routersInfo: {},
            urlFormatModel: {}
        }, siteModels.sitePagesModel)
    });
};
var toCollaborators = function(httpClient, loggerFactory, metricsReporter, moduleFetcher) {
    return ({
        httpClient: httpClient,
        loggerFactory: loggerFactory || noOpSiteAssetsLoggerFactory,
        metricsReporter: metricsReporter || NotReportingMetricsReporter,
        moduleFetcher: moduleFetcher || NoOpModuleFetcher
    });
};
export var thinToInternalCollaborators = function(collaborators) {
    return toCollaborators(collaborators.httpClient, collaborators.loggerFactory, collaborators.metricsReporter);
};
export var toInternalCollaborators = function(collaborators) {
    return toCollaborators(collaborators.httpClient, collaborators.loggerFactory, collaborators.metricsReporter, collaborators.moduleFetcher);
};
export var thinToFatRequest = function(request) {
    return (__assign({
        fallbackStrategy: 'disable'
    }, request));
};