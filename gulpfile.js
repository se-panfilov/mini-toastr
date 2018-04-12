const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject('tsconfig.json');

gulp.task("default", function () {
  return gulp.src("src/*.ts")
    // .pipe(sourcemaps.init())
    .pipe(tsProject())
    // .pipe(gulp.dest('dist'))
    // .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
    .pipe(gulp.dest('dist'));

});