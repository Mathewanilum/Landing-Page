export var CDN_HIT_HEADER = 'age';
export var WIX_HIVE_HIT_HEADER = 'x-cache-status';
var WIX_HIVE_CACHE_NAME = 'wixHive';
var CDN_CACHE_NAME = 'cdn';
export var SiteAssetsServerHttpResponseBuilder = function() {
    var maybeWixHiveHeaderValue = function(httpResponse) {
        return httpResponse.headers.get(WIX_HIVE_HIT_HEADER);
    };
    var wixHiveHeaderValue = function(httpResponse) {
        return maybeWixHiveHeaderValue(httpResponse) || 'MISS';
    };
    var isWixHiveHit = function(httpResponse) {
        return wixHiveHeaderValue(httpResponse) == 'HIT';
    };
    var maybeCdnHeaderValue = function(httpResponse) {
        return httpResponse.headers.get(CDN_HIT_HEADER);
    };
    var cdnHeaderValue = function(httpResponse) {
        return parseInt(maybeCdnHeaderValue(httpResponse) || '0');
    };
    var isCdnHit = function(httpResponse) {
        return cdnHeaderValue(httpResponse) > 0;
    };
    var isHitToString = function(isHit) {
        return isHit ? 'hit' : 'miss';
    };
    var getDurationMetricName = function(httpResponse) {
        var metricName = function(cacheName, isHit) {
            return "site-assets-server-request-" + cacheName + "-" + isHitToString(isHit);
        };
        if (maybeWixHiveHeaderValue(httpResponse))
            return metricName(WIX_HIVE_CACHE_NAME, isWixHiveHit(httpResponse));
        if (maybeCdnHeaderValue(httpResponse))
            return metricName(CDN_CACHE_NAME, isCdnHit(httpResponse));
    };
    var build = function(httpResponse) {
        var cdnHit = isCdnHit(httpResponse);
        var wixHiveHit = isWixHiveHit(httpResponse);
        return ({
            isCdnHit: cdnHit,
            isWixHiveHit: wixHiveHit,
            rawHttpResponse: httpResponse,
            reportMetrics: function(moduleMetricsReporter, durationMs) {
                var durationMetricName = getDurationMetricName(httpResponse);
                if (durationMetricName)
                    moduleMetricsReporter.histogram(durationMetricName, durationMs);
                if (cdnHit)
                    moduleMetricsReporter.meter(CDN_CACHE_NAME + "-hit");
                if (wixHiveHit)
                    moduleMetricsReporter.meter(WIX_HIVE_CACHE_NAME + "-hit");
            }
        });
    };
    return {
        build: build
    };
};