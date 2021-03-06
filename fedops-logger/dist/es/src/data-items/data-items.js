import DataItem from './common/data-item';
import BiAppContextDataItem from './common/bi-app-context-item';
import ResourceDataItem from './resource/resource-item';
import DurationDataItem from './duration/duration-item';
import {
    createPhasesCollection,
    calcPhaseDuration
} from './phases/utils';
export var DataItems = /*#__PURE__*/ function() {
    function DataItems(sessionId, preset) {
        this._sessionId = sessionId;
        this._preset = preset;
    }

    var _proto = DataItems.prototype;

    _proto.biAppLoadStart = function biAppLoadStart() {
        return this._biDataItem(this._preset.appLoadStart.eventId);
    };

    _proto.biAppLoadFinish = function biAppLoadFinish() {
        return this._biDataItem(this._preset.appLoadFinish.eventId);
    };

    _proto.biInteractionStart = function biInteractionStart() {
        return this._biDataItem(this._preset.interactionStart.eventId);
    };

    _proto.biInteractionEnd = function biInteractionEnd() {
        return this._biDataItem(this._preset.interactionEnd.eventId);
    };

    _proto.biLoadPhaseStart = function biLoadPhaseStart() {
        return this._biDataItem(this._preset.loadPhaseStart.eventId);
    };

    _proto.biLoadPhaseFinish = function biLoadPhaseFinish() {
        return this._biDataItem(this._preset.loadPhaseFinish.eventId);
    };

    _proto.biBlackbox = function biBlackbox(performanceEntry) {
        var entryTypeToEventId = {
            environment: 500,
            'initial-paint': 501,
            loaded: 502,
            visibility: 503,
            'first-input': 504,
            'page-transition': 505,
            crux: 506,
            'crux-cls': 507
        };
        var eventId = entryTypeToEventId[performanceEntry.entryType];
        return eventId && this._biDataItem(eventId);
    };

    _proto.blackboxPerformance = function blackboxPerformance(performanceEntry) {
        return this.dataItem(performanceEntry);
    };

    _proto.webVitalsLoaded = function webVitalsLoaded() {
        return this._biDataItem(29);
    };

    _proto.webVitalsFirstInput = function webVitalsFirstInput() {
        return this._biDataItem(39);
    };

    _proto.biError = function biError() {
        return this._biDataItem(this._preset.error.eventId);
    };

    _proto.appName = function appName(_ref) {
        var _appName = _ref.appName,
            isServerSide = _ref.isServerSide;
        return this.dataItem({
            appName: isServerSide ? _appName + '_ssr' : _appName
        });
    };

    _proto.artifact = function artifact(_ref2) {
        var artifactId = _ref2.id,
            artifactVersion = _ref2.version,
            isRollout = _ref2.isRollout;
        return this.dataItem({
            artifactId: artifactId,
            artifactVersion: artifactVersion,
            isRollout: isRollout
        });
    };

    _proto.appContext = function appContext(params) {
        return new BiAppContextDataItem(params);
    };

    _proto.customParams = function customParams(_customParams) {
        return this.dataItem({
            customParams: _customParams
        });
    };

    _proto.duration = function duration(_duration) {
        return new DurationDataItem(_duration);
    };

    _proto.loadingPhaseCollection = function loadingPhaseCollection(phasesOfApp) {
        var phases = JSON.stringify(createPhasesCollection(phasesOfApp));
        return this.dataItem({
            phases: phases
        });
    };

    _proto.loadingPhaseStart = function loadingPhaseStart(_ref3) {
        var name = _ref3.name;
        return this.dataItem({
            name: name
        });
    };

    _proto.loadingPhaseFinish = function loadingPhaseFinish(_ref4) {
        var name = _ref4.name,
            phaseStartTime = _ref4.phaseStartTime;
        var duration = calcPhaseDuration(phaseStartTime);
        return this.dataItem({
            name: name,
            duration: duration
        });
    };

    _proto.resource = function resource() {
        var data = this._asBiEvent(this._preset.resource.eventId);

        return new ResourceDataItem(data);
    };

    _proto.dataItem = function dataItem(params) {
        return new DataItem(params);
    };

    _proto._biDataItem = function _biDataItem(eventId) {
        var data = this._asBiEvent(eventId);

        return this.dataItem(data);
    };

    _proto._asBiEvent = function _asBiEvent(evid) {
        return {
            src: this._preset.src,
            evid: evid,
            session_id: this._sessionId,
            _: new Date().getTime() // cache buster

        };
    };

    return DataItems;
}();