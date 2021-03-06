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
    isEmpty
} from '../../utils/is-empty';
import {
    validateTagStructure
} from '../utils/validate-tag-structure';
import {
    TAG_SCHEMAS
} from '../../types/TagSchemas';
import {
    resolvePayload
} from '../../renderer/resolve-payload';
import {
    fillPatternValue
} from '../../patterns/fill-in-pattern-blob';
import {
    IDENTIFIERS
} from '../../types/Identifiers';
import {
    PATTERN_PREFIX,
    PATTERN_SUFFIX
} from '../../consts';
import {
    resolveStructuredData
} from '../structured-data/resolve-structured-data';
import {
    resolveSdSchema
} from '../../patterns/structured-data/resolve-sd-schema';
export function getValueByIdentifier(tags, identifier) {
    var result = findTag(tags, identifier);
    return result ? getValueFromTag(result, identifier) : result;
}
export function getDisabledByIdentifier(_a, identifier) {
    var tags = (_a === void 0 ? {} : _a).tags;
    var result = findTag(tags, identifier);
    return result ? getDisabledTag(result) : false;
}

function getDisabledTag(tag) {
    if (isEmpty(tag)) {
        return false;
    }
    return tag.disabled;
}
export function getValueByIdentifierFromContext(payload, identifier, context, referencePath) {
    var tags = resolvePayload(payload).tags;
    var result = findTag(tags, identifier);
    return result ?
        getValueFromTagUsingContext(result, identifier, context, tags, referencePath) :
        result;
}
export function getMetaByIdentifier(tags, identifier) {
    var result = findTag(tags, identifier);
    return (result ? result.meta : null) || {};
}
export function getSchemasArray(tags, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.withMeta,
        withMeta = _c === void 0 ? false : _c,
        defaultSchema = _b.defaultSchema,
        _d = _b.logError,
        logError = _d === void 0 ? function() {} : _d;
    if (isEmpty(tags)) {
        return [];
    }
    var tagSchema = TAG_SCHEMAS[IDENTIFIERS.STRUCTURED_DATA];
    return resolveStructuredData(tags)
        .filter(function(tag) {
            return validateTagStructure(tag, tagSchema);
        })
        .map(function(tag) {
            var _a = tag.meta || {},
                schemaType = _a.schemaType,
                variants = _a.variants,
                selectedVariant = _a.selectedVariant,
                displayName = _a.displayName;
            var schema = '';
            try {
                schema = JSON.parse(resolveSdSchema(tagSchema.getValue(tag)));
                if (!Object.keys(schema).length) {
                    throw new Error('Error parsing structured data schema');
                }
            } catch (error) {
                logError({
                    error: error,
                    data: {
                        value: tag
                    }
                });
                schema = getDefaultSchema(defaultSchema === null || defaultSchema === void 0 ? void 0 : defaultSchema.tags, selectedVariant) || '{}';
            }
            return withMeta ?
                __assign(__assign(__assign(__assign({
                    schema: schema,
                    schemaType: schemaType
                }, (variants ? {
                    variants: variants
                } : {})), (selectedVariant ? {
                    selectedVariant: selectedVariant
                } : {})), (displayName ? {
                    displayName: displayName
                } : {})), {
                    disabled: isDisabled(tag.disabled)
                }) : schema;
        });
}

function getDefaultSchema(defaultTags, selectedVariant) {
    var _a, _b, _c;
    if (!defaultTags) {
        return '';
    }
    if (!selectedVariant) {
        return getValueByIdentifier(defaultTags, IDENTIFIERS.STRUCTURED_DATA);
    }
    var defaultTag = findTag(defaultTags, IDENTIFIERS.STRUCTURED_DATA);
    return (((_c = (_b = (_a = defaultTag === null || defaultTag === void 0 ? void 0 : defaultTag.meta) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.find(function(variant) {
        return variant.schemaType === selectedVariant;
    })) === null || _c === void 0 ? void 0 : _c.schema) || '');
}

function findTag(tags, identifier) {
    if (!tags || !identifier) {
        return null;
    }
    var tag = getTagByIdentifier(tags, identifier);
    if (isEmpty(tag)) {
        return undefined;
    }
    return tag;
}
export function getTagsByIdentifier(tags, identifier) {
    var tagSchema = TAG_SCHEMAS[identifier];
    if (isEmpty(tagSchema) || isEmpty(tags) || !Array.isArray(tags)) {
        return [];
    }
    return tags.filter(function(tag) {
        return validateTagStructure(tag, tagSchema);
    });
}

function getTagByIdentifier(tags, identifier) {
    var tagSchema = TAG_SCHEMAS[identifier];
    if (isEmpty(tagSchema) || isEmpty(tags) || !Array.isArray(tags)) {
        return {};
    }
    return tags
        .slice()
        .reverse()
        .find(function(tag) {
            return validateTagStructure(tag, tagSchema);
        });
}

function getValueFromTagUsingContext(tag, identifier, context, tags, referencePath) {
    var tagSchema = identifier && TAG_SCHEMAS[identifier];
    if (isEmpty(tag) || isEmpty(tagSchema)) {
        return '';
    }
    var value = tagSchema.getValue(tag);
    if (value.search(/{{.+?}}/g) !== -1) {
        return fillPatternValue(value, context, tags, referencePath);
    } else {
        return value === 'undefined' ? undefined : value;
    }
}

function getValueFromTag(tag, identifier) {
    var tagSchema = identifier && TAG_SCHEMAS[identifier];
    if (isEmpty(tag) || isEmpty(tagSchema)) {
        return '';
    }
    return tagSchema.getValue(tag);
}

function isDisabled(value) {
    if (!value || value === 'false' || Array.isArray(value)) {
        return false;
    }
    if (typeof value === 'string') {
        var isVariable = [PATTERN_PREFIX, PATTERN_SUFFIX].every(function(affix) {
            return value === null || value === void 0 ? void 0 : value.includes(affix);
        });
        return !isVariable;
    }
    return Boolean(value);
}