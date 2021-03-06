import {
    CONTENT_TYPE_HEADER,
    JSON_CONTENT_TYPE
} from '../helper/httpHelper';
import {
    InvalidServerResponse
} from '..';
export var ServerModuleResultExtractor = function() {
    var moduleResult = function(httpResponse) {
        var contentType = httpResponse.rawHttpResponse.headers.get(CONTENT_TYPE_HEADER);
        if (contentType) {
            return contentType.includes(JSON_CONTENT_TYPE) ? httpResponse.rawHttpResponse.json() : httpResponse.rawHttpResponse.text();
        }
        return Promise.reject(new InvalidServerResponse('server response is missing content-type header'));
    };
    return {
        moduleResult: moduleResult
    };
};