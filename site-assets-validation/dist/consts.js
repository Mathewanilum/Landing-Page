"use strict";

var _dataFixerMandatoryNo;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var IS_HTTPS = 'isHttps';
var IS_URL_MIGRATED = 'isUrlMigrated';
var METASITE_ID = 'metaSiteId';
var QAME = 'quickActionsMenuEnabled';
var SITE_ID = 'siteId';
var PAGE_ID = 'pageId';
var PAGE_COMP_ID = 'pageCompId';
var DF_VERSION = 'dfVersion';
var MODULE = 'module';
var MODULE_VERSION = 'moduleVersion';
var FILE_ID = 'fileId';
var CK = 'ck';
var DF_CK = 'dfCk';
var EXPERIMENTS = 'experiments';
var SHARED_CACHE_POC = 'sharedCachePoc';
var SITE_REVISION = 'siteRevision';
var VERSION = 'version';
var dataFixerParamNames = [CK, DF_CK, DF_VERSION, EXPERIMENTS, IS_HTTPS, IS_URL_MIGRATED, METASITE_ID, PAGE_ID, PAGE_COMP_ID, QAME, SHARED_CACHE_POC, SITE_ID, SITE_REVISION, VERSION];
var dataFixerMandatoryNonEmptyParams = (_dataFixerMandatoryNo = {}, _defineProperty(_dataFixerMandatoryNo, CK, CK), _defineProperty(_dataFixerMandatoryNo, DF_CK, DF_CK), _defineProperty(_dataFixerMandatoryNo, DF_VERSION, DF_VERSION), _defineProperty(_dataFixerMandatoryNo, IS_HTTPS, IS_HTTPS), _defineProperty(_dataFixerMandatoryNo, IS_URL_MIGRATED, IS_URL_MIGRATED), _defineProperty(_dataFixerMandatoryNo, METASITE_ID, METASITE_ID), _defineProperty(_dataFixerMandatoryNo, PAGE_ID, [PAGE_ID, PAGE_COMP_ID]), _defineProperty(_dataFixerMandatoryNo, PAGE_COMP_ID, [PAGE_ID, PAGE_COMP_ID]), _defineProperty(_dataFixerMandatoryNo, QAME, QAME), _defineProperty(_dataFixerMandatoryNo, SITE_ID, SITE_ID), _defineProperty(_dataFixerMandatoryNo, MODULE_VERSION, [MODULE_VERSION, FILE_ID]), _defineProperty(_dataFixerMandatoryNo, FILE_ID, [MODULE_VERSION, FILE_ID]), _dataFixerMandatoryNo);
var reservedParamNames = [].concat(dataFixerParamNames, [MODULE, MODULE_VERSION]);

var either = function either(a, b) {
    return function(p) {
        return p === a || p === b;
    };
};

var mandatoryPageModuleRequestParams = [IS_HTTPS, IS_URL_MIGRATED, METASITE_ID, QAME, SITE_ID, either(PAGE_ID, PAGE_COMP_ID), MODULE, either(MODULE_VERSION, FILE_ID), DF_VERSION];
var mandatorySiteModuleRequestParams = [IS_HTTPS, IS_URL_MIGRATED, METASITE_ID, QAME, SITE_ID, MODULE, either(MODULE_VERSION, FILE_ID), DF_VERSION];
module.exports = {
    dataFixerParamNames: dataFixerParamNames,
    reservedParamNames: reservedParamNames,
    dataFixerMandatoryNonEmptyParams: dataFixerMandatoryNonEmptyParams,
    mandatoryPageModuleRequestParams: mandatoryPageModuleRequestParams,
    mandatorySiteModuleRequestParams: mandatorySiteModuleRequestParams
};
//# sourceMappingURL=consts.js.map