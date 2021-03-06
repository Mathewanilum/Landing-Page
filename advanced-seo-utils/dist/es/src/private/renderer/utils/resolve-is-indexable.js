import {
    IDENTIFIERS
} from '../../types/Identifiers';
import {
    updateValueByIdentifier
} from '../../tags/values/update-by-identifier';
import {
    getValueByIdentifier
} from '../../tags/values/get-by-identifier';
import {
    adapter as staticPageAdapterV2
} from '../../item-types/static-page-v2';
import {
    enrichWithSiteLevelData
} from '../../adapters/utils';
import {
    ROBOTS_DIRECTIVES,
    getRobotsTagValueWithDirective,
    getDirectiveValue,
    isRobotsDirectiveExists,
    REMOVE_ROBOTS_DIRECTIVE_OVERRIDE_VALUE,
} from '../../tags/robots-tag/robots-tag';
import {
    experimentEnabled
} from './experimentEnabled';
var INDEX = 'index';
var NO_INDEX = 'noindex';
var adapter = enrichWithSiteLevelData(staticPageAdapterV2);
export var resolveIsIndexable = function(tags, adapterData) {
    if (tags === void 0) {
        tags = [];
    }
    if (adapterData === void 0) {
        adapterData = {};
    }
    var siteLevel = getIndexableValue(adapterData[adapter.IDs.INDEX_SITE]); // <Boolean> (* defaults to true *)
    var patternLevel = getIndexableValue(adapterData[adapter.IDs.ROBOTS_FROM_USER_PATTERN]); // <String> 'noindex' / 'index' / 'max-snippet:20' (* defaults to undefined *)
    var overrides = getIndexableValue(getValueByIdentifier(tags, IDENTIFIERS.ROBOTS)); // <String> 'noindex' / 'index' / 'max-snippet:20' (* defaults to undefined *)
    var isNoindex;
    if (experimentEnabled('specs.seo.ReverseResolveIsIndexableLogic', adapterData)) {
        isNoindex =
            siteLevel === NO_INDEX ||
            overrides === NO_INDEX ||
            (patternLevel === NO_INDEX && overrides !== INDEX);
    } else {
        isNoindex =
            siteLevel === NO_INDEX ||
            overrides === NO_INDEX ||
            patternLevel === NO_INDEX;
    }
    if (isNoindex) {
        var existingRobotsTagValue = getValueByIdentifier(tags, IDENTIFIERS.ROBOTS);
        var robotsTagValueWithNoindex = getRobotsTagValueWithDirective(existingRobotsTagValue, ROBOTS_DIRECTIVES.NOINDEX);
        return updateValueByIdentifier(tags, IDENTIFIERS.ROBOTS, robotsTagValueWithNoindex);
    }
    return tags;
};
export function getIndexableValue(value) {
    if (typeof value === 'boolean') {
        return value ? INDEX : NO_INDEX;
    }
    if (isRobotsDirectiveExists(value, ROBOTS_DIRECTIVES.NOINDEX)) {
        return NO_INDEX;
    } else if (isRobotsDirectiveExists(value, INDEX) ||
        getDirectiveValue(value, ROBOTS_DIRECTIVES.NOINDEX) ===
        REMOVE_ROBOTS_DIRECTIVE_OVERRIDE_VALUE) {
        return INDEX;
    } else {
        return '';
    }
}