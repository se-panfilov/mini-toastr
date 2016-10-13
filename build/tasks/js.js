'use strict';

const gulp = require('gulp');

const config = require('../config');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const webpack = require('webpack-stream');

gulp.task('js', () => {
  const moduleWrap =
    `var ${config.projectName} = (function () {` +
    '\n\r\'use strict\';' +
    '\n\r<%= contents %>' +
    '\n\r//Support of node.js' +
    '\n\rif (typeof module === \'object\' && module.exports) module.exports = exports;' +
    '\n\rreturn exports;' +
    '\n\r})();';

  return gulp.src(config.js.src)
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Build JS',
          message: err.message
        };
      })
    }))
    .pipe(concat(config.projectName + '.js'))
    .pipe(rename({ basename: `${config.projectName}.es6` }))
    .pipe(gulp.dest(config.dest))
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(rename({ basename: config.projectName }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename({ basename: config.projectName + '.min' }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    // .pipe(babel())
    // .pipe(rename({ basename: config.projectName }))
    // .pipe(gulp.dest(config.dest))
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(uglify())
    // .pipe(rename({ basename: `${config.projectName}.min` }))
    // .pipe(gulp.dest(config.dest))
    // .pipe(sourcemaps.write('.'))
    // .pipe(gulp.dest(config.dest))
    ;
});