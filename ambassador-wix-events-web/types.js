/* eslint-disable */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VisitorType = exports.ValueType = exports.TokensFieldset = exports.TicketFieldset = exports.TicketDefinitionFieldset = exports.TaxType = exports.SubdivisionType = exports.StructNullValue = exports.StatusFilter = exports.Status = exports.SortOrder = exports.SiteSettingsFieldset = exports.RsvpTag = exports.RsvpStatusOptions = exports.RsvpStatus = exports.RsvpFieldset = exports.ReservationStatus = exports.Relation = exports.RegistrationStatus = exports.PushNotificationId = exports.PolicyFieldset = exports.OrderTag = exports.OrderStatus = exports.OrderFieldset = exports.LocationType = exports.ListTicketsRequestState = exports.ListTicketDefinitionsRequestState = exports.InputControlType = exports.IdentityType = exports.GuestRegistrationReportType = exports.FieldType = exports.FeeType = exports.FeeName = exports.EventType = exports.EventStatus = exports.EventFieldset = exports.EmailNotificationTiming = exports.EmailNotificationId = exports.ConferenceType = exports.ComponentFieldset = exports.ChannelType = exports.CategoryStateState = exports.CategoryFieldset = void 0;
var CategoryFieldset;
(function(CategoryFieldset) {
    CategoryFieldset["COUNTS"] = "COUNTS";
})(CategoryFieldset = exports.CategoryFieldset || (exports.CategoryFieldset = {}));
var CategoryStateState;
(function(CategoryStateState) {
    CategoryStateState["MANUAL"] = "MANUAL";
    CategoryStateState["AUTO"] = "AUTO";
    CategoryStateState["RECURRING_EVENT"] = "RECURRING_EVENT";
    CategoryStateState["HIDDEN"] = "HIDDEN";
})(CategoryStateState = exports.CategoryStateState || (exports.CategoryStateState = {}));
var ChannelType;
(function(ChannelType) {
    ChannelType["ONLINE"] = "ONLINE";
    ChannelType["OFFLINE_POS"] = "OFFLINE_POS";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
var ComponentFieldset;
(function(ComponentFieldset) {
    ComponentFieldset["SITE_SETTINGS"] = "SITE_SETTINGS";
    ComponentFieldset["DRAFT"] = "DRAFT";
    ComponentFieldset["EVENTS"] = "EVENTS";
})(ComponentFieldset = exports.ComponentFieldset || (exports.ComponentFieldset = {}));
var ConferenceType;
(function(ConferenceType) {
    ConferenceType["MEETING"] = "MEETING";
    ConferenceType["WEBINAR"] = "WEBINAR";
})(ConferenceType = exports.ConferenceType || (exports.ConferenceType = {}));
var EmailNotificationId;
(function(EmailNotificationId) {
    EmailNotificationId["EMAIL_RSVP_CONFIRMATION"] = "EMAIL_RSVP_CONFIRMATION";
    EmailNotificationId["EMAIL_WAITING_NEW_SPOTS_AVAILABLE"] = "EMAIL_WAITING_NEW_SPOTS_AVAILABLE";
    EmailNotificationId["EMAIL_EVENT_CANCELATION"] = "EMAIL_EVENT_CANCELATION";
    EmailNotificationId["EMAIL_UPCOMING_EVENT_REMINDER"] = "EMAIL_UPCOMING_EVENT_REMINDER";
    EmailNotificationId["EMAIL_ORDER_CONFIRMATION"] = "EMAIL_ORDER_CONFIRMATION";
    EmailNotificationId["EMAIL_TICKET_CONFIRMATION"] = "EMAIL_TICKET_CONFIRMATION";
    EmailNotificationId["EMAIL_INVOICE"] = "EMAIL_INVOICE";
})(EmailNotificationId = exports.EmailNotificationId || (exports.EmailNotificationId = {}));
var EmailNotificationTiming;
(function(EmailNotificationTiming) {
    EmailNotificationTiming["INSTANT"] = "INSTANT";
    EmailNotificationTiming["BEFORE_1_DAY"] = "BEFORE_1_DAY";
    EmailNotificationTiming["BEFORE_3_DAYS"] = "BEFORE_3_DAYS";
    EmailNotificationTiming["BEFORE_1_WEEK"] = "BEFORE_1_WEEK";
    EmailNotificationTiming["BEFORE_1_HOUR"] = "BEFORE_1_HOUR";
    EmailNotificationTiming["BEFORE_30_MINUTES"] = "BEFORE_30_MINUTES";
})(EmailNotificationTiming = exports.EmailNotificationTiming || (exports.EmailNotificationTiming = {}));
var EventFieldset;
(function(EventFieldset) {
    EventFieldset["FULL"] = "FULL";
    EventFieldset["DETAILS"] = "DETAILS";
    EventFieldset["TEXTS"] = "TEXTS";
    EventFieldset["REGISTRATION"] = "REGISTRATION";
    EventFieldset["URLS"] = "URLS";
    EventFieldset["FORM"] = "FORM";
    EventFieldset["DASHBOARD"] = "DASHBOARD";
    EventFieldset["FEED"] = "FEED";
    EventFieldset["ONLINE_CONFERENCING_SESSION"] = "ONLINE_CONFERENCING_SESSION";
    EventFieldset["SEO_SETTINGS"] = "SEO_SETTINGS";
    EventFieldset["AGENDA"] = "AGENDA";
})(EventFieldset = exports.EventFieldset || (exports.EventFieldset = {}));
var EventStatus;
(function(EventStatus) {
    EventStatus["SCHEDULED"] = "SCHEDULED";
    EventStatus["STARTED"] = "STARTED";
    EventStatus["ENDED"] = "ENDED";
    EventStatus["CANCELED"] = "CANCELED";
    EventStatus["DRAFT"] = "DRAFT";
})(EventStatus = exports.EventStatus || (exports.EventStatus = {}));
var EventType;
(function(EventType) {
    EventType["NA_EVENT_TYPE"] = "NA_EVENT_TYPE";
    EventType["RSVP"] = "RSVP";
    EventType["TICKETS"] = "TICKETS";
    EventType["EXTERNAL"] = "EXTERNAL";
    EventType["NO_REGISTRATION"] = "NO_REGISTRATION";
})(EventType = exports.EventType || (exports.EventType = {}));
var FeeName;
(function(FeeName) {
    FeeName["WIX_FEE"] = "WIX_FEE";
})(FeeName = exports.FeeName || (exports.FeeName = {}));
var FeeType;
(function(FeeType) {
    FeeType["FEE_ADDED"] = "FEE_ADDED";
    FeeType["FEE_INCLUDED"] = "FEE_INCLUDED";
    FeeType["FEE_ADDED_AT_CHECKOUT"] = "FEE_ADDED_AT_CHECKOUT";
})(FeeType = exports.FeeType || (exports.FeeType = {}));
var FieldType;
(function(FieldType) {
    FieldType["UNDEFINED_TYPE"] = "UNDEFINED_TYPE";
    FieldType["STRING"] = "STRING";
    FieldType["RICH_TEXT"] = "RICH_TEXT";
    FieldType["IMAGE"] = "IMAGE";
    FieldType["TEXT_AREA"] = "TEXT_AREA";
    FieldType["LIST_OF_STRINGS"] = "LIST_OF_STRINGS";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
var GuestRegistrationReportType;
(function(GuestRegistrationReportType) {
    GuestRegistrationReportType["INSTANT_UPDATE"] = "INSTANT_UPDATE";
    GuestRegistrationReportType["DAILY_SUMMARY"] = "DAILY_SUMMARY";
})(GuestRegistrationReportType = exports.GuestRegistrationReportType || (exports.GuestRegistrationReportType = {}));
var IdentityType;
(function(IdentityType) {
    IdentityType["EXTERNAL_APP"] = "EXTERNAL_APP";
    IdentityType["USER"] = "USER";
    IdentityType["VISITOR"] = "VISITOR";
    IdentityType["SERVICE"] = "SERVICE";
    IdentityType["MEMBER"] = "MEMBER";
})(IdentityType = exports.IdentityType || (exports.IdentityType = {}));
var InputControlType;
(function(InputControlType) {
    InputControlType["INPUT"] = "INPUT";
    InputControlType["TEXTAREA"] = "TEXTAREA";
    InputControlType["DROPDOWN"] = "DROPDOWN";
    InputControlType["RADIO"] = "RADIO";
    InputControlType["CHECKBOX"] = "CHECKBOX";
    InputControlType["NAME"] = "NAME";
    InputControlType["GUEST_CONTROL"] = "GUEST_CONTROL";
    InputControlType["ADDRESS_SHORT"] = "ADDRESS_SHORT";
    InputControlType["ADDRESS_FULL"] = "ADDRESS_FULL";
    InputControlType["DATE"] = "DATE";
})(InputControlType = exports.InputControlType || (exports.InputControlType = {}));
var ListTicketDefinitionsRequestState;
(function(ListTicketDefinitionsRequestState) {
    ListTicketDefinitionsRequestState["VISIBLE"] = "VISIBLE";
    ListTicketDefinitionsRequestState["HIDDEN"] = "HIDDEN";
    ListTicketDefinitionsRequestState["FREE"] = "FREE";
    ListTicketDefinitionsRequestState["PAID"] = "PAID";
})(ListTicketDefinitionsRequestState = exports.ListTicketDefinitionsRequestState || (exports.ListTicketDefinitionsRequestState = {}));
var ListTicketsRequestState;
(function(ListTicketsRequestState) {
    ListTicketsRequestState["ORDER_ARCHIVED"] = "ORDER_ARCHIVED";
    ListTicketsRequestState["ORDER_ACTIVE"] = "ORDER_ACTIVE";
    ListTicketsRequestState["TICKET_ARCHIVED"] = "TICKET_ARCHIVED";
    ListTicketsRequestState["TICKET_ACTIVE"] = "TICKET_ACTIVE";
    ListTicketsRequestState["CHECKED_IN"] = "CHECKED_IN";
    ListTicketsRequestState["NON_CHECKED_IN"] = "NON_CHECKED_IN";
    ListTicketsRequestState["FREE"] = "FREE";
    ListTicketsRequestState["PAID"] = "PAID";
    ListTicketsRequestState["MEMBER"] = "MEMBER";
})(ListTicketsRequestState = exports.ListTicketsRequestState || (exports.ListTicketsRequestState = {}));
var LocationType;
(function(LocationType) {
    LocationType["VENUE"] = "VENUE";
    LocationType["ONLINE"] = "ONLINE";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
var OrderFieldset;
(function(OrderFieldset) {
    OrderFieldset["TICKETS"] = "TICKETS";
    OrderFieldset["DETAILS"] = "DETAILS";
    OrderFieldset["FORM"] = "FORM";
    OrderFieldset["INVOICE"] = "INVOICE";
})(OrderFieldset = exports.OrderFieldset || (exports.OrderFieldset = {}));
var OrderStatus;
(function(OrderStatus) {
    OrderStatus["NA_ORDER_STATUS"] = "NA_ORDER_STATUS";
    OrderStatus["FREE"] = "FREE";
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["OFFLINE_PENDING"] = "OFFLINE_PENDING";
    OrderStatus["INITIATED"] = "INITIATED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderTag;
(function(OrderTag) {
    OrderTag["CONFIRMED"] = "CONFIRMED";
    OrderTag["UNCONFIRMED"] = "UNCONFIRMED";
    OrderTag["MEMBER"] = "MEMBER";
    OrderTag["ARCHIVED"] = "ARCHIVED";
    OrderTag["NON_ARCHIVED"] = "NON_ARCHIVED";
    OrderTag["FULLY_CHECKED_IN"] = "FULLY_CHECKED_IN";
    OrderTag["NOT_FULLY_CHECKED_IN"] = "NOT_FULLY_CHECKED_IN";
})(OrderTag = exports.OrderTag || (exports.OrderTag = {}));
var PolicyFieldset;
(function(PolicyFieldset) {
    PolicyFieldset["BODY"] = "BODY";
})(PolicyFieldset = exports.PolicyFieldset || (exports.PolicyFieldset = {}));
var PushNotificationId;
(function(PushNotificationId) {
    PushNotificationId["PUSH_EVENT_UPDATED"] = "PUSH_EVENT_UPDATED";
    PushNotificationId["PUSH_EVENT_CANCELATION"] = "PUSH_EVENT_CANCELATION";
    PushNotificationId["PUSH_UPCOMING_EVENT_REMINDER"] = "PUSH_UPCOMING_EVENT_REMINDER";
    PushNotificationId["PUSH_EVENT_CREATED"] = "PUSH_EVENT_CREATED";
})(PushNotificationId = exports.PushNotificationId || (exports.PushNotificationId = {}));
var RegistrationStatus;
(function(RegistrationStatus) {
    RegistrationStatus["NA_REGISTRATION_STATUS"] = "NA_REGISTRATION_STATUS";
    RegistrationStatus["CLOSED"] = "CLOSED";
    RegistrationStatus["CLOSED_MANUALLY"] = "CLOSED_MANUALLY";
    RegistrationStatus["OPEN_RSVP"] = "OPEN_RSVP";
    RegistrationStatus["OPEN_RSVP_WAITLIST"] = "OPEN_RSVP_WAITLIST";
    RegistrationStatus["OPEN_TICKETS"] = "OPEN_TICKETS";
    RegistrationStatus["OPEN_EXTERNAL"] = "OPEN_EXTERNAL";
})(RegistrationStatus = exports.RegistrationStatus || (exports.RegistrationStatus = {}));
var Relation;
(function(Relation) {
    Relation["ATTENDING"] = "ATTENDING";
})(Relation = exports.Relation || (exports.Relation = {}));
var ReservationStatus;
(function(ReservationStatus) {
    ReservationStatus["RESERVATION_PENDING"] = "RESERVATION_PENDING";
    ReservationStatus["RESERVATION_CONFIRMED"] = "RESERVATION_CONFIRMED";
    ReservationStatus["RESERVATION_CANCELED"] = "RESERVATION_CANCELED";
    ReservationStatus["RESERVATION_CANCELED_MANUALLY"] = "RESERVATION_CANCELED_MANUALLY";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
var RsvpFieldset;
(function(RsvpFieldset) {
    RsvpFieldset["DETAILS"] = "DETAILS";
    RsvpFieldset["FORM"] = "FORM";
    RsvpFieldset["CONTACT_DETAILS"] = "CONTACT_DETAILS";
})(RsvpFieldset = exports.RsvpFieldset || (exports.RsvpFieldset = {}));
var RsvpStatus;
(function(RsvpStatus) {
    RsvpStatus["YES"] = "YES";
    RsvpStatus["NO"] = "NO";
    RsvpStatus["WAITING"] = "WAITING";
})(RsvpStatus = exports.RsvpStatus || (exports.RsvpStatus = {}));
var RsvpStatusOptions;
(function(RsvpStatusOptions) {
    RsvpStatusOptions["YES_ONLY"] = "YES_ONLY";
    RsvpStatusOptions["YES_AND_NO"] = "YES_AND_NO";
})(RsvpStatusOptions = exports.RsvpStatusOptions || (exports.RsvpStatusOptions = {}));
var RsvpTag;
(function(RsvpTag) {
    RsvpTag["FULLY_CHECKED_IN"] = "FULLY_CHECKED_IN";
    RsvpTag["NOT_FULLY_CHECKED_IN"] = "NOT_FULLY_CHECKED_IN";
    RsvpTag["MEMBER"] = "MEMBER";
})(RsvpTag = exports.RsvpTag || (exports.RsvpTag = {}));
var SiteSettingsFieldset;
(function(SiteSettingsFieldset) {
    SiteSettingsFieldset["EVENTS_SUMMARY"] = "EVENTS_SUMMARY";
})(SiteSettingsFieldset = exports.SiteSettingsFieldset || (exports.SiteSettingsFieldset = {}));
var SortOrder;
(function(SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var Status;
(function(Status) {
    Status["ONE_TIME"] = "ONE_TIME";
    Status["RECURRING"] = "RECURRING";
    Status["RECURRING_NEXT"] = "RECURRING_NEXT";
    Status["RECURRING_LAST_ENDED"] = "RECURRING_LAST_ENDED";
    Status["RECURRING_LAST_CANCELED"] = "RECURRING_LAST_CANCELED";
})(Status = exports.Status || (exports.Status = {}));
var StatusFilter;
(function(StatusFilter) {
    StatusFilter["FUTURE_AND_PAST"] = "FUTURE_AND_PAST";
    StatusFilter["FUTURE_ONLY"] = "FUTURE_ONLY";
    StatusFilter["PAST_ONLY"] = "PAST_ONLY";
})(StatusFilter = exports.StatusFilter || (exports.StatusFilter = {}));
var StructNullValue;
(function(StructNullValue) {
    StructNullValue["NULL_VALUE"] = "NULL_VALUE";
})(StructNullValue = exports.StructNullValue || (exports.StructNullValue = {}));
var SubdivisionType;
(function(SubdivisionType) {
    SubdivisionType["ADMINISTRATIVE_AREA_LEVEL_2"] = "ADMINISTRATIVE_AREA_LEVEL_2";
    SubdivisionType["ADMINISTRATIVE_AREA_LEVEL_4"] = "ADMINISTRATIVE_AREA_LEVEL_4";
    SubdivisionType["ADMINISTRATIVE_AREA_LEVEL_3"] = "ADMINISTRATIVE_AREA_LEVEL_3";
    SubdivisionType["UNKNOWN_SUBDIVISION_TYPE"] = "UNKNOWN_SUBDIVISION_TYPE";
    SubdivisionType["COUNTRY"] = "COUNTRY";
    SubdivisionType["ADMINISTRATIVE_AREA_LEVEL_1"] = "ADMINISTRATIVE_AREA_LEVEL_1";
    SubdivisionType["ADMINISTRATIVE_AREA_LEVEL_5"] = "ADMINISTRATIVE_AREA_LEVEL_5";
})(SubdivisionType = exports.SubdivisionType || (exports.SubdivisionType = {}));
var TaxType;
(function(TaxType) {
    TaxType["INCLUDED"] = "INCLUDED";
    TaxType["ADDED"] = "ADDED";
    TaxType["ADDED_AT_CHECKOUT"] = "ADDED_AT_CHECKOUT";
})(TaxType = exports.TaxType || (exports.TaxType = {}));
var TicketDefinitionFieldset;
(function(TicketDefinitionFieldset) {
    TicketDefinitionFieldset["POLICY"] = "POLICY";
    TicketDefinitionFieldset["DASHBOARD"] = "DASHBOARD";
})(TicketDefinitionFieldset = exports.TicketDefinitionFieldset || (exports.TicketDefinitionFieldset = {}));
var TicketFieldset;
(function(TicketFieldset) {
    TicketFieldset["GUEST_DETAILS"] = "GUEST_DETAILS";
    TicketFieldset["TICKET_DETAILS"] = "TICKET_DETAILS";
    TicketFieldset["GUEST_FORM"] = "GUEST_FORM";
})(TicketFieldset = exports.TicketFieldset || (exports.TicketFieldset = {}));
var TokensFieldset;
(function(TokensFieldset) {
    TokensFieldset["POLICIES"] = "POLICIES";
})(TokensFieldset = exports.TokensFieldset || (exports.TokensFieldset = {}));
var ValueType;
(function(ValueType) {
    ValueType["TEXT"] = "TEXT";
    ValueType["NUMBER"] = "NUMBER";
    ValueType["TEXT_ARRAY"] = "TEXT_ARRAY";
    ValueType["DATE_TIME"] = "DATE_TIME";
    ValueType["ADDRESS"] = "ADDRESS";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
var VisitorType;
(function(VisitorType) {
    VisitorType["VISITOR"] = "VISITOR";
    VisitorType["MEMBER"] = "MEMBER";
    VisitorType["VISITOR_OR_MEMBER"] = "VISITOR_OR_MEMBER";
})(VisitorType = exports.VisitorType || (exports.VisitorType = {}));
//# sourceMappingURL=types.js.map