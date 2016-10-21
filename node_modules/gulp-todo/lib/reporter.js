'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var leasot = require('leasot');
var PluginError = gutil.PluginError;
var pluginName = 'gulp-todo';

module.exports = function (reporter, options) {
    options = options || {};
    if (!reporter) {
        throw new PluginError('Reporter is required');
    }
    options.reporter = reporter;
    var fileName = options.fileName;
    delete options.fileName;
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(pluginName, 'Streaming not supported'));
            return;
        }

        // replace contents with requested reporter contents
        if (file.todos && file.todos.length) {
            var newContents;
            try {
                newContents = leasot.reporter(file.todos, options);
            } catch (e) {
                cb(new gutil.PluginError(pluginName, e));
                return;
            }

            if (fileName) {
                file.path = path.join(file.base, fileName);
            }
            file.contents = new Buffer(newContents);
        }

        cb(null, file);
    });
};
