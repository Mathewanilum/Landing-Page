var __spreadArrays = (this && this.__spreadArrays) || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
import {
    IDENTIFIERS
} from '../../types/Identifiers';
import {
    TAG_TYPES
} from '../../types/TagTypes';
import PROPS from '../../types/Props';
import {
    buildTwitterMetaRefs
} from '../../types/builders';
import {
    LINK_TAG_TYPES
} from '../../types/LinkTagTypes';
import {
    getRssTitle
} from '../utils';
export var STATIC_PAGE_V2 = {
    tags: __spreadArrays([{
            type: TAG_TYPES.TITLE,
            children: '{{page.name}} | {{site.name}}',
        },
        {
            type: TAG_TYPES.META,
            props: (_a = {},
                _a[PROPS.PROPERTY] = 'og:title',
                _a[PROPS.CONTENT] = "{{@" + IDENTIFIERS.TITLE + "}}",
                _a),
        },
        {
            type: TAG_TYPES.META,
            props: (_b = {},
                _b[PROPS.PROPERTY] = 'og:description',
                _b[PROPS.CONTENT] = "{{@" + IDENTIFIERS.DESCRIPTION + "}}",
                _b),
        },
        {
            type: TAG_TYPES.META,
            props: (_c = {},
                _c[PROPS.PROPERTY] = 'og:url',
                _c[PROPS.CONTENT] = '{{page.url}}',
                _c),
        },
        {
            type: TAG_TYPES.META,
            props: (_d = {},
                _d[PROPS.PROPERTY] = 'og:site_name',
                _d[PROPS.CONTENT] = '{{site.name}}',
                _d),
        },
        {
            type: TAG_TYPES.META,
            props: (_e = {},
                _e[PROPS.PROPERTY] = 'og:type',
                _e[PROPS.CONTENT] = 'website',
                _e),
        },
        {
            type: TAG_TYPES.META,
            props: (_f = {},
                _f[PROPS.PROPERTY] = 'og:image',
                _f[PROPS.CONTENT] = '{{site.image}}',
                _f),
        },
        {
            type: TAG_TYPES.META,
            props: (_g = {},
                _g[PROPS.PROPERTY] = 'og:image:width',
                _g[PROPS.CONTENT] = '{{site.imageWidth}}',
                _g),
        },
        {
            type: TAG_TYPES.META,
            props: (_h = {},
                _h[PROPS.PROPERTY] = 'og:image:height',
                _h[PROPS.CONTENT] = '{{site.imageHeight}}',
                _h),
        },
        {
            type: TAG_TYPES.META,
            props: (_j = {},
                _j[PROPS.PROPERTY] = 'fb:admins',
                _j[PROPS.CONTENT] = "{{site.facebookAdminId}}",
                _j),
        },
        {
            type: TAG_TYPES.LINK,
            props: (_k = {}, _k[PROPS.REL] = 'canonical', _k[PROPS.HREF] = '{{page.url}}', _k),
        },
        {
            type: TAG_TYPES.LINK,
            props: (_l = {},
                _l[PROPS.REL] = PROPS.ALTERNATE,
                _l[PROPS.HREF] = '{{site.blogFeedRoute}}',
                _l[PROPS.TYPE] = LINK_TAG_TYPES.RSS,
                _l[PROPS.TITLE] = getRssTitle('{{site.name}}'),
                _l),
        }
    ], buildTwitterMetaRefs()),
};