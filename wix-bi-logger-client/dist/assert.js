'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var AssertionError = function(_Error) {
    _inherits(AssertionError, _Error);

    function AssertionError(message) {
        _classCallCheck(this, AssertionError);

        var _this = _possibleConstructorReturn(this, (AssertionError.__proto__ || Object.getPrototypeOf(AssertionError)).call(this, message));

        _this.name = _this.constructor.name;
        return _this;
    }

    return AssertionError;
}(Error);

function assertDefined(target, message) {
    if (target === undefined) {
        throw new AssertionError(message);
    }
}

function assertObject(target, message) {
    if (target !== undefined && ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' || Array.isArray(target) || target === null)) {
        throw new AssertionError(message);
    }
}

function assertOk(target, message) {
    if (!target) {
        throw new AssertionError(message);
    }
}

function assertFunc(target, message) {
    if (target !== undefined && typeof target !== 'function') {
        throw new AssertionError(message);
    }
}

function assertBoolean(target, message) {
    if (target !== undefined && typeof target !== 'boolean') {
        throw new AssertionError(message);
    }
}

function assertNumber(target, message) {
    if (target !== undefined && typeof target !== 'number') {
        throw new AssertionError(message);
    }
}

module.exports.defined = assertDefined;
module.exports.object = assertObject;
module.exports.ok = assertOk;
module.exports.func = assertFunc;
module.exports.boolean = assertBoolean;
module.exports.number = assertNumber;
module.exports.AssertionError = AssertionError;
//# sourceMappingURL=assert.js.map