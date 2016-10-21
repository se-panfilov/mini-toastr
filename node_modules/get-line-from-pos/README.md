# get-line-from-pos
> Get the line number of a string using index or position

[![NPM Version](http://img.shields.io/npm/v/get-line-from-pos.svg?style=flat)](https://npmjs.org/package/get-line-from-pos)
[![NPM Downloads](http://img.shields.io/npm/dm/get-line-from-pos.svg?style=flat)](https://npmjs.org/package/get-line-from-pos)
[![Build Status](http://img.shields.io/travis/pgilad/get-line-from-pos.svg?style=flat)](https://travis-ci.org/pgilad/get-line-from-pos)

Lookup a line number in a string using an index or position.

Useful if you want to get a line number of a position or index from a regex match, but can
also be used in other situations.

- Allows using negative positions to lookup line number.
- Supported by CommonJS, AMD and browser.
- Supports Regular line ending style (`\n`) and MacOS line ending style (`\r`).

#### Installation

```bash
$ npm install --save get-line-from-pos
```

## Usage

### CommonJS

```js
var getLineFromPos = require('get-line-from-pos');

var str = 'string with \n multiple \n lines';
console.log(getLineFromPos(str, /multiple/g.exec(str)));
// -> 2
```

### AMD

```js
define(['getLineFromPos'], function(getLineFromPos){
    var pos = getLineFromPos(multipleLineStr, index);
    console.log(pos);
    //-> line number that index is on
});
```

### Browser

Load the script:
```html
<script src="../get-line-from-pos/index.js"></script>
```

Then when you need to use it:
```
console.log(getLineFromPos(someStr, -1));
//-> Will output the number of lines in someStr
```

## API

`getLineFromPos(inputStr, index)`

Both parameters are required.

### inputStr

Type: `String`

**Required**

String to do the lookup for line number.

### index

Type: `Number`

**Required**

The index or position to lookup the line number.

## License
Copyright © 2014 Gilad Peleg.
Licensed under the MIT license.
