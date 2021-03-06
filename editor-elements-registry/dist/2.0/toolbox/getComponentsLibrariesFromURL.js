"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getComponentsLibrariesFromURL = exports.URL_NAMESPACE_SEPARATOR = exports.SHORT_REGISTRY_LIBRARY_PREFIX = exports.REGISTRY_LIBRARY_PREFIX_DEPRECATED = void 0;
var validateLibraryURL_1 = require("./validateLibraryURL");
exports.REGISTRY_LIBRARY_PREFIX_DEPRECATED = 'components-registry-library-';
exports.SHORT_REGISTRY_LIBRARY_PREFIX = '_rb-';
exports.URL_NAMESPACE_SEPARATOR = '~';
var getComponentsLibrariesFromURL = function(url, prefix) {
    if (prefix === void 0) {
        prefix = exports.SHORT_REGISTRY_LIBRARY_PREFIX;
    }
    if (!url || typeof URLSearchParams === 'undefined') {
        return [];
    }
    var search = url.split('?').pop();
    if (!search) {
        return [];
    }
    var libraries = [];
    var params = new URLSearchParams(search);
    params.forEach(function(value, key) {
        if (key.startsWith(exports.REGISTRY_LIBRARY_PREFIX_DEPRECATED) ||
            key.startsWith(prefix)) {
            var withDeprecatedPrefix = key.includes(exports.REGISTRY_LIBRARY_PREFIX_DEPRECATED);
            var artifactId = key
                .split(withDeprecatedPrefix ? exports.REGISTRY_LIBRARY_PREFIX_DEPRECATED : prefix)
                .pop();
            var _a = value.split(exports.URL_NAMESPACE_SEPARATOR),
                libraryUrl = _a[0],
                namespace = _a[1];
            if (!validateLibraryURL_1.validateLibraryURL(libraryUrl)) {
                return;
            }
            if (artifactId) {
                libraries.push({
                    url: libraryUrl,
                    namespace: namespace,
                });
            }
        }
    });
    return libraries;
};
exports.getComponentsLibrariesFromURL = getComponentsLibrariesFromURL;
//# sourceMappingURL=getComponentsLibrariesFromURL.js.map