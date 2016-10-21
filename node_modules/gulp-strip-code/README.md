gulp-strip-code
===============

The gulp-strip-code plugin is used to remove sections of code.
Usefull to remove code from production builds that are only needed in development and test environments, or to remove custom internationalized information. 
This plugin uses start and end comments to identify the code sections to strip out. For example:

> Inspired by [grunt-strip-code](https://github.com/nuzzio/grunt-strip-code)

```css
/*! i18n EN start */
.onlyEnStyle {
    color: red;
}
/*! i18n EN end */

.otherStyle {
    color: red;
}
```

```js
/* test-code */
removeMeInProduction();
/* end-test-code */

doNotRemoveMe();
```

## Getting Started
First, install `gulp-strip-code` as a development dependency:

```shell
npm install gulp-strip-code
```

## The "strip_code" task

### Overview
Add to your `gulpfile.js`:

```js
var stripCode = require('gulp-strip-code');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(stripCode({
      start_comment: "start-test-block",
      end_comment: "end-test-block"
    }))
    .pipe(gulp.dest('build/file.txt'));
});
```

### Options

#### options.start_comment
Type: `String`
Default value: `test-code`

The text inside the opening comment used to identify code to strip.

#### options.end_comment
Type: `String`
Default value: `end-test-code`

The text inside the closing comment used to identify code to strip.

#### options.keep_comments
Type: `Boolean`
Default value: `false`

Sets the behaviour to keep the identifying comments or not.
Setting a truthy value for keep_comments will enable it.

#### options.pattern
Type: `RegExp`
Default value: (a generated RegExp matching the start and end comments)

If the default start and end comment matching doesn't work for you needs, you can supply your own RegExp to match against. If the `pattern` option is specified, the `start_comment` and `end_comment` options are ignored.

## Tests

```shell
npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.4 small bugs fixed
* 0.1.3 keep comments option added
* 0.1.2 default values added
* 0.1.0 Initial release

## License

[MIT](http://opensource.org/licenses/MIT) © [Massimiliano Zoffoli](http://massimilianozoffoli.com)
