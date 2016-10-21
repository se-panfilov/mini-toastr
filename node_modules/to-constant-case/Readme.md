
# to-constant-case [![Build Status](https://travis-ci.org/ianstormtaylor/to-constant-case.svg?branch=master)](https://travis-ci.org/ianstormtaylor/to-constant-case)

Convert a string to a constant case. Part of the series of [case helpers](https://github.com/ianstormtaylor/to-case).


## Installation

```
$ npm install to-constant-case
```


## Example

```js
var constant = require('to-constant-case');

constant('camelCase');  // "CAMEL_CASE"
constant('snake_case'); // "SNAKE_CASE"
constant('dot.case');   // "DOT_CASE"
constant('weird[case'); // "WEIRD_CASE"
```


## API

### toConstantCase(string)
  
Returns the `string` converted to constant case.


## License

The MIT License (MIT)

Copyright &copy; 2016, Ian Storm Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
