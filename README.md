[![Codacy Badge](https://api.codacy.com/project/badge/Grade/43efe3dd02c047f39bb3435e9c577092)](https://www.codacy.com/app/se-panfilov/mini-toastr?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=se-panfilov/mini-toastr&amp;utm_campaign=Badge_Grade)
[![bitHound Overall Score](https://www.bithound.io/github/se-panfilov/mini-toastr/badges/score.svg)](https://www.bithound.io/github/se-panfilov/mini-toastr) [![bitHound Code](https://www.bithound.io/github/se-panfilov/mini-toastr/badges/code.svg)](https://www.bithound.io/github/se-panfilov/mini-toastr)
[![Code Climate](https://codeclimate.com/github/se-panfilov/mini-toastr/badges/gpa.svg)](https://codeclimate.com/github/se-panfilov/mini-toastr)
[![Build Status](https://travis-ci.org/se-panfilov/mini-toastr.svg?branch=master)](https://travis-ci.org/se-panfilov/mini-toastr)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/se-panfilov/mini-toastr/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/mini-toastr.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mini-toastr/)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# mini-toastr

**mini-toastr** - it's a small non-blocking notification library. No dependencies.

[Demo][2]

================

## Instalation

1. Install

via npm:

```shell
npm i mini-toastr --save
```

via bower:

```shell
bower i mini-toastr --save
```
or download [latest release][1]

2. Include in project

include in project:

```HTML
<script src="bower_components/mini-toastr/mini-toastr.js"></script>
```

or

```JS
import miniToastr from 'mini-toastr' //ES6
```

3. Init

```JS
miniToastr.init()// config can be passed here miniToastr.init(config)
```

## Usage

```JS
miniToastr.success(message, title, timeout, cb, config)
miniToastr.info(message, title, timeout, cb, config)
miniToastr.warn(message, title, timeout, cb, config)
miniToastr.error(message, title, timeout, cb, config)
```

*Attention:* You can specify your own types in global config: `miniToastr.init({types: {debug: 'debug'}})` and use it - `miniToastr.debug(message, title, timeout, cb, config)`

## Methods arguments

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `message` | `String` | `undefined` | Yes | Message in notification |
| `title` | `String` | `undefined` | No | Title for notification |
| `timeout` | `Number` | `3000` | No | Time before notification gone |
| `cb` | `Function` | `undefined` | No | Callback function |
| `config` | `Object` | `undefined` | No | Local config for this menthod call |

## Global config

You can specify global config.

Here is default config:


```JS
const defaultConfig = {
    types: TYPES,
    animation: fadeOut,
    timeout: 3000,
    appendTarget: document.body,
    node: document.createElement('div'),
    style: {
      //Styles
    }
  }
```

| Name | Type | Default  | Description |
|---|---|---|---|
| `types` | `Object` | `{error: 'error', warn: 'warn', success: 'success', info: 'info'}` | List of methods that would be accessable via `miniToastr` i.e. `miniToastr.success()`, `miniToastr.info()`, etc |
| `animation` | `Function` | `fadeOut` | Function for remove notification. Can be overrrided |
| `timeout` | `Number` | `3000` | Notification time of life |
| `appendTarget` | `Node` | `document.body` | Dom element that miniToastr will be attached to |
| `node` | `Node` | `document.createElement('div')` | Dom element for notification's container |
| `style` | `Object` | Object of objects | Styles that would be applyied for notifications (after they wuld be translated from `js` to `css`  |

# Notifications structure

```HTML
<!-- Container-->
<div id="mini-toastr" class="mini-toastr">

    <!-- Notification 1-->
    <div class="mini-toastr__notification -error">
        <div class="mini-toastr-notification__title">My Title</div>
        <div class="mini-toastr-notification__message">My message</div>
    </div>

    <!-- Notification 2-->
    <div class="mini-toastr__notification -success">
        <div class="mini-toastr-notification__title">My Title 2</div>
        <div class="mini-toastr-notification__message">My message 2</div>
    </div>

    <!-- Notification 3-->
    <div class="mini-toastr__notification -warning">
        <div class="mini-toastr-notification__title">My Title 3</div>
        <i class="your_class mini-toastr-notification__icon"></i> <!-- You're able to use "img"or whatever instead-->
        <div class="mini-toastr-notification__message">My message 3</div>
    </div>
</div>
```

You can override those classes in your styles or in global config:

```JS
miniToastr.init({
    style: {
        'mini-toastr__notification': {
          'mini-toastr-notification__message': {
              'border-radius': '5px',
              color: 'red'
          }
        }
    }
})
```

## Adding an icon

You're able to add icons

```javascript
//You can use any font icon
miniToastr.setIcon('error', 'i', {'class': 'fa fa-warning'})
miniToastr.setIcon('info', 'i', {'class': 'fa fa-info-circle'})
miniToastr.setIcon('success', 'i', {'class': 'fa fa-check-circle-o'})

//Or image (or any other element)
miniToastr.setIcon('warn', 'img', {src: 'assets/img/demo-warn.png', style: 'vertical-align: bottom;'})
```

Basically `setIcon` get 3 params:
 
 - `type`(`String`) - `error`, `info`, `success`, or `warn`. So you can specify each event with custom icon
 - `nodeType`(`String`) - basically what kind of element it's has to be, e.g. `<i></i>` or `<img/>`
 - `attrs`(`Object`) - object with attributes for icon, such as `class`, `style`, or `src` (for `<img/>`)
 
 Usually you have to set `miniToastr.setIcon()` after `miniToastr.init()` but also you can do it on each toast call.
 
 Keep in mind, that if you will add class like `miniToastr.setIcon('info', 'i', {'class': 'fa fa-info-circle'})`,
 your actual class will be `fa fa-info-circle mini-toastr-notification__icon`.
 
 So you'll be able to customize all the icons with css


## Browser support.
All modern browsers (`ES5` support require). See [ECMAScript 5 compliant browsers][3].
You can use `ES5` or `ES6` versions as well.

## License

MIT License

Copyright (c) 2016 Sergei Panfilov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[1]: https://github.com/se-panfilov/mini-toastr/releases
[2]: https://se-panfilov.github.io/mini-toastr/
[3]: http://caniuse.com/#feat=es5
