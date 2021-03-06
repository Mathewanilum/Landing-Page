import {
    SiteAssetsClientValidationError
} from '..';
import {
    entries
} from '../helper/objectHelper';
var createValidator = require('@wix/site-assets-validation').createValidator;
var validator = createValidator({
    additionalReservedParams: ['contentType']
});
// todo validate that required params exist and not empty - pageJsonFileName, etc
export var validateSiteAssetsRequest = function(request) {
    validator.validateCustomParams(request.module.params);
};
var validateSitePagesModel = function(sitePagesModel) {
    var pageJsonFileNames = sitePagesModel.pageJsonFileNames;
    var checkNoEmptyPageJsonFileNames = function() {
        var emptyPageJsonFileNames = entries(pageJsonFileNames).filter(function(_a) {
            var pageJsonFileName = _a[1];
            return pageJsonFileName === '';
        });
        if (emptyPageJsonFileNames.length > 0) {
            var pageIds = Array.from(emptyPageJsonFileNames.map(function(_a) {
                var pageId = _a[0];
                return pageId;
            }));
            throw new SiteAssetsClientValidationError("pageJsonFileNames contained empty values for these pageIds: " + JSON.stringify(pageIds));
        }
    };
    checkNoEmptyPageJsonFileNames();
};
export var validateSiteAssetsSiteModels = function(siteModels) {
    validateSitePagesModel(siteModels.sitePagesModel);
};