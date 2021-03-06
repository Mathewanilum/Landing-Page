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

import DataItem from '../common/data-item';

var DurationDataItem = /*#__PURE__*/ function(_DataItem) {
    _inheritsLoose(DurationDataItem, _DataItem);

    function DurationDataItem(duration) {
        return _DataItem.call(this, {
            duration: duration
        }) || this;
    }

    var _proto = DurationDataItem.prototype;

    _proto.setFirstRequestDuration = function setFirstRequestDuration(firstRequestDuration) {
        this.data.frd = firstRequestDuration;
        return this;
    };

    return DurationDataItem;
}(DataItem);

export {
    DurationDataItem as
    default
};