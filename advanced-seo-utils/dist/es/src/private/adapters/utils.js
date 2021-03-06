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
var __spreadArrays = (this && this.__spreadArrays) || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import {
    get,
    getRawValue
} from '../utils/get';
import {
    CONTEXT_PROPS
} from '../types/ContextProps';
import {
    buildOgImagePreviewUrl
} from '../utils/build-og-image-preview';
export var getKeys = function(IDs, userVisible) {
    var keysMetaData = Object.values(IDs).reduce(function(acc, val) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[val] = {
            userVisibility: userVisible.includes(val)
        }, _a)));
    }, {});
    return Object.values(IDs).map(function(key) {
        return (__assign({
            key: key
        }, keysMetaData[key]));
    });
};
export var siteIDs = {
    SITE_NAME: 'site.name',
    PAGE_NAME: 'page.name',
    SITE_URL: 'site.url',
    INDEX_SITE: 'site.index',
    ROBOTS_FROM_USER_PATTERN: 'userPatterns.robots',
    SITE_IMAGE: 'site.image',
    SITE_IMAGE_WIDTH: 'site.imageWidth',
    SITE_IMAGE_HEIGHT: 'site.imageHeight',
    FB_ADMINS: 'site.facebookAdminId',
    NEXT: 'site.nextLink',
    PREV: 'site.prevLink',
    BUSINESS_NAME: 'site.business.name',
    BUSINESS_LOCATION_COUNTRY: 'site.business.location.country',
    BUSINESS_LOCATION_STATE: 'site.business.location.state',
    BUSINESS_LOCATION_CITY: 'site.business.location.city',
    BUSINESS_LOCATION_STREET: 'site.business.location.street',
    BUSINESS_LOCATION_STREET_NUMBER: 'site.business.location.street.number',
    BUSINESS_LOCATION_DESCRIPTION: 'site.business.location.description',
    BUSINESS_POSTAL_CODE: 'site.business.postal.code',
    BUSINESS_DESCRIPTION: 'site.business.description',
    BUSINESS_LOGO: 'site.business.logo',
    BUSINESS_LOCALE: 'site.business.locale',
    EXPERIMENTS: 'site.experiments',
};
var userVisibleSiteKeys = [
    siteIDs.SITE_NAME,
    siteIDs.BUSINESS_NAME,
    siteIDs.BUSINESS_LOCATION_COUNTRY,
    siteIDs.BUSINESS_LOCATION_STATE,
    siteIDs.BUSINESS_LOCATION_CITY,
    siteIDs.BUSINESS_LOCATION_STREET,
    siteIDs.BUSINESS_LOCATION_DESCRIPTION,
    siteIDs.BUSINESS_DESCRIPTION,
    siteIDs.BUSINESS_LOGO,
];
export var getSiteData = function(item) {
    var _a;
    return _a = {},
        _a[siteIDs.SITE_NAME] = get(item, "context." + CONTEXT_PROPS.SITE_NAME),
        _a[siteIDs.PAGE_NAME] = get(item, "context." + CONTEXT_PROPS.PAGE_NAME),
        _a[siteIDs.SITE_URL] = get(item, "context." + CONTEXT_PROPS.SITE_URL),
        _a[siteIDs.INDEX_SITE] = getRawValue(item, "context." + CONTEXT_PROPS.INDEX_SITE),
        _a[siteIDs.ROBOTS_FROM_USER_PATTERN] = getRawValue(item, "context." + CONTEXT_PROPS.ROBOTS_FROM_USER_PATTERN),
        _a[siteIDs.SITE_IMAGE] = get(item, "context." + CONTEXT_PROPS.SITE_OG_IMAGE),
        _a[siteIDs.SITE_IMAGE_WIDTH] = get(item, "context." + CONTEXT_PROPS.OG_IMAGE_WIDTH),
        _a[siteIDs.SITE_IMAGE_HEIGHT] = get(item, "context." + CONTEXT_PROPS.OG_IMAGE_HEIGHT),
        _a[siteIDs.FB_ADMINS] = get(item, "context." + CONTEXT_PROPS.FB_ADMINS),
        _a[siteIDs.NEXT] = get(item, "context." + CONTEXT_PROPS.NEXT),
        _a[siteIDs.PREV] = get(item, "context." + CONTEXT_PROPS.PREV),
        _a[siteIDs.BUSINESS_NAME] = get(item, "context." + CONTEXT_PROPS.BUSINESS_NAME),
        _a[siteIDs.BUSINESS_LOCATION_COUNTRY] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCATION_COUNTRY),
        _a[siteIDs.BUSINESS_LOCATION_STATE] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCATION_STATE),
        _a[siteIDs.BUSINESS_LOCATION_CITY] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCATION_CITY),
        _a[siteIDs.BUSINESS_LOCATION_STREET] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCATION_STREET),
        _a[siteIDs.BUSINESS_LOCATION_STREET_NUMBER] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCATION_STREET_NUMBER),
        _a[siteIDs.BUSINESS_LOCATION_DESCRIPTION] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCATION_DESCRIPTION),
        _a[siteIDs.BUSINESS_POSTAL_CODE] = get(item, "context." + CONTEXT_PROPS.BUSINESS_POSTAL_CODE),
        _a[siteIDs.BUSINESS_DESCRIPTION] = get(item, "context." + CONTEXT_PROPS.BUSINESS_DESCRIPTION),
        _a[siteIDs.BUSINESS_LOGO] = buildOgImagePreviewUrl({
            url: get(item, "context." + CONTEXT_PROPS.BUSINESS_LOGO),
        }),
        _a[siteIDs.BUSINESS_LOCALE] = get(item, "context." + CONTEXT_PROPS.BUSINESS_LOCALE),
        _a[siteIDs.EXPERIMENTS] = getRawValue(item, "context." + CONTEXT_PROPS.EXPERIMENTS),
        _a;
};
var getMissingSchemaVariables = function(requiredSchemaVariables) {
    return function(item) {
        var siteData = getSiteData(item);
        return requiredSchemaVariables.filter(function(variable) {
            return !siteData[variable];
        });
    };
};
export var hasMissingSchemaVariables = function(requiredSchemaVariables, item) {
    return getMissingSchemaVariables(requiredSchemaVariables)(item).length > 0;
};
export function enrichWithSiteLevelData(adapter) {
    var IDs = __assign(__assign({}, siteIDs), adapter.IDs);
    return __assign(__assign({
        requiredSchemaVariables: []
    }, adapter), {
        IDs: IDs,
        getMissingSchemaVariables: getMissingSchemaVariables(adapter.requiredSchemaVariables),
        getData: function(item) {
            return (__assign(__assign({}, getSiteData(item)), adapter.getData(item)));
        },
        getKeys: function(_a) {
            var _b = (_a === void 0 ? {} : _a).exposeBusinessKeys,
                exposeBusinessKeys = _b === void 0 ? false : _b;
            return __spreadArrays((exposeBusinessKeys ? getKeys(siteIDs, userVisibleSiteKeys) : []), adapter.getKeys());
        }
    });
}