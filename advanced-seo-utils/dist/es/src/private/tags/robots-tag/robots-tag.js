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
    IDENTIFIERS
} from '../../types/Identifiers';
import {
    TAG_SCHEMAS
} from '../../types/TagSchemas';
import {
    getValueByIdentifier
} from '../values/get-by-identifier';
import {
    updateValueByIdentifier
} from '../values/update-by-identifier';
var ROBOTS_DIRECTIVE_NAME_VALUE_SEPARATOR = ':';
export var ROBOTS_DIRECTIVES = {
    NOINDEX: 'noindex',
    NOFOLLOW: 'nofollow',
    NOSNIPPET: 'nosnippet',
    NOARCHIVE: 'noarchive',
    NOIMAGEINDEX: 'noimageindex',
    MAX_IMAGE_PREVIEW: 'max-image-preview',
    MAX_SNIPPET: 'max-snippet',
    MAX_VIDEO_PREVIEW: 'max-video-preview',
};
export var MAX_IMAGE_PREVIEW_VALUES = {
    NONE: 'none',
    STANDARD: 'standard',
    LARGE: 'large',
};
export var MAX_SNIPPET_DEFAULT_VALUE = '-1';
export var MAX_VIDEO_PREVIEW_DEFAULT_VALUE = '-1';
var INDEX = 'index';
var noindexRelatedDirectiveNames = new Set([
    ROBOTS_DIRECTIVES.NOINDEX,
    INDEX,
]);
export var REMOVE_ROBOTS_DIRECTIVE_OVERRIDE_VALUE = '$remove$';
var robotsTagSchema = TAG_SCHEMAS[IDENTIFIERS.ROBOTS];
var toCanonicalForm = function(directive) {
    return directive.toLowerCase();
};
var sortDirectives = function(directives) {
    return __spreadArrays(directives).sort(function(firstDirective, otherDirective) {
        return firstDirective.localeCompare(otherDirective);
    });
};
var removeTrailingComma = function(directive) {
    return directive.replace(/,$/g, '');
};
var getDirectiveNameValuePair = function(directive) {
    if (directive === undefined) {
        return [undefined, undefined];
    }
    var nameValueSeparatorIndex = directive.lastIndexOf(ROBOTS_DIRECTIVE_NAME_VALUE_SEPARATOR);
    if (nameValueSeparatorIndex === -1) {
        return [directive, undefined];
    }
    return [
        directive.slice(0, nameValueSeparatorIndex),
        directive.slice(nameValueSeparatorIndex + 1),
    ];
};
var createDirective = function(directive, value) {
    return value !== undefined ?
        "" + directive + ROBOTS_DIRECTIVE_NAME_VALUE_SEPARATOR + value :
        directive;
};
var getDirectiveNameFromDirective = function(directive) {
    return getDirectiveNameValuePair(directive)[0];
};
var getDirectiveValueFromDirective = function(directive) {
    return getDirectiveNameValuePair(directive)[1];
};
var getDirectives = function(robotsTagValue) {
    return (robotsTagValue !== null && robotsTagValue !== void 0 ? robotsTagValue : '')
        .split(' ')
        .filter(function(directive) {
            return directive !== '';
        })
        .map(removeTrailingComma)
        .map(toCanonicalForm);
};
var getRobotsTagValue = function(directives) {
    return sortDirectives(directives)
        .filter(function(directive) {
            return directive !== '';
        })
        .map(removeTrailingComma)
        .map(toCanonicalForm)
        .join(', ');
};
var isVariable = function(directive) {
    return directive && directive.startsWith('{{');
};
var mergeDirectives = function(specificDirectives, generalDirectives) {
    var directiveNameToDirective = new Map();
    var allDirectives = __spreadArrays(generalDirectives, specificDirectives);
    allDirectives.forEach(function(directive) {
        if (isVariable(directive)) {
            // if the directive is a variable, remove all existing variables
            Array.from(directiveNameToDirective.values()).forEach(function(currentDirective) {
                if (isVariable(currentDirective)) {
                    directiveNameToDirective.delete(getDirectiveNameFromDirective(currentDirective));
                }
            });
        }
        var directiveName = getDirectiveNameFromDirective(directive);
        if (noindexRelatedDirectiveNames.has(directiveName)) {
            // if the directive is related to noindex, remove all existing directives related to noindex
            noindexRelatedDirectiveNames.forEach(function(relatedDirectiveName) {
                directiveNameToDirective.delete(relatedDirectiveName);
            });
        }
        directiveNameToDirective.set(getDirectiveNameFromDirective(directive), directive);
    });
    var mergedDirectives = Array.from(directiveNameToDirective.values());
    if (mergedDirectives.some(function(directive) {
            return !isVariable(directive);
        })) {
        // if there's at least one non-variable directive remove all variables
        return mergedDirectives.filter(function(directive) {
            return !isVariable(directive);
        });
    }
    return mergedDirectives;
};
export var mergeRobotsTags = function(specificRobotsTag, generalRobotsTag) {
    var specificRobotsValue = robotsTagSchema.getValue(specificRobotsTag);
    var generalRobotsValue = robotsTagSchema.getValue(generalRobotsTag);
    var mergedValue = mergeRobotsValues(specificRobotsValue, generalRobotsValue);
    var mergedTag = __assign({}, specificRobotsTag);
    robotsTagSchema.setValue(mergedTag, mergedValue);
    return mergedTag;
};
export var mergeRobotsValues = function(specificRobotsValue, generalRobotsValue) {
    var specificDirectives = getDirectives(specificRobotsValue);
    var generalDirectives = getDirectives(generalRobotsValue);
    var mergedDirectives = mergeDirectives(specificDirectives, generalDirectives);
    var mergedValue = getRobotsTagValue(mergedDirectives);
    return mergedValue;
};
export var isRobotsDirectiveExists = function(robotsTagValue, directiveName) {
    return getDirectives(robotsTagValue).some(function(currentDirective) {
        var _a = getDirectiveNameValuePair(currentDirective),
            name = _a[0],
            value = _a[1];
        return (name === directiveName && value !== REMOVE_ROBOTS_DIRECTIVE_OVERRIDE_VALUE);
    });
};
export var getDirectiveValue = function(robotsTagValue, directiveName) {
    var directive = getDirectives(robotsTagValue).find(function(currentDirective) {
        return getDirectiveNameFromDirective(currentDirective) === directiveName;
    });
    return directive && getDirectiveValueFromDirective(directive);
};
export var getRobotsTagValueWithDirective = function(robotsTagValue, directiveName, directiveValue) {
    if (directiveValue === void 0) {
        directiveValue = undefined;
    }
    var newDirective = createDirective(directiveName, directiveValue);
    var existingDirectives = getDirectives(robotsTagValue);
    var newDirectives = mergeDirectives([newDirective], existingDirectives);
    return getRobotsTagValue(newDirectives);
};
export var getRobotsTagValueWithoutDirective = function(robotsTagValue, directiveName) {
    var newDirectives = getDirectives(robotsTagValue).filter(function(directive) {
        return getDirectiveNameFromDirective(directive) !== directiveName;
    });
    return getRobotsTagValue(newDirectives);
};
export var formatRobotsTagForRendering = function(tags) {
    var robotsTagValue = getValueByIdentifier(tags, IDENTIFIERS.ROBOTS);
    var directives = getDirectives(robotsTagValue)
        .filter(function(directive) {
            return getDirectiveNameFromDirective(directive) !== '';
        })
        .filter(function(directive) {
            return getDirectiveValueFromDirective(directive) !==
                REMOVE_ROBOTS_DIRECTIVE_OVERRIDE_VALUE;
        });
    var updatedValue = getRobotsTagValue(directives);
    return updateValueByIdentifier(tags, IDENTIFIERS.ROBOTS, updatedValue);
};
export var isRobotsTagValueSupported = function(robotsTagValue) {
    var supportedRobotDirectives = new Set(__spreadArrays(Array.from(Object.values(ROBOTS_DIRECTIVES)), [
        INDEX,
    ]));
    return getDirectives(robotsTagValue).every(function(directive) {
        var directiveName = getDirectiveNameFromDirective(directive);
        return supportedRobotDirectives.has(directiveName) || isVariable(directive);
    });
};