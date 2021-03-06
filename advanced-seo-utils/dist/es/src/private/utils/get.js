export function get(object, property) {
    if (property === void 0) {
        property = '';
    }
    var result = getRawValue(object, property);
    if (typeof result === 'undefined') {
        return '';
    }
    if (result === null) {
        return '';
    }
    return "" + result;
}
export function getRawValue(object, property) {
    if (property === void 0) {
        property = '';
    }
    return property.split('.').reduce(function(acc, curr) {
        return acc ? acc[curr] : undefined;
    }, object);
}