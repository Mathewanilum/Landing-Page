"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
var lodash_1 = require("lodash");
var CONTACT_INFO_SYSTEM_FIELDS = {
    id: {},
    firstName: {},
    lastName: {},
    picture: {},
    emails: {},
    addresses: {},
    phones: {},
    labels: {},
};
var CONTACT_INFO_HIDDEN_SYSTEM_FIELDS = {
    emailVerified: {},
    role: {},
    loginEmail: {},
    nickname: {},
    slug: {},
    language: {},
    status: {},
    creationDate: {},
    lastUpdateDate: {},
    lastLoginDate: {},
    profilePrivacyStatus: {}
};
var customFieldType = function(value) {
    if (lodash_1.isDate(value)) {
        return 'dateValue';
    } else if (lodash_1.isNumber(value)) {
        return 'numValue';
    }
    return 'strValue';
};
var serializeContactInfo = function(rawContactInfo) {
    return lodash_1.reduce(rawContactInfo, function(result, value, key) {
        var systemField = CONTACT_INFO_SYSTEM_FIELDS[key];
        var hiddenField = CONTACT_INFO_HIDDEN_SYSTEM_FIELDS[key];
        if (systemField) {
            result[key] = value;
        } else if (!hiddenField && key) {
            result.customFields.push((_a = {
                    name: key
                },
                _a[customFieldType(value)] = value,
                _a));
        }
        return result;
        var _a;
    }, {
        customFields: []
    });
};
exports.serializeContactInfo = serializeContactInfo;
var mapNameToValue = function(obj) {
    return _a = {}, _a[obj['name']] = obj['dateValue'] || obj['numValue'] || obj['strValue'], _a;
    var _a;
};
var deserializeContactInfo = function(contactInfo) {
    if (contactInfo === void 0) {
        contactInfo = {};
    }
    var contact = lodash_1.omit(contactInfo, Object.keys(__assign({
        'customFields': {}
    }, CONTACT_INFO_HIDDEN_SYSTEM_FIELDS)));
    var customFields = contactInfo['customFields'];
    if (customFields) {
        var fields = customFields.map(function(field) {
            return mapNameToValue(field);
        });
        fields.map(function(field) {
            return Object.assign(contact, field);
        });
    }
    return contact;
};
exports.deserializeContactInfo = deserializeContactInfo;
//# sourceMappingURL=contacts.js.map