function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

import DataItem from '../common/data-item';
import location from '../../global-app-data/location';
import performance from '../../performance/performance';
var RESOURCES_TYPES = {
    xmlhttprequest: {
        count: 'countXhr',
        unsupported: 'unsprtXhr',
        duration: 'timeXhr',
        total: 'sizeXhr',
        longest: 'longXhr',
        http2: 'h2Xhr'
    },
    script: {
        count: 'countJs',
        unsupported: 'unsprtJs',
        duration: 'timeJs',
        total: 'sizeJs',
        cached: 'cachedJs',
        http2: 'h2Js'
    },
    link: {
        // css
        count: 'countCss',
        unsupported: 'unsprtCss',
        duration: 'timeCss',
        total: 'sizeCss',
        cached: 'cachedCss',
        http2: 'h2Css'
    },
    img: {
        count: 'countImg',
        unsupported: 'unsprtImg',
        duration: 'timeImg',
        total: 'sizeImg',
        cached: 'cachedImages',
        http2: 'h2Images'
    },
    fetch: {
        count: 'countFetch',
        unsupported: 'unsprtFetch',
        duration: 'timeFetch',
        total: 'sizeFetch',
        cached: 'cachedFetch',
        http2: 'h2Fetch'
    },
    other: {
        count: 'countOther',
        unsupported: 'unsprtOther',
        duration: 'timeOther',
        total: 'sizeOther',
        cached: 'cachedOther',
        http2: 'h2Other'
    }
};
var CUSTOM_VALIDATORS = {
    link: function link(resource) {
        return /(.\.css$|.\.css?.)/g.test(resource.name);
    }
};

var durationOf = function durationOf(item) {
    return item.responseEnd - item.startTime;
};

function filterResourcesByType(resources, type) {
    var validator = CUSTOM_VALIDATORS[type];
    return resources.filter(function(r) {
        return type === r.initiatorType && (validator ? validator(r) : true);
    });
}

function calculateTotalSizeOfResource(resources) {
    return resources.reduce(function(totalSize, resource) {
        return totalSize + resource.transferSize;
    }, 0);
}

function calculateResourceLoadLongestDuration(resources) {
    if (resources.length === 0) {
        return 0;
    }

    var longest = resources.reduce(function(acc, cur) {
        return durationOf(cur) >= durationOf(acc) ? cur : acc;
    });
    return durationOf(longest);
}

function calculateResourceLoadDuration(resources) {
    if (resources.length === 0) {
        return 0;
    }

    var loadStartStop = {
        startTime: Infinity,
        responseEnd: 0
    };
    resources.forEach(function(r) {
        if (loadStartStop.startTime > r.startTime) {
            loadStartStop.startTime = r.startTime;
        }

        if (loadStartStop.responseEnd < r.responseEnd) {
            loadStartStop.responseEnd = r.responseEnd;
        }
    });
    return loadStartStop.responseEnd - loadStartStop.startTime;
}

function calculatePercentageOfUnsupportedResources(resources) {
    var totalCount = resources.length;

    if (totalCount === 0) {
        return 0;
    }

    var unsupportedCount = resources.filter(isResourceUnsupported).length;
    return Math.round(unsupportedCount / totalCount * 100);
}

function calculateCachedResourcesPercentage(resources) {
    if (resources.length === 0) {
        return 0;
    }

    var cached = resources.filter(function(r) {
        return r.transferSize === 0;
    });
    return Math.round(cached.length / resources.length * 100);
}

function calculatePercentageOfHttp2(resources) {
    if (resources.length === 0) {
        return 0;
    }

    var supported = false;
    var res = Math.round(resources.filter(function(r) {
        supported = supported || 'nextHopProtocol' in r;
        return r.nextHopProtocol === 'h2';
    }).length / resources.length * 100);
    return supported ? res : NaN;
}

function isResourceRelevant(resource) {
    return !resource.name.match(/http(s)?:\/\/frog.wix.com\//);
}

function isResourceUnsupported(resource) {
    return isCORS(resource.name) && resource.transferSize === 0 && resource.requestStart === 0;
}

function isCORS(resourceName) {
    var host = location.getHost();
    return host && resourceName.indexOf(host) === -1;
}

function normalizeValues(analysis) {
    return Object.keys(analysis).reduce(function(result, key) {
        var n = parseInt(analysis[key]);

        if (!isNaN(n) && typeof n === 'number') {
            result[key] = n;
        }

        return result;
    }, {});
}

function countAllResourcesByType(resources) {
    var supportedResources = resources.filter(function(r) {
        return !isResourceUnsupported(r);
    });
    return Object.keys(RESOURCES_TYPES).reduce(function(result, currentType) {
        var allSameTypeResources = filterResourcesByType(resources, currentType);
        var supportedSameTypeResources = filterResourcesByType(supportedResources, currentType);
        var type = RESOURCES_TYPES[currentType];
        result[type.count] = supportedSameTypeResources.length;
        result[type.duration] = calculateResourceLoadDuration(supportedSameTypeResources);
        result[type.total] = calculateTotalSizeOfResource(supportedSameTypeResources);
        result[type.unsupported] = calculatePercentageOfUnsupportedResources(allSameTypeResources);
        result[type.http2] = calculatePercentageOfHttp2(allSameTypeResources);

        if (type.longest) {
            result[type.longest] = calculateResourceLoadLongestDuration(supportedSameTypeResources);
        }

        if (type.cached) {
            result[type.cached] = calculateCachedResourcesPercentage(supportedSameTypeResources);
        }

        return result;
    }, {});
}

function extractResourceMetrics(resource) {
    return {
        url: resource.name,
        downloadDuration: resource.responseEnd - resource.startTime,
        bytesTransferred: resource.transferSize,
        isHTTP2: resource.nextHopProtocol === 'h2'
    };
}

function getResourcesBreakdown(resources) {
    var resourcesPartition = resources.reduce(function(result, r) {
        if (isResourceUnsupported(r)) {
            result.unsupported.push(r);
        } else {
            result.supported.push(r);
        }

        return result;
    }, {
        supported: [],
        unsupported: []
    });
    return Object.keys(RESOURCES_TYPES).reduce(function(result, currentType) {
        result[currentType] = {};
        result[currentType].supported = filterResourcesByType(resourcesPartition.supported, currentType).map(function(r) {
            return extractResourceMetrics(r);
        });
        result[currentType].unsupported = filterResourcesByType(resourcesPartition.unsupported, currentType).map(function(r) {
            return extractResourceMetrics(r);
        });
        return result;
    }, {});
}

var ResourceDataItem = /*#__PURE__*/ function(_DataItem) {
    _inheritsLoose(ResourceDataItem, _DataItem);

    function ResourceDataItem() {
        return _DataItem.apply(this, arguments) || this;
    }

    var _proto = ResourceDataItem.prototype;

    _proto.performNetworkAnalysis = function performNetworkAnalysis(resources) {
        if (resources.length === 0) {
            return null;
        }

        var t0 = performance.now();
        var resourcesToHandle = resources.filter(isResourceRelevant);
        var analysis = countAllResourcesByType(resourcesToHandle);
        analysis.overhead = performance.now() - t0;
        var result = normalizeValues(analysis);

        if (console.debug && location.isFedopsDev()) {
            var resourcesBreakdown = getResourcesBreakdown(resourcesToHandle);
            console.debug("[fedops network analysis] [bytes analysis]\n" + JSON.stringify(result, null, 4));
            console.debug("[fedops network analysis] [resources breakdown]\n", resourcesBreakdown);
        }

        return result;
    };

    return ResourceDataItem;
}(DataItem);

export {
    ResourceDataItem as
    default
};
export var RESOURCES_TYPES_PROPS = Object.keys(RESOURCES_TYPES).reduce(function(acc, type) {
    return acc.concat(Object.values(RESOURCES_TYPES[type]));
}, []);