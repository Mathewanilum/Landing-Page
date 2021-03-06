import {
    TAG_SCHEMAS
} from '../../types/TagSchemas';
import {
    isEmpty
} from '../../utils/is-empty';
import {
    buildTagByValueAndIdentifier
} from '../utils/build-tag-by-value';
import {
    updateValueBySchema
} from './update-by-schema';
export var updateValueByIdentifier = function(tags, identifier, value, meta, enableValidation, _a) {
    if (tags === void 0) {
        tags = [];
    }
    if (enableValidation === void 0) {
        enableValidation = true;
    }
    var _b = (_a === void 0 ? {} : _a).allowEmptyForValidation,
        allowEmptyForValidation = _b === void 0 ? false : _b;
    var tag = buildTagByValueAndIdentifier(value, identifier, {
        enableValidation: enableValidation,
    });
    if (isEmpty(tag)) {
        return tags;
    }
    if (meta) {
        tag.meta = meta;
    }
    var tagSchema = TAG_SCHEMAS[identifier];
    return updateValueBySchema({
        tags: tags,
        tagSchema: tagSchema,
        value: value,
        meta: meta,
        allowEmptyForValidation: allowEmptyForValidation,
    });
};