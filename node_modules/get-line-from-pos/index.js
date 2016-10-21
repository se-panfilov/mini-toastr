(function (name, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(name, [], definition);
    } else {
        this[name] = definition();
    }
}('getLineFromPos', function () {
    return function getLineFromPos(str, pos) {
        if (pos === 0) {
            return 1;
        }
        //adjust for negative pos
        if (pos < 0) {
            pos = str.length + pos;
        }
        var lines = str.substr(0, pos).match(/[\n\r]/g);
        return lines ? lines.length + 1 : 1;
    };
}));
