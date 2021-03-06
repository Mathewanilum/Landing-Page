"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var lodash_1 = require("lodash");
var serializeMemberRoles = function(rawRoles) {
    return lodash_1.map(rawRoles && rawRoles.groups, function(_a) {
        var title = _a.title,
            description = _a.description;
        return ({
            name: title,
            description: description
        });
    });
};
exports.serializeMemberRoles = serializeMemberRoles;
var serializeMemberPlans = function(plansJson, membershipsJson) {
    var plans = ((plansJson && plansJson.groups) || []);
    var memberships = ((membershipsJson && membershipsJson.memberships) || []);
    return plans.map(function(plan) {
        var membership = lodash_1.find(memberships, function(x) {
            return x.groupId === plan.id;
        });
        var res = {
            name: plan.title
        };
        if (membership && membership.startDate) {
            res.startDate = new Date(membership.startDate);
        }
        if (membership && membership.expiryDate) {
            res.expiryDate = new Date(membership.expiryDate);
        }
        return res;
    });
};
exports.serializeMemberPlans = serializeMemberPlans;
//# sourceMappingURL=members.js.map