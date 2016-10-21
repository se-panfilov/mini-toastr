
# to-pascal-case [![Build Status](https://travis-ci.org/ianstormtaylor/to-pascal-case.svg?branch=master)](https://travis-ci.org/ianstormtaylor/to-pascal-case)

Convert a string to pascal case. Part of the series of [case helpers](https://github.com/ianstormtaylor/to-case).


## Installation

```
$ npm install to-pascal-case
```


## Example

```js
var toPascalCase = require('to-pascal-case');

toPascalCase('space case');  // "SpaceCase"
toPascalCase('snake_case');  // "SnakeCase"
toPascalCase('dot.case');    // "DotCase"
toPascalCase('weird[case');  // "WeirdCase"
```


## API

### toPascalCase(string)
  
Returns the `string` converted to pascal case.


## License

The MIT License (MIT)

Copyright &copy; 2016, Ian Storm Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
