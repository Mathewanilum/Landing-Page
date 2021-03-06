import {
    UrlBuilder
} from './urlBuilder';
import {
    RequestHandler
} from './requestHandler';
import {
    ClientModuleExecutor
} from './clientModuleExecutor';
import {
    ServerModuleResultExtractor
} from './serverModuleResultExtractor';
import {
    ModuleMetricsReporter
} from './moduleMetricsReporter';
import {
    HttpClientAdapter
} from './httpClientAdapter';
import {
    SiteAssetsServerHttpHandlerBuilder
} from './siteAssetsServerHttpHandler';
import {
    SiteAssetsServerHttpResponseBuilder
} from './siteAssetsServerHttpResponse';
import {
    createLoggerCache
} from './loggersCache';
export var ClientOps = function(collaborators, config, siteModels) {
    var loggerCache = createLoggerCache(collaborators.loggerFactory, collaborators.metricsReporter);
    return function(request) {
        var urlBuilder = UrlBuilder(siteModels, config.isStagingRequest);
        var logger = loggerCache.getOrCreate(request.module.name);
        var requestHandler = RequestHandler(config, urlBuilder, ClientModuleExecutor(config, collaborators, siteModels, urlBuilder, logger), ServerModuleResultExtractor(), function(moduleMetricsReporter) {
            return HttpClientAdapter(collaborators.httpClient, moduleMetricsReporter);
        }, function(module) {
            return ModuleMetricsReporter(collaborators.metricsReporter, module);
        }, SiteAssetsServerHttpHandlerBuilder(SiteAssetsServerHttpResponseBuilder()));
        var execute = function() {
            return requestHandler(request).execute();
        };
        var getPublicUrl = function() {
            return urlBuilder.siteAssetsUrl(request, config.moduleTopology.publicEnvironment.siteAssetsServerUrl);
        };
        return {
            execute: execute,
            getPublicUrl: getPublicUrl
        };
    };
};