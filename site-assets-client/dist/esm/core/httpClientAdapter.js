import {
    HttpClientFetchError,
    UnexpectedHttpClientError
} from '..';
import {
    isAxiosStyleError
} from '../helper/httpHelper';
import {
    DateTimeProvider
} from '../helper/timeProvider';
export var HttpClientAdapter = function(httpClient, moduleMetricsReporter, timeProvider) {
    if (timeProvider === void 0) {
        timeProvider = DateTimeProvider();
    }
    var reject = function(msg, err) {
        return Promise.reject(new HttpClientFetchError(msg, err));
    };
    var getHttpResponse = function(httpHandler) {
        return httpClient.fetch(httpHandler.requestUrl, httpHandler.requestInit)
            .then(httpHandler.transformResponse);
    };
    var call = function(httpHandler) {
        var start = timeProvider.now();
        try {
            return getHttpResponse(httpHandler)
                .catch(function(httpResponseError) {
                    if (isAxiosStyleError(httpResponseError)) {
                        return reject(httpHandler.rejectMessage(httpResponseError.response.status, httpResponseError.response.data));
                    }
                    return reject(httpResponseError.message, httpResponseError);
                })
                .then(function(httpResponse) {
                    if (!httpResponse.rawHttpResponse.ok) {
                        return httpHandler.extractErrorMessage(httpResponse).then(reject);
                    }
                    var end = timeProvider.now();
                    httpResponse.reportMetrics(moduleMetricsReporter, end - start);
                    return httpResponse;
                });
        } catch (httpClientError) {
            return Promise.reject(new UnexpectedHttpClientError(httpClientError));
        }
    };
    return {
        call: call
    };
};