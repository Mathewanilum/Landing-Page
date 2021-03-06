import {
    RSS_ROUTE_TYPES
} from './consts';
import {
    getBlogFeedRoute
} from './get-verticals-rss-route';
export var getRssTitle = function(siteName) {
    return siteName + " - RSS";
};
var trimTrailingSlash = function(mapping) {
    if (mapping === void 0) {
        mapping = '';
    }
    return mapping === null || mapping === void 0 ? void 0 : mapping.replace(/\/+$/, '');
};
export var getRssFullURL = function(_a) {
    var siteUrl = _a.siteUrl,
        rssRoute = _a.rssRoute;
    if (siteUrl) {
        return trimTrailingSlash(siteUrl) + "/" + rssRoute;
    } else {
        return '';
    }
};
export var getRssRoute = function(_a) {
    var _b = _a === void 0 ? {} : _a,
        rssRouteType = _b.rssRouteType,
        _c = _b.payload,
        payload = _c === void 0 ? {} : _c;
    switch (rssRouteType) {
        case RSS_ROUTE_TYPES.BLOG:
            var _d = payload.item,
                item = _d === void 0 ? {} : _d;
            return getBlogFeedRoute(item);
        default:
            break;
    }
};