'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var assert = require('./assert');
var BiLogger = require('./bi-logger');
var biLoggerManager = require('./bi-logger-manager');

var BiLoggerFactory = function() {
    function BiLoggerFactory() {
        _classCallCheck(this, BiLoggerFactory);

        this._publishers = [];
        this._validators = [];
        this._defaults = {};
        this._nonEssentialDefaults = {};
        this._events = {};
        this._isMuted = false;
        this._eventTransformer = null;
        this._payloadTransformer = null;
        this._consentPolicyGetter = null;
        this._maxBatchSize = null;
    }

    _createClass(BiLoggerFactory, [{
        key: 'addPublisher',
        value: function addPublisher(publisher) {
            assert.defined(publisher, 'Publisher must be provided');
            assert.ok(typeof publisher === 'function', 'Expected a publisher function');
            this._publishers.push(publisher);
            return this;
        }
    }, {
        key: 'addValidator',
        value: function addValidator(validator) {
            assert.defined(validator, 'Validator must be provided');
            assert.ok((typeof validator === 'undefined' ? 'undefined' : _typeof(validator)) === 'object' && validator, 'Expected a validator object');
            assert.ok(validator.execute && validator.match, 'Provided validator does not match the interface');
            this._validators.push(validator);
            return this;
        }
    }, {
        key: 'setDefaults',
        value: function setDefaults(defaults) {
            assert.defined(defaults, 'Defaults must be provided');
            assert.object(defaults, 'Defaults must be an object');
            this._defaults = defaults;
            return this;
        }
    }, {
        key: 'updateDefaults',
        value: function updateDefaults(defaults) {
            assert.defined(defaults, 'Defaults must be provided');
            assert.object(defaults, 'Defaults must be an object');
            Object.assign(this._defaults, defaults);
            return this;
        }
    }, {
        key: 'updateNonEssentialDefaults',
        value: function updateNonEssentialDefaults(defaults) {
            assert.defined(defaults, 'Non-essential Defaults must be provided');
            assert.object(defaults, 'Non-essential Defaults must be an object');
            Object.assign(this._nonEssentialDefaults, defaults);
            return this;
        }
    }, {
        key: 'setEvents',
        value: function setEvents(events) {
            assert.defined(events, 'Events must be provided');
            assert.object(events, 'Events must be an object');
            this._events = events;
            return this;
        }
    }, {
        key: 'setDefaultValueTimeout',
        value: function setDefaultValueTimeout(defaultValueTimeout) {
            assert.defined(defaultValueTimeout, 'Default Value Timeout must be provided');
            this._defaultValueTimeout = defaultValueTimeout;
            return this;
        }
    }, {
        key: 'setDefaultContinueOnFail',
        value: function setDefaultContinueOnFail(defaultContinueOnFail) {
            assert.defined(defaultContinueOnFail, 'Default Continue On Fail must be provided');
            this._defaultContinueOnFail = defaultContinueOnFail;
            return this;
        }
    }, {
        key: 'setPublisherFailHandler',
        value: function setPublisherFailHandler(onPublisherFailHandler) {
            assert.defined(onPublisherFailHandler, 'Publisher Fail Handler must be provided');
            this._onPublisherFailHandler = onPublisherFailHandler;
            return this;
        }
    }, {
        key: 'setMuted',
        value: function setMuted(isMuted) {
            assert.defined(isMuted, 'Is Muted must be provided');
            assert.boolean(isMuted, 'Is Muted must be a boolean');
            this._isMuted = isMuted;
            return this;
        }
    }, {
        key: 'setMaxBatchSize',
        value: function setMaxBatchSize(maxBatchSize) {
            assert.defined(maxBatchSize, 'Max Batch Size must be provided');
            assert.number(maxBatchSize, 'Max Batch Size must be a number');
            assert.ok(maxBatchSize > 0, 'Max Batch Size must be higher than 0');
            this._maxBatchSize = maxBatchSize;
            return this;
        }
    }, {
        key: 'withEventTransformer',
        value: function withEventTransformer(transformer) {
            assert.defined(transformer, 'Event Transformer must be provided');
            assert.func(transformer, 'Event Transformer must be a function');
            this._eventTransformer = transformer;
            return this;
        }
    }, {
        key: 'withPayloadTransformer',
        value: function withPayloadTransformer(transformer) {
            assert.defined(transformer, 'Payload Transformer must be provided');
            assert.func(transformer, 'Payload Transformer must be a function');
            this._payloadTransformer = transformer;
            return this;
        }
    }, {
        key: 'withConsentPolicyGetter',
        value: function withConsentPolicyGetter(getter) {
            assert.defined(getter, 'Consent Policy Getter must be provided');
            assert.func(getter, 'Consent Policy Getter must be a function');
            this._consentPolicyGetter = getter;
            return this;
        }
    }, {
        key: 'logger',
        value: function logger(context) {
            var _this = this;

            var logger = new BiLogger({
                publishers: this._publishers,
                validators: this._validators,
                defaults: this._defaults,
                events: this._events,
                defaultValueTimeout: this._defaultValueTimeout,
                defaultContinueOnFail: this._defaultContinueOnFail,
                onPublisherFailHandler: this._onPublisherFailHandler,
                isMuted: function isMuted() {
                    return _this._isMuted;
                },
                eventTransformer: this._eventTransformer,
                payloadTransformer: this._payloadTransformer,
                consentPolicyGetter: this._consentPolicyGetter,
                nonEssentialDefaults: this._nonEssentialDefaults,
                maxBatchSize: this._maxBatchSize
            }, context);

            biLoggerManager.manager.notifyLoggerCreated(logger);

            return logger;
        }
    }]);

    return BiLoggerFactory;
}();

module.exports = BiLoggerFactory;
//# sourceMappingURL=bi-logger-factory.js.map