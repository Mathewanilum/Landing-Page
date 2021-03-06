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
    getValueByIdentifier as getValue,
    getSchemasArray,
} from '../tags/values/get-by-identifier';
import {
    IDENTIFIERS
} from '../types/Identifiers';
import {
    TAG_TYPES
} from '../types/TagTypes';
import {
    renderToStaticMarkup
} from './render-to-static-markup';
import {
    updateValueByIdentifier
} from './setters';
import {
    identify
} from './utils/identify';
import {
    clone
} from './utils/clone';

function getValueByIdentifier(_a, identifier) {
    var tags = (_a === void 0 ? {} : _a).tags;
    return getValue(tags, identifier);
}

function addMetaTag(data, props) {
    var identifier = identify({
        type: TAG_TYPES.META,
        props: props,
    });
    if (identifier) {
        return updateValueByIdentifier(data, identifier, props.content);
    }
    var result = clone(data);
    result.tags.push({
        type: TAG_TYPES.META,
        props: props,
    });
    return result;
}

function getTitle(data) {
    return getValueByIdentifier(data, IDENTIFIERS.TITLE);
}

function getDescription(data) {
    return getValueByIdentifier(data, IDENTIFIERS.DESCRIPTION);
}

function getCanonical(data) {
    return getValueByIdentifier(data, IDENTIFIERS.CANONICAL);
}

function getMetaTags(data, filter) {
    var tags = (data || {}).tags;
    if (Array.isArray(tags)) {
        return tags.reduce(function(acc, curr) {
            if (curr && curr.type === TAG_TYPES.META && curr.props) {
                if (filter) {
                    var matches = Object.keys(filter).every(function(key) {
                        return curr.props[key] === filter[key];
                    });
                    if (!matches) {
                        return acc;
                    }
                }
                return acc.concat(curr.props);
            }
            return acc;
        }, []);
    }
    return [];
}

function getSchemas(_a, options) {
    var tags = (_a === void 0 ? {} : _a).tags;
    return getSchemasArray(tags, options);
}

function getLinks(data) {
    if (data === void 0) {
        data = {};
    }
    var tags = data.tags || [];
    return tags
        .filter(function(tag) {
            return tag.type === TAG_TYPES.LINK &&
                tag.props &&
                tag.props.rel !== IDENTIFIERS.CANONICAL.toLowerCase();
        })
        .map(function(tag) {
            return (__assign({}, tag.props));
        });
}

function getStaticMarkup(tags, options) {
    if (options === void 0) {
        options = {
            logError: function() {}
        };
    }
    return renderToStaticMarkup(tags, options).join('\n');
}
export {
    addMetaTag,
    getCanonical,
    getDescription,
    getLinks,
    getMetaTags,
    getSchemas,
    getStaticMarkup,
    getTitle,
    getValueByIdentifier,
};