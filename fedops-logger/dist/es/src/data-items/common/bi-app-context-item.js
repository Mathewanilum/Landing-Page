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

import DataItem from './data-item';

var BiAppContextDataItem = /*#__PURE__*/ function(_DataItem) {
    _inheritsLoose(BiAppContextDataItem, _DataItem);

    function BiAppContextDataItem(_ref) {
        var _this;

        var appId = _ref.appId,
            widgetId = _ref.widgetId,
            isServerSide = _ref.isServerSide,
            widgetArray = _ref.widgetArray;
        _this = _DataItem.call(this) || this;
        _this.data = _this._filterUndefined({
            appId: appId,
            widgetId: widgetId,
            isServerSide: isServerSide,
            widgetArray: widgetArray
        });
        return _this;
    }

    var _proto = BiAppContextDataItem.prototype;

    _proto._filterUndefined = function _filterUndefined(contextData) {
        var definedValues = {};
        Object.keys(contextData).forEach(function(key) {
            if (contextData[key]) {
                definedValues[key] = contextData[key];
            }
        });
        return definedValues;
    };

    return BiAppContextDataItem;
}(DataItem);

export {
    BiAppContextDataItem as
    default
};