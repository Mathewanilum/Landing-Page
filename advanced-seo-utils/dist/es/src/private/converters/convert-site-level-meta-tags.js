import {
    TAG_TYPES
} from '../types/TagTypes';
import PROPS from '../types/Props';
export function convertSiteLevelMetaTags(payload) {
    var result = {
        tags: [],
    };
    if (payload && Array.isArray(payload)) {
        result.tags = payload.reduce(function(acc, curr) {
            var _a;
            if (curr && curr.name && curr.value) {
                return acc.concat({
                    type: TAG_TYPES.META,
                    props: (_a = {},
                        _a[curr.name.startsWith('og:') ?
                            PROPS.PROPERTY :
                            PROPS.NAME] = curr.name,
                        _a.content = curr.value,
                        _a),
                });
            }
            return acc;
        }, result.tags);
    }
    return result;
}