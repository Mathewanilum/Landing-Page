"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
        didErr = false,
        err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
                if (didErr) throw err;
            }
        }
    };
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

var isUndefined = function isUndefined(maybeUndefined) {
    return typeof maybeUndefined === 'undefined';
};

var isNull = function isNull(maybeNull) {
    return _typeof(maybeNull) === 'object' && !maybeNull;
};

var isString = function isString(maybeString) {
    return typeof maybeString === 'string';
};

var isObject = function isObject(maybeObject) {
    return _typeof(maybeObject) === 'object';
};

var baseDifference = function baseDifference(array, values, comparator) {
    var includes = Array.prototype.includes;
    var isCommon = true;
    var result = [];
    var valuesLength = values.length;

    if (!array.length) {
        return result;
    }

    if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
    }

    var _iterator = _createForOfIteratorHelper(array),
        _step;

    try {
        outer: for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var value = _step.value;
            var computed = value;
            value = comparator || value !== 0 ? value : 0;

            if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;

                while (valuesIndex--) {
                    if (values[valuesIndex] === computed) {
                        continue outer;
                    }
                }

                result.push(value);
            } else if (!includes(values, computed, comparator)) {
                result.push(value);
            }
        }
    }
    catch (err) {
        _iterator.e(err);
    } finally {
        _iterator.f();
    }

    return result;
};

var arrayIncludesWith = function arrayIncludesWith(array, target, comparator) {
    var _iterator2 = _createForOfIteratorHelper(array),
        _step2;

    try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var value = _step2.value;

            if (comparator(target, value)) {
                return true;
            }
        }
    } catch (err) {
        _iterator2.e(err);
    } finally {
        _iterator2.f();
    }

    return false;
};

module.exports = {
    notEmpty: function notEmpty(collection) {
        if (isUndefined(collection) || isNull(collection)) {
            return false;
        }

        if (Array.isArray(collection) || isString(collection)) {
            return !!collection.length;
        }

        if (isObject(collection)) {
            return !!Object.keys(collection).length;
        }
    },
    isFunction: function isFunction(maybeFunction) {
        return typeof maybeFunction === 'function';
    },
    differenceWith: function differenceWith(array, values, comparator) {
        return baseDifference(array, values, comparator);
    }
};
//# sourceMappingURL=kendash.js.map