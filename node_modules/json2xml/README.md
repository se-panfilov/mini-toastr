node-json2xml
===========

Description
-----------

Simple JavaScript Object to XML string converter.

Installation
------------

Simplest way to install `json2xml` is to use [npm](http://npmjs.org), just `npm
install json2xml` which will download json2xml and all dependencies.

Simple usage
-----------
    
    var json2xml = require('json2xml');
	json2xml(json, options);

Options & Behaviour
-----------
	none:
	json2xml({ a: 1 });
    //<a>1</a>

    empty node:
    json2xml({ a: '' });
    //<a/>

	add header:
	json2xml({ a: 1 }, { header: true });
	//<?xml version="1.0" encoding="UTF-8"?><a>1</a>

	add node attributes:
	json2xml({ a: 1, attr: { b: 2, c: 3 } }, { attributes_key: 'attr' });	
	// <a b="2" c="3" >1</a>

	arrays:
	json2xml([ { a: 1 }, { b: 2 } ]);
	//'<a>1</a><b>2</b>

	json2xml({ 'items': [ { item: 1 }, { item: 2 } ] });
	//'<items><item>1</item><item>2</item></items>'