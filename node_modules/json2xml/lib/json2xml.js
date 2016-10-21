/**
 * Converts JSON object to XML string.
 *
 * 
 * Copyright(c) 2011 Etienne Lachance <et@etiennelachance.com>
 * MIT Licensed
 */
 
/*
 * Modifications (Ivo Georgiev <ivo@linvo.org>):
 *  Escape XML entities to avoid breaking the XML if any string in the JSON contains a special char
 *  Ignore special objects - objects that inherit other objects (in practice, when working with a third-party library, most of those are circular structures) 
 */

 /*
 *  Modifications (Alan Clarke <hi@alz.so>):
 *  added unit tests, ability to add xml node attributes, xml header option and simplified syntax
 *  removed root node, this is already covered by the module's default functionality
 */

var util = require('util');

var settings = {
	attributes_key:false,
	header:false
};

module.exports = function xml(json, opts) {
	if(opts){
		Object.keys(settings).forEach(function(k){
			if(typeof opts[k]==='undefined'){
				opts[k] = settings[k];
			}
		});
	} else {
		opts = settings;
	}

	var result = opts.header?'<?xml version="1.0" encoding="UTF-8"?>':'';
	opts.header = false;
	type = json.constructor.name;

	if(type==='Array'){

		json.forEach(function(node){
			result += xml(node, opts);
		});

	} else if(type ==='Object' && typeof json === "object") {

		Object.keys(json).forEach(function(key){
			if(key!==opts.attributes_key){
				var node = json[key],
				attributes = '';

                if(typeof node === 'undefined' || null === node) node = '';

				if(opts.attributes_key && json[opts.attributes_key]){
					Object.keys(json[opts.attributes_key]).forEach(function(k){
						attributes += util.format(' %s="%s"', k, json[opts.attributes_key][k]);
					});
				}
				var inner = xml(node,opts);

				if(inner){
					result += util.format("<%s%s>%s</%s>", key, attributes, xml(node,opts), key);
				} else {
					result += util.format("<%s%s/>", key, attributes);
				}
			}
		});
	} else {
		return json.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');	
	}

	return result;
}