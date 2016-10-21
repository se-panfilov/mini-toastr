source
======

Grab all of the source files from a package.

methods
=======

modules
-------

Returns an object with top-level names mapped to file contents.

The 'package.json' key is special in that it contains a JSON.parse()'d Object
instead of a Buffer with the contents.

examples
========

traverse
    
    var source = require('source')
    console.dir(Object.keys(
        source.modules('traverse')
    ));

*** 
   [ 'traverse', 'traverse/package.json' ]

jade
    
    var source = require('source')
    console.dir(Object.keys(
        source.modules('jade')
    ));

*** 
    [ 'jade',
      'jade/package.json',
      'jade/lib/jade.js',
      'jade/lib/compiler.js',
      'jade/lib/utils.js',
      'jade/lib/self-closing.js',
      'jade/lib/index.js',
      'jade/lib/._parser.js',
      'jade/lib/lexer.js',
      'jade/lib/parser.js',
      'jade/lib/._doctypes.js',
      'jade/lib/._self-closing.js',
      'jade/lib/doctypes.js',
      'jade/lib/filters.js',
      'jade/lib/nodes/tag.js',
      'jade/lib/nodes/filter.js',
      'jade/lib/nodes/doctype.js',
      'jade/lib/nodes/code.js',
      'jade/lib/nodes/._each.js',
      'jade/lib/nodes/block.js',
      'jade/lib/nodes/index.js',
      'jade/lib/nodes/._block.js',
      'jade/lib/nodes/._code.js',
      'jade/lib/nodes/._text.js',
      'jade/lib/nodes/comment.js',
      'jade/lib/nodes/text.js',
      'jade/lib/nodes/each.js',
      'jade/lib/nodes/node.js',
      'jade/lib/._filters.js',
      'jade/lib/._jade.js',
      'jade/._index' ]
