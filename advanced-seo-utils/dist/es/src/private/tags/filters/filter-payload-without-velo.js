import {
    resolvePayload
} from '../../renderer/resolve-payload';
import {
    TAG_TYPES
} from '../../types/TagTypes';
import {
    removeTagsByType
} from '../../renderer/setters';
var TAGS_EXCLUDE_BY_VELO = [TAG_TYPES.META, TAG_TYPES.LINK, TAG_TYPES.SCRIPT];
var hasType = function(tags, typeToCheck) {
    return tags.some(function(_a) {
        var type = _a.type;
        return type === typeToCheck;
    });
};
export var filterPayloadWithoutVelo = function(payload, veloOverrides, options) {
    if (veloOverrides === void 0) {
        veloOverrides = {};
    }
    if (options === void 0) {
        options = {
            logError: function() {}
        };
    }
    var resolvedPayload = resolvePayload(payload, options);
    var tags = veloOverrides.tags;
    if (!tags) {
        return resolvedPayload;
    }
    TAGS_EXCLUDE_BY_VELO.forEach(function(tagType) {
        if (hasType(tags, tagType)) {
            resolvedPayload = removeTagsByType(resolvedPayload, tagType);
        }
    });
    return resolvedPayload;
};