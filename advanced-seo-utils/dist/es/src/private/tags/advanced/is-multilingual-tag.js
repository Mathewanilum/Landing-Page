import {
    getSimplifiedTagLabel
} from './get-simplified-tag-label';
import Props from '../../types/Props';
export function isMultilingualTag(tag) {
    if (!tag || typeof tag !== 'object') {
        return false;
    }
    var label = getSimplifiedTagLabel(tag);
    return Boolean(label === null || label === void 0 ? void 0 : label.startsWith(Props.ALTERNATE + "-"));
}