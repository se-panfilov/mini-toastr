var json2xml = require('../lib/json2xml.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['json2xml'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'exists': function(test) {
    test.expect(1);
    // tests here
    test.equal(typeof json2xml, 'function', 'should be a function.');
    test.done();
  },
  'opts': function(test) {
    test.expect(8);
    test.equal(json2xml({a:''}),'<a/>');
    test.equal(json2xml({a:null}),'<a/>');
    test.equal(json2xml({a:undefined}),'<a/>');

    test.equal(json2xml({a:1}),'<a>1</a>');
    test.equal(json2xml([{a:1}, {b:2}]),'<a>1</a><b>2</b>');
    
    test.equal(json2xml({ 'items':[{item:1},{item:2}]} ),'<items><item>1</item><item>2</item></items>');

    test.equal(json2xml({a:1}, { header:true }),'<?xml version="1.0" encoding="UTF-8"?><a>1</a>');
    test.equal(json2xml({a:1, attr:{b:2,c:3 }}, { attributes_key:'attr' }), '<a b="2" c="3">1</a>');
    test.done();
  }

};
