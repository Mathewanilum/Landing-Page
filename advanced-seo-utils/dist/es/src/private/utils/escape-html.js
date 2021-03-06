export function escapeHtml(text, _a) {
    var strictForJson = (_a === void 0 ? {} : _a).strictForJson;
    return (text || '').replace(/["'&<>\t\n\f\b]/g, function(match) {
        switch (match.charCodeAt(0)) {
            case 34: // "
                return '&quot;';
            case 39: // '
                return String(match);
            case 9: // tab
                if (strictForJson) {
                    return '&#009;';
                } else {
                    return '\t';
                }
            case 10: // break line
                if (strictForJson) {
                    return '&#010;';
                } else {
                    return '\n';
                }
            case 12: // break line
                if (strictForJson) {
                    return '&#012;';
                } else {
                    return '\f';
                }
            case 8: // backspace
                if (strictForJson) {
                    return '&#008;';
                } else {
                    return '\b';
                }
            case 38: // &
                return '&amp;';
            case 60: // <
                return '&lt;';
            case 62: // >
                return '&gt;';
            default:
                return '';
        }
    });
}