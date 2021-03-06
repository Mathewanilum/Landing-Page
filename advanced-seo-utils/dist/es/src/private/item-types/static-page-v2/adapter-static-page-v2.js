import {
    CONTEXT_PROPS
} from '../../types/ContextProps';
import {
    get,
    getRawValue
} from '../../utils/get';
import {
    getKeys
} from '../../adapters/utils';
import {
    updateValueByIdentifier
} from '../../tags/values/update-by-identifier';
import {
    IDENTIFIERS
} from '../../types/Identifiers';
import {
    getPageUrl
} from './adapter-utils';
import {
    SD_STATUS
} from '../../consts';
import {
    getRssRoute
} from '../utils';
import {
    RSS_ROUTE_TYPES
} from '../consts';
export var IDs = {
    PAGE_NAME: 'page.name',
    PAGE_URL: 'page.url',
    SITE_NAME: 'site.name',
    HOME_PAGE_TITLE: 'site.homePageTitle',
    INDEX_SITE: 'site.index',
    INDEX_PAGE: 'page.index',
    IS_HOME_PAGE: 'page.isHomePage',
    IMAGE: 'site.image',
    IMAGE_WIDTH: 'site.imageWidth',
    IMAGE_HEIGHT: 'site.imageHeight',
    FB_ADMINS: 'site.facebookAdminId',
    NEXT: 'site.nextLink',
    PREV: 'site.prevLink',
    BLOG_FEED_ROUTE: 'site.blogFeedRoute',
    TPA_PAGE_ID: 'page.tpaPageId',
};
var userVisible = [IDs.PAGE_NAME, IDs.PAGE_URL, IDs.SITE_NAME, IDs.IMAGE];
export default {
    IDs: IDs,
    getData: function(item) {
        var _a;
        return _a = {},
            _a[IDs.PAGE_NAME] = get(item, "context." + CONTEXT_PROPS.PAGE_NAME),
            _a[IDs.PAGE_URL] = getPageUrl(item),
            _a[IDs.SITE_NAME] = get(item, "context." + CONTEXT_PROPS.SITE_NAME),
            _a[IDs.INDEX_SITE] = getRawValue(item, "context." + CONTEXT_PROPS.INDEX_SITE),
            _a[IDs.INDEX_PAGE] = getRawValue(item, "context." + CONTEXT_PROPS.INDEX_PAGE),
            _a[IDs.IS_HOME_PAGE] = getRawValue(item, "context." + CONTEXT_PROPS.IS_HOME_PAGE),
            _a[IDs.IMAGE] = get(item, "context." + CONTEXT_PROPS.SITE_OG_IMAGE),
            _a[IDs.IMAGE_WIDTH] = get(item, "context." + CONTEXT_PROPS.OG_IMAGE_WIDTH),
            _a[IDs.IMAGE_HEIGHT] = get(item, "context." + CONTEXT_PROPS.OG_IMAGE_HEIGHT),
            _a[IDs.FB_ADMINS] = get(item, "context." + CONTEXT_PROPS.FB_ADMINS),
            _a[IDs.NEXT] = get(item, "context." + CONTEXT_PROPS.NEXT),
            _a[IDs.PREV] = get(item, "context." + CONTEXT_PROPS.PREV),
            _a[IDs.BLOG_FEED_ROUTE] = getRssRoute({
                rssRouteType: RSS_ROUTE_TYPES.BLOG,
                payload: {
                    item: item
                },
            }),
            _a[IDs.TPA_PAGE_ID] = get(item, "context." + CONTEXT_PROPS.TPA_PAGE_ID),
            _a;
    },
    getSdStatus: function() {
        return SD_STATUS.DOES_NOT_EXIST;
    },
    getBiData: function() {
        return {
            id: null,
            name: null
        };
    },
    getSlug: function() {
        return '';
    },
    updateItemDataWithSlug: function(item) {
        return item;
    },
    getLegacySeoBlob: function(item) {
        var tags = updateValueByIdentifier([], IDENTIFIERS.TITLE, get(item, "context." + CONTEXT_PROPS.TITLE));
        tags = updateValueByIdentifier(tags, IDENTIFIERS.DESCRIPTION, get(item, "context." + CONTEXT_PROPS.DESCRIPTION));
        tags = updateValueByIdentifier(tags, IDENTIFIERS.OG_IMAGE, get(item, "context." + CONTEXT_PROPS.OG_IMAGE));
        tags = updateValueByIdentifier(tags, IDENTIFIERS.ROBOTS, ['noindex', 'false'].includes(get(item, "context." + CONTEXT_PROPS.INDEX_PAGE)) ?
            'noindex' :
            '');
        return {
            tags: tags
        };
    },
    getKeys: function() {
        return getKeys(IDs, userVisible);
    },
    getSdKeys: function() {
        return [];
    },
};