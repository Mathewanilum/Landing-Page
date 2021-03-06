/* eslint-disable */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Status = exports.SortOrder = exports.PeriodUnit = exports.PaymentStatus = exports.OrderType = exports.OrderStatus = exports.IdentityType = exports.CancellationEffectiveAt = exports.CancellationCause = void 0;
var CancellationCause;
(function(CancellationCause) {
    CancellationCause["UNDEFINED"] = "UNDEFINED";
    CancellationCause["OWNER_ACTION"] = "OWNER_ACTION";
    CancellationCause["MEMBER_ACTION"] = "MEMBER_ACTION";
    CancellationCause["PAYMENT_FAILURE"] = "PAYMENT_FAILURE";
    CancellationCause["PAYMENT_SETUP_FAILURE"] = "PAYMENT_SETUP_FAILURE";
    CancellationCause["UNKNOWN"] = "UNKNOWN";
})(CancellationCause = exports.CancellationCause || (exports.CancellationCause = {}));
var CancellationEffectiveAt;
(function(CancellationEffectiveAt) {
    CancellationEffectiveAt["UNDEFINED"] = "UNDEFINED";
    CancellationEffectiveAt["IMMEDIATELY"] = "IMMEDIATELY";
    CancellationEffectiveAt["NEXT_PAYMENT_DATE"] = "NEXT_PAYMENT_DATE";
})(CancellationEffectiveAt = exports.CancellationEffectiveAt || (exports.CancellationEffectiveAt = {}));
var IdentityType;
(function(IdentityType) {
    IdentityType["UNDEFINED"] = "UNDEFINED";
    IdentityType["MEMBER"] = "MEMBER";
})(IdentityType = exports.IdentityType || (exports.IdentityType = {}));
var OrderStatus;
(function(OrderStatus) {
    OrderStatus["UNDEFINED"] = "UNDEFINED";
    OrderStatus["DRAFT"] = "DRAFT";
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["ACTIVE"] = "ACTIVE";
    OrderStatus["PAUSED"] = "PAUSED";
    OrderStatus["ENDED"] = "ENDED";
    OrderStatus["CANCELED"] = "CANCELED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderType;
(function(OrderType) {
    OrderType["UNDEFINED"] = "UNDEFINED";
    OrderType["ONLINE"] = "ONLINE";
    OrderType["OFFLINE"] = "OFFLINE";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var PaymentStatus;
(function(PaymentStatus) {
    PaymentStatus["UNDEFINED"] = "UNDEFINED";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["UNPAID"] = "UNPAID";
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["NOT_APPLICABLE"] = "NOT_APPLICABLE";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var PeriodUnit;
(function(PeriodUnit) {
    PeriodUnit["UNDEFINED"] = "UNDEFINED";
    PeriodUnit["DAY"] = "DAY";
    PeriodUnit["WEEK"] = "WEEK";
    PeriodUnit["MONTH"] = "MONTH";
    PeriodUnit["YEAR"] = "YEAR";
})(PeriodUnit = exports.PeriodUnit || (exports.PeriodUnit = {}));
var SortOrder;
(function(SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var Status;
(function(Status) {
    Status["UNDEFINED"] = "UNDEFINED";
    Status["ACTIVE"] = "ACTIVE";
    Status["ENDED"] = "ENDED";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=types.js.map