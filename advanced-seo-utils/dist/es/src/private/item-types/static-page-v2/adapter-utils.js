import {
    CONTEXT_PROPS
} from '../../types/ContextProps';
import {
    get,
    getRawValue
} from '../../utils/get';
import {
    sanitizeUrl
} from '../../converters/index';
var removeTrailingSlash = function(url) {
    return url.replace(/\/+$/, '');
};
export var getPageUrl = function(item) {
    if (item === void 0) {
        item = {};
    }
    var siteUrl = get(item, "context." + CONTEXT_PROPS.SITE_URL);
    var defaultUrl = get(item, "context." + CONTEXT_PROPS.DEFAULT_URL);
    var isHomePage = getRawValue(item, "context." + CONTEXT_PROPS.IS_HOME_PAGE);
    var urlWithoutQuery = defaultUrl.split('?')[0];
    var isCurrentHomePage = removeTrailingSlash(urlWithoutQuery) === removeTrailingSlash(siteUrl);
    var url = isHomePage && !isCurrentHomePage ? siteUrl : defaultUrl;
    return sanitizeUrl(url);
};