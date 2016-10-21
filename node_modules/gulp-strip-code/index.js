var es = require('event-stream');

module.exports = function (options) {
    var doStrip = function (file, callback) {
        var isStream = file.contents && typeof file.contents.on === 'function' && typeof file.contents.pipe === 'function';
        var isBuffer = file.contents instanceof Buffer;

        if (typeof options === 'undefined') {
            options = {};
        };
        options.start_comment = (typeof options.start_comment === 'undefined') ? 'test-code' : options.start_comment;
        options.end_comment = (typeof options.end_comment === 'undefined') ? 'end-test-code' : options.end_comment;
        options.keep_comments = typeof options.keep_comments === 'undefined' ? false : options.keep_comments;

        var pattern = options.pattern || new RegExp("([\\t ]*\\/\\* ?" + options.start_comment + " ?\\*\\/)[\\s\\S]*?(\\/\\* ?" + options.end_comment + " ?\\*\\/[\\t ]*\\n?)", "g");

        if (isStream) {
            return callback(new Error('gulp-strip-code: Streaming not supported'), file);
        }

        if (isBuffer) {
            if(options.keep_comments){
                file.contents = new Buffer(String(file.contents).replace(pattern, "$1\n$2"));
            }
            else{
                file.contents = new Buffer(String(file.contents).replace(pattern, ""));
            }
            return callback(null, file);
        }

        callback(null, file);
    };

    return es.map(doStrip);
};
