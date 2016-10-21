'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var leasot = require('leasot');
var defaults = require('lodash.defaults');
var omit = require('lodash.omit');

var PluginError = gutil.PluginError;
var pluginName = 'gulp-todo';

function logCommentsToConsole(comments) {
    comments.forEach(function (comment) {
        var isTodo = /todo/i.test(comment.kind);
        var commentType = isTodo ? gutil.colors.cyan(comment.kind) : gutil.colors.magenta(comment.kind);
        var commentLocation = '@' + gutil.colors.gray(comment.file + ':' + comment.line);
        gutil.log(commentType, comment.text, commentLocation);
    });
}

module.exports = function (options) {
    options = defaults(options || {}, {
        fileName: 'TODO.md',
        verbose: false,
        absolute: false,
        reporter: 'markdown'
    });
    var config = omit(options, ['fileName', 'verbose', 'absolute']);
    var firstFile;
    var comments = [];

    return through.obj(function collectTodos(file, enc, cb) {
            if (file.isNull()) {
                cb(null, file);
                return;
            }

            if (file.isStream()) {
                cb(new PluginError(pluginName, 'Streaming not supported'));
                return;
            }
            firstFile = firstFile || file;
            //get extension - assume .js as default
            var ext = path.extname(file.path) || '.js';
            //check if parser for filetype exists
            //TODO: perhaps just skip unsupported files
            if (!leasot.isExtSupported(ext)) {
                var msg = ['File:', file.path, '- Extension', gutil.colors.red(ext),
                    'is not supported'
                ].join(' ');
                cb(new PluginError(pluginName, msg));
                return;
            }
            var filePath;
            if (options.absolute) {
                filePath = file.path;
            } else {
                filePath = file.path && file.relative || file.path;
            }
            var _comments = leasot.parse({
                ext: ext,
                content: file.contents.toString('utf8'),
                fileName: filePath,
                customTags: config.customTags,
                withInlineFiles: config.withInlineFiles
            });
            if (options.verbose) {
                logCommentsToConsole(_comments);
            }
            comments = comments.concat(_comments);
            cb();
        },
        function reportTodos(cb) {
            if (!firstFile) {
                cb();
                return;
            }
            var newContents;
            try {
                newContents = leasot.reporter(comments, config);
            } catch (e) {
                cb(new gutil.PluginError(pluginName, e));
                return;
            }

            var todoFile = new gutil.File({
                cwd: firstFile.cwd,
                base: firstFile.base,
                path: path.join(firstFile.base, options.fileName),
                contents: new Buffer(newContents)
            });
            // also pass along comments object for future reporters
            todoFile.todos = comments;
            this.push(todoFile);
            cb();
        });
};

var reporter = require('./lib/reporter');
module.exports.reporter = reporter;
