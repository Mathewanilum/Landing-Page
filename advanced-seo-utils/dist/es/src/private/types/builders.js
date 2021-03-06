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
} from './TagTypes';
import PROPS from './Props';
import {
    IDENTIFIERS
} from './Identifiers';
import {
    twitterCardSupportedTypes
} from './twitterTagSchemas';
var TITLE = TAG_TYPES.TITLE,
    META = TAG_TYPES.META,
    LINK = TAG_TYPES.LINK,
    SCRIPT = TAG_TYPES.SCRIPT;
var TYPE = PROPS.TYPE,
    CONTENT = PROPS.CONTENT,
    REL = PROPS.REL,
    NAME = PROPS.NAME,
    PROPERTY = PROPS.PROPERTY,
    HREF = PROPS.HREF,
    HREFLANG = PROPS.HREFLANG,
    ALTERNATE = PROPS.ALTERNATE;
var buildMultilingualLink = function(href, hreflang, _a) {
    var _b;
    var _c = _a === void 0 ? {} : _a,
        _d = _c.rel,
        rel = _d === void 0 ? ALTERNATE : _d,
        _e = _c.disabled,
        disabled = _e === void 0 ? false : _e;
    return (__assign({
        type: LINK,
        props: (_b = {}, _b[REL] = rel, _b[HREF] = href, _b[HREFLANG] = hreflang, _b)
    }, (disabled ? {
        disabled: disabled
    } : {})));
};
var buildLink = function(_a) {
    var _b, _c, _d;
    var rel = _a.rel,
        href = _a.href,
        type = _a.type,
        title = _a.title,
        _e = _a.disabled,
        disabled = _e === void 0 ? false : _e;
    return (__assign({
        type: LINK,
        props: __assign(__assign((_b = {}, _b[REL] = rel, _b[HREF] = href, _b), (title ? (_c = {}, _c[PROPS.TITLE] = title, _c) : {})), (type ? (_d = {}, _d[PROPS.TYPE] = type, _d) : {}))
    }, (disabled ? {
        disabled: disabled
    } : {})));
};
var buildOgMeta = function(property, content) {
    var _a;
    return ({
        type: META,
        props: (_a = {}, _a[PROPERTY] = property, _a[CONTENT] = content, _a),
    });
};
var buildOgMetaRefs = function() {
    return [
        buildOgMeta('og:title', "{{@" + IDENTIFIERS.TITLE + "}}"),
        buildOgMeta('og:description', "{{@" + IDENTIFIERS.DESCRIPTION + "}}"),
    ];
};
var buildStandardMeta = function(name, content) {
    var _a;
    return ({
        type: META,
        props: (_a = {}, _a[NAME] = name, _a[CONTENT] = content, _a),
    });
};
var buildTwitterMeta = buildStandardMeta;
var buildStructuredData = function(_a) {
    var _b;
    var _c = _a === void 0 ? {} : _a,
        schema = _c.schema,
        schemaType = _c.schemaType,
        displayName = _c.displayName,
        variants = _c.variants,
        selectedVariant = _c.selectedVariant,
        disabled = _c.disabled;
    var isDisabledProvided = [true, false].includes(disabled) || Array.isArray(disabled);
    var meta = __assign(__assign(__assign(__assign({}, (schemaType ? {
        schemaType: schemaType
    } : {})), (displayName ? {
        displayName: displayName
    } : {})), ((variants === null || variants === void 0 ? void 0 : variants.length) ? {
            variants: variants.map(function(variant) {
                return typeof variant.schema === 'object' ?
                    __assign(__assign({}, variant), {
                        schema: JSON.stringify(variant.schema)
                    }) : variant;
            }),
        } :
        {})), (selectedVariant ? {
        selectedVariant: selectedVariant
    } : {}));
    return __assign(__assign({
        type: SCRIPT,
        props: (_b = {},
            _b[TYPE] = 'application/ld+json',
            _b),
        children: typeof schema === 'object' ? JSON.stringify(schema) : schema
    }, (Object.keys(meta).length ? {
        meta: meta
    } : {})), (isDisabledProvided ? {
        disabled: disabled
    } : {}));
};
var buildTitle = function(title) {
    return ({
        type: TITLE,
        children: title,
    });
};
var buildTwitterMetaRefs = function() {
    return [
        buildTwitterMeta('twitter:card', twitterCardSupportedTypes.SUMMARY_LARGE_IMAGE),
        buildTwitterMeta('twitter:title', "{{@" + IDENTIFIERS.OG_TITLE + "}}"),
        buildTwitterMeta('twitter:description', "{{@" + IDENTIFIERS.OG_DESCRIPTION + "}}"),
        buildTwitterMeta('twitter:image', "{{@" + IDENTIFIERS.OG_IMAGE + "}}"),
    ];
};
export {
    buildLink,
    buildOgMeta,
    buildOgMetaRefs,
    buildStandardMeta,
    buildTwitterMeta,
    buildTwitterMetaRefs,
    buildStructuredData,
    buildTitle,
    buildMultilingualLink,
};