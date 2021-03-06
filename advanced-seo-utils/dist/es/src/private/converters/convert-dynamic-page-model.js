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
    TAG_TYPES
} from '../types/TagTypes';
export function convertDynamicPageModel(payload) {
    if (!payload || Object.keys(payload).length === 0) {
        return {
            tags: [],
        };
    }
    var tags = __assign(__assign(__assign(__assign({}, (payload.description ? {
        description: payload.description
    } : {})), (payload.keywords ? {
        keywords: payload.keywords
    } : {})), {
        robots: payload.noIndex === 'true' || payload.noIndex === true ?
            'noindex' :
            'index'
    }), ((!Array.isArray(payload.metaTags) && payload.metaTags) || {}));
    var parsedTags = Object.keys(tags).reduce(function(acc, curr) {
        var _a;
        var nameOrProperty = curr.indexOf('og:') === 0 ? 'property' : 'name';
        return acc.concat({
            type: TAG_TYPES.META,
            props: (_a = {},
                _a[nameOrProperty] = curr,
                _a.content = tags[curr],
                _a),
        });
    }, []);
    if (payload.title) {
        parsedTags.push({
            type: TAG_TYPES.TITLE,
            children: payload.title,
        });
    }
    return {
        tags: parsedTags,
    };
}