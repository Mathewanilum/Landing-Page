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
    validateSiteAssetsRequest
} from './clientValidation';
import {
    keys
} from '../helper/objectHelper';
export var UrlBuilder = function(siteModels, isStagingRequest) {
    var encode = function(value) {
        return encodeURIComponent(value);
    };
    var getRandomInt = function() {
        return Math.floor(Math.random() * Math.floor(1000));
    };
    var buildQueryString = function(params) {
        return keys(params)
            .sort()
            .map(function(key) {
                return key + "=" + (encode(params[key]));
            })
            .join('&');
    };
    var experimentsParam = function(experiments) {
        var experimentKeys = keys(experiments);
        if (experimentKeys.length !== 0) {
            return {
                experiments: experimentKeys.sort().join(',')
            };
        } else
            return {};
    };
    var buildSiteModelQueryParams = function(siteModels, moduleName) {
        var _a = siteModels.metaSiteModel,
            metaSiteId = _a.metaSiteId,
            isHttps = _a.isHttps,
            isUrlMigrated = _a.isUrlMigrated,
            siteId = _a.siteId;
        var _b = siteModels.sitePagesModel,
            siteRevision = _b.siteRevision,
            experiments = _b.experiments,
            dataFixerVersion = _b.dataFixerVersion,
            quickActionsMenuEnabled = _b.quickActionsMenuEnabled,
            cacheVersions = _b.cacheVersions;
        var requiredParams = {
            dfVersion: dataFixerVersion,
            dfCk: cacheVersions.dataFixer,
            isHttps: isHttps,
            isUrlMigrated: isUrlMigrated,
            metaSiteId: metaSiteId,
            siteId: siteId,
            quickActionsMenuEnabled: quickActionsMenuEnabled,
            siteRevision: siteRevision
        };
        var csmCacheKeyParam = siteModels.metaSiteModel.csmCacheKey ? {
            csmCk: siteModels.metaSiteModel.csmCacheKey
        } : {};
        var siteRevisionConfigKeyParam = siteModels.sitePagesModel.siteRevisionConfig ? {
            commonConfig: JSON.stringify(siteModels.sitePagesModel.siteRevisionConfig)
        } : {};
        var moduleCacheVersionParam = cacheVersions ? cacheVersions[moduleName] ? {
            mCk: cacheVersions[moduleName]
        } : {} : {};
        return __assign(__assign(__assign(__assign(__assign({}, requiredParams), (experimentsParam(experiments))), csmCacheKeyParam), siteRevisionConfigKeyParam), moduleCacheVersionParam);
    };
    var contentTypeParam = function(contentType) {
        if (contentType)
            return {
                contentType: contentType
            };
        else
            return {};
    };
    var siteAssetsCacheKillerParam = function(disableCache) {
        if (disableCache)
            return {
                sack: "" + getRandomInt()
            };
        else
            return {};
    };
    var isStagingParam = function(isStagingRequest) {
        if (isStagingRequest)
            return {
                isStaging: '1'
            };
        else
            return {};
    };
    var versionParam = function(fetchType, version) {
        if (fetchType === 'module')
            return {
                moduleVersion: version
            };
        else if (fetchType === 'file')
            return {
                fileId: version
            };
        else
            return {};
    };
    var buildRequestQueryParams = function(request) {
        var _a = request.module,
            fetchType = _a.fetchType,
            params = _a.params,
            name = _a.name,
            version = _a.version;
        return __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, params), {
            module: name
        }), {
            pageId: request.pageJsonFileName
        }), (contentTypeParam(request.contentType))), (versionParam(fetchType, version))), (siteAssetsCacheKillerParam(request.disableSiteAssetsCache))), (isStagingParam(isStagingRequest)));
    };
    var siteAssetsParams = function(request) {
        validateSiteAssetsRequest(request);
        var siteModelQueryParams = buildSiteModelQueryParams(siteModels, request.module.name);
        var requestQueryParams = buildRequestQueryParams(request);
        return __assign(__assign({}, siteModelQueryParams), requestQueryParams);
    };
    var buildQueryParams = function(request) {
        var params = siteAssetsParams(request);
        return buildQueryString(params);
    };
    var siteAssetsUrl = function(request, siteAssetsBaseDomain) {
        var _a = request.endpoint,
            controller = _a.controller,
            methodName = _a.methodName;
        var endpoint = "/pages/" + controller + "/" + methodName;
        var paramsQueryStr = buildQueryParams(request);
        return "" + siteAssetsBaseDomain + endpoint + "?" + paramsQueryStr;
    };
    return {
        siteAssetsUrl: siteAssetsUrl,
        siteAssetsParams: siteAssetsParams
    };
};