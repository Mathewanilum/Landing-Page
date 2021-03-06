import {
    identifyTag
} from './identify-tag';
import {
    GENERAL_IDENTIFIERS
} from '../../types/Identifiers';
export var getSimplifiedTagLabel = function(seoTag) {
    var _a, _b;
    var type = identifyTag(seoTag);
    switch (type) {
        case GENERAL_IDENTIFIERS.LINK:
            {
                if (!(seoTag === null || seoTag === void 0 ? void 0 : seoTag.props)) {
                    return;
                }
                var _c = seoTag.props,
                    rel = _c.rel,
                    hreflang = _c.hreflang;
                return hreflang ? rel + "-" + hreflang : rel;
            }
        case GENERAL_IDENTIFIERS.OG_TAG:
            {
                return (_a = seoTag === null || seoTag === void 0 ? void 0 : seoTag.props) === null || _a === void 0 ? void 0 : _a.property;
            }
        case GENERAL_IDENTIFIERS.SATANDARD_META:
            {
                return (_b = seoTag === null || seoTag === void 0 ? void 0 : seoTag.props) === null || _b === void 0 ? void 0 : _b.name;
            }
        default:
            {
                return null;
            }
    }
};