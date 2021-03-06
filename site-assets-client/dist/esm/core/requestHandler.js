import {
    SiteAssetsFallbackError,
    SiteAssetsServerError,
    UrlBuilderError
} from '..';
export var RequestHandler = function(config, urlBuilder, clientModuleExecutor, serverModuleResultExtractor, buildHttpClientAdapter, buildModuleMetricsReporter, siteAssetsServerHttpHandlerBuilder) {
    return function(request) {
        var moduleMetricsReporter = buildModuleMetricsReporter(request.module);
        var httpClientAdapter = buildHttpClientAdapter(moduleMetricsReporter);
        var toSiteAssetsResponse = function(moduleResult) {
            return ({
                result: function() {
                    return moduleResult;
                }
            });
        };
        var runClientModuleExecutor = function(siteAssetsServerError) {
            return clientModuleExecutor
                .execute(request)
                .catch(function(moduleExecutorError) {
                    moduleMetricsReporter.reportError(moduleExecutorError);
                    return Promise.reject(new SiteAssetsFallbackError(moduleExecutorError, siteAssetsServerError));
                });
        };
        var executeModuleOnClient = function(siteAssetsServerError) {
            return moduleMetricsReporter.runAsyncAndReport(function() {
                return runClientModuleExecutor(siteAssetsServerError);
            }, 'execute-fallback');
        };
        var returnErrorOrAttemptFallback = function(siteAssetsUrl, httpRequestError) {
            var siteAssetsServerError = new SiteAssetsServerError(siteAssetsUrl, httpRequestError);
            if (request.fallbackStrategy == 'enable') {
                return executeModuleOnClient(siteAssetsServerError);
            }
            return Promise.reject(siteAssetsServerError);
        };
        var executeModuleOnServer = function() {
            var siteAssetsUrl;
            try {
                siteAssetsUrl = urlBuilder.siteAssetsUrl(request, config.moduleTopology.environment.siteAssetsServerUrl);
            } catch (urlBuilderError) {
                return Promise.reject(new UrlBuilderError(urlBuilderError));
            }
            var siteAssetsServerHttpHandler = siteAssetsServerHttpHandlerBuilder.build(siteAssetsUrl, request.timeout, request.customRequestSource);
            return httpClientAdapter.call(siteAssetsServerHttpHandler)
                .then(serverModuleResultExtractor.moduleResult)
                .catch(function(httpRequestError) {
                    return returnErrorOrAttemptFallback(siteAssetsUrl, httpRequestError);
                });
        };
        var executeModule = function() {
            if (request.fallbackStrategy == 'force') {
                return executeModuleOnClient();
            }
            return executeModuleOnServer();
        };
        var execute = function() {
            return moduleMetricsReporter.runAsyncAndReport(function() {
                return executeModule().then(toSiteAssetsResponse);
            }, 'execute');
        };
        return {
            execute: execute
        };
    };
};