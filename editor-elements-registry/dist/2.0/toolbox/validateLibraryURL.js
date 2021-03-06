"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateLibraryURL = exports.whitelistedEndpoints = void 0;
exports.whitelistedEndpoints = [
    'https://bo.wix.com/suricate/tunnel/',
    'https://localhost:',
    'http://localhost:',
    'https://sled.wix.dev/',
    'https://static.parastorage.com/',
];
var isAllowedHostRegexp = new RegExp("^((" + exports.whitelistedEndpoints.join(')|(') + "))");

function validateLibraryURL(url) {
    return isAllowedHostRegexp.test(url);
}
exports.validateLibraryURL = validateLibraryURL;
//# sourceMappingURL=validateLibraryURL.js.map