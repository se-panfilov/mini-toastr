# [gulp](https://github.com/wearefractal/gulp)-todo
> Parse and output TODOs and FIXMEs from comments in your file in a stream

[![NPM Version](http://img.shields.io/npm/v/gulp-todo.svg?style=flat)](https://npmjs.org/package/gulp-todo)
[![NPM Downloads](http://img.shields.io/npm/dm/gulp-todo.svg?style=flat)](https://npmjs.org/package/gulp-todo)
[![Build Status](http://img.shields.io/travis/pgilad/gulp-todo.svg?style=flat)](https://travis-ci.org/pgilad/gulp-todo)

Parse your files in a gulp-stream, extracting todos/fixmes from comments and reporting them
in a reporter to your choosing using [leasot](https://github.com/pgilad/leasot).

Issues with the output should be reported on the [leasot issue tracker](https://github.com/pgilad/leasot/issues)

## Install

Install with [npm](https://npmjs.org/package/gulp-todo)

```sh
$ npm install --save-dev gulp-todo
```

## Usage

```js
var gulp = require('gulp');
var todo = require('gulp-todo');

// generate a todo.md from your javascript files
gulp.task('todo', function() {
    gulp.src('js/**/*.js')
        .pipe(todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos
});

// generate todo from your jade files
gulp.task('todo-jade', function() {
    gulp.src('partials/**/*.jade')
        .pipe(todo({ fileName: 'jade-todo.md' }))
        .pipe(gulp.dest('./'));
        // -> Will output a jade-todo.md with your todos
});

// get filenames relative to project root (where your gulpfile is)
gulp.task('todo-absolute', function() {
    gulp.src('js/**/*.js')
        .pipe(todo({
            absolute: true
        }))
        .pipe(gulp.dest('./'));
});

// get relative path filenames
gulp.task('todo-absolute', function() {
    gulp.src('js/**/*.js', { base: '/' })
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

// create a json output of the comments (useful for CI such as jenkins)
gulp.task('todo-json', function () {
    gulp.src('./**/*.js', {
        base: './'
    })
        .pipe(todo({
            fileName: 'todo.json',
            reporter: 'json'
        }))
        .pipe(gulp.dest('./'));
});

// output once in markdown and then output a json file as well
gulp.task('todo-reporters', function() {
    gulp.src('js/**/*.js')
        .pipe(todo())
        .pipe(gulp.dest('./')) //output todo.md as markdown
        .pipe(todo.reporter('json', {fileName: 'todo.json'}))
        .pipe(gulp.dest('./')) //output todo.json as json
});


// Delete the todo.md file if no todos were found
var gulpIf = require('gulp-if');
var del = require('del');
var vinylPaths = require('vinyl-paths');
gulp.task('todo-delete', function() {
    gulp.src('js/**/*.js')
        .pipe(todo())
        .pipe(gulpIf(function (file) {
            return file.todos && Boolean(file.todos.length);
        }, vinylPaths(del), gulp.dest('./'));
});
```

#### Injecting the todo generated file into another template

If you want to inject the generated todo stream into another file (say a `readme.md.template`)
you can do the following:

- Create `readme.md.template` file that contains the following marker, marking where you want to inject the generated todo file:

```md
### some previous content
<%= marker %>
```

- Use the following code to inject into that markdown, creating a markdown file with the generated todo:

```js
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var todo = require('gulp-todo');
var template = require('lodash.template');
var through = require('through2');

gulp.task('default', function () {
    gulp.src('./js/**/*.js')
        .pipe(todo())
        .pipe(through.obj(function (file, enc, cb) {
            //read and interpolate template
            var tmpl = fs.readFileSync('./readme.md.template', 'utf8');
            var compiledTpl = template(tmpl);
            var newContents = compiledTpl({
                'marker': file.contents.toString()
            });
            //change file name
            file.path = path.join(file.base, 'readme-new.md');
            //replace old contents
            file.contents = new Buffer(newContents);
            //push new file
            this.push(file);
            cb();
        }))
       .pipe(gulp.dest('./'));
});
```

## Supported Filetypes

See https://github.com/pgilad/leasot#supported-languages

## API

### todo(options)

`options` is an optional object, that may contain the following properties:

#### fileName

Specify the output filename.

**Type**: `String`

**Default**: `TODO.md`

#### verbose

Output comments to console as well.

**Type**: `Boolean`

**Default**: `false`

#### absolute

Output absolute paths of files (as available via `file.path`)

#### customTags

See [customTags](https://github.com/pgilad/leasot#parseoptions).

#### withInlineFiles

See [withInlineFiles](https://github.com/pgilad/leasot#parseoptions).

#### reporter

Which reporter to use.

All other `params` are passed along to the selected reporter (except `verbose` and `fileName`)

For options and more information about using reporters,
see: https://github.com/pgilad/leasot#reporter and
https://github.com/pgilad/leasot#built-in-reporters

**Type**: `String|Function`

**Default**: `markdown`

### todo.reporter(reporter, options)

Use another reporter in stream, will replace the contents of the output file.
Must be used after `todo()`, since it uses the `file.todos` that are passed along.

See the example in the [usage](#usage)

#### reporter

Same options as the above settings for `reporter`

#### options

Pass along options to the reporter, and also if you pass a `fileName` - it will rename the filename in stream.

## License

MIT @[Gilad Peleg](http://giladpeleg.com)
