export var createLoggerCache = function(loggerFactory, metricsReporter) {
    var cacheMap = {};
    return {
        getOrCreate: function(moduleName) {
            var existingLogger = cacheMap[moduleName];
            if (existingLogger) {
                return existingLogger;
            }
            var newLogger = loggerFactory.build("site-assets-client:" + moduleName);
            metricsReporter.meter('buildLogger');
            newLogger.debug("Logger was created for module '" + moduleName + "'");
            cacheMap[moduleName] = newLogger;
            return newLogger;
        }
    };
};