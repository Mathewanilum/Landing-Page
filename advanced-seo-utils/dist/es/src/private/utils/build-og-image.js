import {
    getValueByIdentifier as getValue
} from '../tags/values/get-by-identifier';
import {
    updateValueByIdentifier
} from '../tags/values/update-by-identifier';
import {
    IDENTIFIERS
} from '../types/Identifiers';
import {
    TAG_TYPES
} from '../types/TagTypes';
import PROPS from '../types/Props';
import {
    isAbsoluteUrl
} from './is-absolute-url';
import {
    extractImageNameFromWixMediaUrl
} from './extract-image-name-from-wix-media-url';
import {
    isEmpty
} from './is-empty';
var OG_IMAGE = IDENTIFIERS.OG_IMAGE,
    OG_IMAGE_WIDTH = IDENTIFIERS.OG_IMAGE_WIDTH,
    OG_IMAGE_HEIGHT = IDENTIFIERS.OG_IMAGE_HEIGHT;
export var DEFAULT_WIDTH = 2500;
export var DEFAULT_HEIGHT = 1330;
var MAX_IMAGE_PIXELS = 5100 * 5100;
export function buildOgImageFullUrl(url) {
    var urlOrName = url;
    if (!urlOrName || urlOrName === '') {
        return undefined;
    }
    if (isAbsoluteUrl(urlOrName)) {
        urlOrName = extractImageNameFromWixMediaUrl(urlOrName);
    }
    if (!urlOrName) {
        return url;
    }
    return "https://static.wixstatic.com/media/" + urlOrName;
}
export function buildOgImage(tags) {
    var result = {
        src: '',
        width: '',
        height: ''
    };
    var urlOrName = getValue(tags, OG_IMAGE);
    if (!urlOrName) {
        return result;
    }
    result.src = urlOrName;
    if (isAbsoluteUrl(urlOrName)) {
        urlOrName = extractImageNameFromWixMediaUrl(urlOrName);
    }
    if (!urlOrName) {
        return result;
    }
    result.src = "https://static.wixstatic.com/media/" + urlOrName;
    var meta = getOgImageMeta(tags);
    if (meta && meta.width && meta.height) {
        var resized = resizeImage(meta.width, meta.height, DEFAULT_WIDTH);
        result.src += "/v1/fill/w_" + resized.width + ",h_" + resized.height + ",al_c/" + urlOrName;
        result.width = "" + resized.width;
        result.height = "" + resized.height;
    } else {
        var width = getValue(tags, OG_IMAGE_WIDTH);
        var height = getValue(tags, OG_IMAGE_HEIGHT);
        if (width && height) {
            if (width * height > MAX_IMAGE_PIXELS) {
                var resized = resizeImage(width, height, DEFAULT_WIDTH);
                result.src += "/v1/fill/w_" + resized.width + ",h_" + resized.height + ",al_c/" + urlOrName;
                result.width = "" + resized.width;
                result.height = "" + resized.height;
            } else {
                result.src += "/v1/fill/w_" + width + ",h_" + height + ",al_c/" + urlOrName;
            }
        } else {
            result.src += "/v1/fit/w_" + DEFAULT_WIDTH + ",h_" + DEFAULT_HEIGHT + ",al_c/" + urlOrName;
            result.width = "" + DEFAULT_WIDTH;
            result.height = "" + DEFAULT_HEIGHT;
        }
    }
    return result;
}
export function applyOgImageModifications(tags) {
    var _a = buildOgImage(tags),
        src = _a.src,
        width = _a.width,
        height = _a.height;
    return [
        [OG_IMAGE, src],
        [OG_IMAGE_WIDTH, width],
        [OG_IMAGE_HEIGHT, height],
    ].reduce(function(acc, curr) {
        var identifier = curr[0],
            value = curr[1];
        if (value) {
            var newTags = void 0;
            if (identifier === OG_IMAGE) {
                newTags = updateRelatedOgImagesFields(tags, value);
            }
            newTags = updateValueByIdentifier(acc, identifier, value);
            return newTags;
        } else {
            return acc;
        }
    }, tags);
}

function resizeImage(width, height, maxWidth, maxHeight) {
    if (maxHeight === void 0) {
        maxHeight = DEFAULT_HEIGHT;
    }
    width = parseInt(width, 10);
    height = parseInt(height, 10);
    if (width > maxWidth || height > maxHeight) {
        return {
            width: maxWidth,
            height: Math.floor((height / width) * maxWidth),
        };
    }
    return {
        width: width,
        height: height
    };
}

function getOgImageMeta(tags) {
    var ogImage = tags.find(function(tag) {
        var type = tag.type,
            _a = tag.props,
            props = _a === void 0 ? {} : _a,
            meta = tag.meta;
        if (type === TAG_TYPES.META) {
            return props[PROPS.PROPERTY] === 'og:image' && !isEmpty(meta);
        }
        return false;
    });
    return (ogImage || {}).meta;
}
export function updateRelatedOgImagesFields(tags, newOgImageValue) {
    var isMeta = function(type) {
        return type === TAG_TYPES.META;
    };
    var isOgImage = function(props) {
        return props && props[PROPS.PROPERTY] === 'og:image';
    };
    var ogImage = tags.find(function(_a) {
        var type = _a.type,
            props = _a.props;
        return isMeta(type) && isOgImage(props);
    });
    if (ogImage) {
        var originalOgImageValue_1 = ogImage.props.content;
        var isEndsWithImage_1 = function(props) {
            return props[PROPS.PROPERTY].endsWith('image');
        };
        var hasOldOgImageValue_1 = function(props) {
            return props[PROPS.CONTENT] && props[PROPS.CONTENT] === originalOgImageValue_1;
        };
        var isPropertyExists_1 = function(props) {
            return props && typeof props[PROPS.PROPERTY] === 'string';
        };
        var isOgImageRelated = function(_a) {
            var type = _a.type,
                props = _a.props;
            return isMeta(type) &&
                isPropertyExists_1(props) &&
                isEndsWithImage_1(props) &&
                hasOldOgImageValue_1(props);
        };
        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
            var tag = tags_1[_i];
            if (isOgImageRelated(tag) && !isOgImage(tag.props)) {
                tag.props[PROPS.CONTENT] = newOgImageValue;
            }
        }
    }
    return tags;
}