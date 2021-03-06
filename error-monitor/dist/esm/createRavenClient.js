import {
    __assign
} from "tslib";
import {
    sanitizeTags
} from './utils/addTags';
import {
    RavenToSentryAdapter
} from './utils/RavenToSentryAdapter';
import {
    InternalErrorMonitor
} from './InternalErrorMonitor';
import {
    createRavenToSentryTransportTestkitAdapter
} from './utils/createRavenToSentryTransportTestkitAdapter';
/**
 * Creates new Raven client, to be used inside Viewer
 *
 * @param options
 * @return ravenClient
 */
export function createRavenClient(options) {
    var Raven = options.Raven,
        dsn = options.dsn,
        _a = options.appName,
        appName = _a === void 0 ? '' : _a,
        version = options.version,
        tags = options.tags,
        user = options.user,
        environment = options.environment,
        beforeSend = options.beforeSend,
        transport = options.transport;
    // Using "new Raven.Client()" to avoid altering the global Raven. See raven-js/src/singleton.js
    // @ts-expect-error
    var ravenClient = new Raven.Client();
    var sanitizedTags = tags ? sanitizeTags(tags, appName) : undefined;
    var release = version ? "".concat(appName, "@").concat(version) : undefined;
    var ravenOptions = __assign(__assign(__assign(__assign({}, (beforeSend && {
        dataCallback: beforeSend
    })), (environment && {
        environment: environment
    })), (sanitizedTags && {
        tags: sanitizedTags
    })), (release && {
        release: release
    }));
    ravenClient.config(dsn, ravenOptions);
    if (user && user.id) {
        ravenClient.setUserContext(user);
    }
    // for testing purposes only
    if (transport) {
        var ravenTransportAdapter = createRavenToSentryTransportTestkitAdapter(transport);
        ravenClient.setTransport(ravenTransportAdapter);
    }
    var sentryCompatibleRaven = new RavenToSentryAdapter(ravenClient);
    // we use type casting here because we don't want Raven types to leak inside ErrorMonitor
    return new InternalErrorMonitor(sentryCompatibleRaven, options.appName);
}
//# sourceMappingURL=createRavenClient.js.map