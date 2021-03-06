import {
    STATIC_PAGE_V2
} from '../types/ItemTypes';
export function getUserPatternByItemType(userPatternsArray, itemType, _a) {
    if (userPatternsArray === void 0) {
        userPatternsArray = [];
    }
    if (itemType === void 0) {
        itemType = STATIC_PAGE_V2;
    }
    var _b = (_a === void 0 ? {} : _a).logError,
        logError = _b === void 0 ? function() {} : _b;
    var userPatternContent;
    try {
        userPatternContent =
            (userPatternsArray.find(function(_a) {
                var patternType = _a.patternType;
                return patternType === itemType;
            }) || {}).content || {};
        if (typeof userPatternContent === 'string') {
            return JSON.parse(userPatternContent);
        }
        return userPatternContent;
    } catch (error) {
        logError({
            error: error,
            data: {
                value: userPatternContent
            }
        });
        return {};
    }
}