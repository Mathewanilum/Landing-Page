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
var __rest = (this && this.__rest) || function(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import {
    escapeHtml
} from '../utils/escape-html';
import {
    clone
} from '../renderer/utils/clone';
import {
    getValueByIdentifierFromContext
} from '../tags/values/get-by-identifier';
import {
    SELF_REF_PATTERN_PREFIX,
    PATTERN_PREFIX,
    PATTERN_SUFFIX,
} from '../consts';
import {
    resolveSdSchema
} from './structured-data';
export function fillInPatternBlob(patternBlob, context) {
    var blob = clone(patternBlob);
    blob.tags = blob.tags
        .map(function(_a) {
            var disabled = _a.disabled,
                tag = __rest(_a, ["disabled"]);
            var isTagDisabled = fillInDisabledValue(disabled, context, blob.tags);
            var filledTag = __assign(__assign(__assign(__assign({}, tag), (tag.props !== undefined ?
                {
                    props: fillIn(tag.props, context, blob.tags)
                } :
                {})), (tag.children !== undefined ?
                {
                    children: fillPatternValue(tag.children, context, blob.tags)
                } :
                {})), (isTagDisabled ? {
                disabled: isTagDisabled
            } : {}));
            return filledTag;
        })
        .filter(function(tag) {
            return !tag.props || !tag.props.isEmptyTag;
        });
    return blob;
}
export function fillInDisabledValue(disabled, context, tags) {
    if (!disabled) {
        return disabled;
    }
    var disabledValues = Array.isArray(disabled) ? disabled : [disabled];
    return disabledValues
        .map(function(value) {
            return fillPatternValue(value, context, tags);
        })
        .some(Boolean);
}
export function fillPatternValue(value, context, tags, referencePath) {
    if (referencePath === void 0) {
        referencePath = [];
    }
    if (typeof value !== 'string') {
        return value;
    }
    var patternRegex = new RegExp(PATTERN_PREFIX + ".+?" + PATTERN_SUFFIX, 'g');
    var patternValue = value.replace(patternRegex, replacePatternWithValue);
    return isStructuredData(value) ? resolveSdSchema(patternValue) : patternValue;

    function replacePatternWithValue(placeholder) {
        var isSelfRef = placeholder.startsWith("" + SELF_REF_PATTERN_PREFIX);
        var isFirstTimeRef = !referencePath.some(function(item) {
            return item === placeholder;
        });
        var contextPath = getContextPath(placeholder);
        return isSelfRef && isFirstTimeRef ?
            getSelfRefPatternValue() :
            getContextValue();

        function getSelfRefPatternValue() {
            referencePath.push(placeholder);
            return (getValueByIdentifierFromContext([{
                tags: tags
            }], contextPath, context, referencePath) || '');
        }

        function getContextValue() {
            var contextValue = (context && context[contextPath]) || '';
            if (typeof contextValue === 'string') {
                return escapeForJson(value, contextValue);
            } else {
                return JSON.stringify(contextValue);
            }
        }
    }
}

function isStructuredData(value) {
    if (value === void 0) {
        value = '';
    }
    return /"@context":"(http|https):\/\/(www.)?schema.org/.test(value.replace(/\s/g, ''));
}

function escapeForJson(value, contextValue) {
    if (!isStructuredData(value)) {
        return contextValue;
    }
    return escapeHtml(contextValue, {
        strictForJson: true
    });
}

function fillIn(keyValue, context, tags) {
    return Object.keys(keyValue).reduce(function(acc, curr) {
        var value = keyValue[curr];
        if (typeof value === 'string') {
            acc[curr] = fillPatternValue(value, context, tags);
        } else {
            acc[curr] = value;
        }
        if (acc[curr] === '') {
            acc.isEmptyTag = true;
        }
        return acc;
    }, {});
}

function getContextPath(initialPlaceholder) {
    var decorators = [SELF_REF_PATTERN_PREFIX, PATTERN_PREFIX, PATTERN_SUFFIX];
    return decorators.reduce(function(result, decorator) {
        return result.replace(decorator, '');
    }, initialPlaceholder);
}