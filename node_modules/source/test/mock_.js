var assert = require('assert');
var source = require('source');
var path = require('path');

exports.mock = function () {
    var files = source.modules(__dirname + '/mock');
    
    assert.ok(Object.keys(files).every(function (file) {
        return !path.basename(file).match(/^\./);
    }), 'hidden files not ignored');
    
    var sliced = Object.keys(files).reduce(function (acc, x) {
        var file = x.slice(__dirname.length + 1);
        acc[file] = files[x];
        return acc;
    }, {});
    
    assert.eql(
        Object.keys(sliced).sort(),
        [ 'mock', 'mock/lib/moo', 'mock/package.json', 'mock/zing' ].sort()
    );
};
