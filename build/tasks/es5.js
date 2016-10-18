'use strict'

const gulp = require('gulp')

const config = require('../config')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const source = require('vinyl-source-stream')
const umd = require('gulp-umd')

gulp.task('es5', () => {
  return gulp.src(config.js.src)
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          title: 'Build ES5',
          message: err.message
        }
      })
    }))
    .pipe(concat(`${config.projectName}.js`))
    .pipe(babel())
    .pipe(umd({
      exports: function (file) {
        return 'miniToastr'
      },
      namespace: function (file) {
        return 'miniToastr'
      }
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename({ basename: config.projectName + '.min' }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    ;
});