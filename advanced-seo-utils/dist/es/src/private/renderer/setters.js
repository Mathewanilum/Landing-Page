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
    getValueByIdentifier,
    updateValueByIdentifier as updateValue,
} from '../tags';
import {
    IDENTIFIERS
} from '../types/Identifiers';
import {
    TAG_TYPES
} from '../types/TagTypes';
import PROPS from '../types/Props';
import {
    clone
} from './utils/clone';
import {
    isMultilingualTag
} from '../tags/advanced/is-multilingual-tag';
import {
    getRobotsTagValueWithDirective,
    ROBOTS_DIRECTIVES,
} from '../tags/robots-tag/robots-tag';
import {
    INDEX
} from '../consts/consts';

function updateValueByIdentifier(data, identifier, value, meta, enableValidation, config) {
    if (data === void 0) {
        data = {};
    }
    var tags = (data && data.tags) || [];
    var updatedTags = updateValue(tags, identifier, value, meta, enableValidation, config);
    return __assign(__assign({}, data), {
        tags: updatedTags
    });
}

function setTitle(data, title) {
    return updateValueByIdentifier(data, IDENTIFIERS.TITLE, title);
}

function setMetaTags(data, metaTags) {
    if (!metaTags || !metaTags.length) {
        return data;
    }
    var tags = (data.tags || []).filter(function(tag) {
        return tag.type !== TAG_TYPES.META;
    });
    metaTags.forEach(function(metaTag) {
        return tags.push({
            type: TAG_TYPES.META,
            props: __assign({}, metaTag),
        });
    });
    return __assign(__assign({}, data), {
        tags: tags
    });
}

function addSchema(data, json) {
    var _a;
    if (!json || typeof json !== 'object' || Array.isArray(json)) {
        return data;
    }
    var result = clone(data);
    result.tags.push({
        type: TAG_TYPES.SCRIPT,
        props: (_a = {}, _a[PROPS.TYPE] = 'application/ld+json', _a),
        children: JSON.stringify(json),
        allowMultiple: true,
    });
    return result;
}

function setSchemas(data, schemas) {
    if (!schemas || !schemas.length) {
        return data;
    }
    var result = __assign(__assign({}, data), {
        tags: (data.tags || []).filter(function(tag) {
            return tag.type !== TAG_TYPES.SCRIPT;
        })
    });
    schemas.forEach(function(schema) {
        return (result = addSchema(result, schema));
    });
    return result;
}

function getUniqueLinks(links) {
    var seenLinks = new Set();
    return links
        .reverse()
        .filter(function(link) {
            if (!link.rel || !link.href) {
                return false;
            }
            var duplicate = seenLinks.has(link.rel);
            seenLinks.add(link.rel);
            return !duplicate;
        })
        .reverse();
}

function setLinks(data, links) {
    if (links === void 0) {
        links = [];
    }
    if (!links || !links.length) {
        return data;
    }
    var tags = (data.tags || []).filter(function(tag) {
        return tag.type !== TAG_TYPES.LINK;
    });
    getUniqueLinks(links).forEach(function(link) {
        return tags.push({
            type: TAG_TYPES.LINK,
            props: __assign({}, link),
        });
    });
    return __assign(__assign({}, data), {
        tags: tags
    });
}

function setExternalRouter(data, payload) {
    var tags = (data === null || data === void 0 ? void 0 : data.tags) || [];
    var title = payload.title,
        metaTags = payload.metaTags,
        links = payload.links,
        structuredData = payload.structuredData;
    if ((title === null || title === void 0 ? void 0 : title.constructor.name) === String.name) {
        tags = setTitle({
            tags: tags
        }, title).tags;
    }
    if ((metaTags === null || metaTags === void 0 ? void 0 : metaTags.constructor.name) === Array.name) {
        tags = setMetaTags({
            tags: tags
        }, metaTags).tags;
    }
    if ((links === null || links === void 0 ? void 0 : links.constructor.name) === Array.name) {
        tags = setLinks({
            tags: tags
        }, links).tags;
    }
    if ((structuredData === null || structuredData === void 0 ? void 0 : structuredData.constructor.name) === Array.name) {
        tags = setSchemas({
            tags: tags
        }, structuredData).tags;
    }
    return __assign(__assign({}, data), {
        tags: tags
    });
}

function setDescription(data, description) {
    return updateValueByIdentifier(data, IDENTIFIERS.DESCRIPTION, description);
}

function setCanonical(data, canonical) {
    return updateValueByIdentifier(data, IDENTIFIERS.CANONICAL, canonical);
}

function setIndexable(data, indexable) {
    var robotsTagValue = getValueByIdentifier(data, IDENTIFIERS.ROBOTS);
    var newRobotsTagValue = indexable ?
        getRobotsTagValueWithDirective(robotsTagValue, INDEX) :
        getRobotsTagValueWithDirective(robotsTagValue, ROBOTS_DIRECTIVES.NOINDEX);
    return updateValueByIdentifier(data, IDENTIFIERS.ROBOTS, newRobotsTagValue);
}

function removeTagsByType(data, type) {
    if (!data) {
        return data;
    }
    if (type === TAG_TYPES.LINK) {
        return removeLinkTags(data);
    }
    return __assign(__assign({}, data), {
        tags: (data.tags || []).filter(function(tag) {
            return tag.type !== type;
        })
    });
}

function removeLinkTags(data) {
    return __assign(__assign({}, data), {
        tags: (data.tags || []).filter(function(tag) {
            return tag.type !== TAG_TYPES.LINK || isMultilingualTag(tag);
        })
    });
}
export {
    addSchema,
    setCanonical,
    setDescription,
    setExternalRouter,
    setIndexable,
    setLinks,
    setMetaTags,
    setSchemas,
    setTitle,
    removeTagsByType,
    updateValueByIdentifier,
};