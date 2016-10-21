
var assert = require('assert')
var sentence = require('..')

/**
 * Cases.
 */

var strings = {
  camel: 'thisIsAString',
  constant: 'THIS_IS_A_STRING',
  dot: 'this.is.a.string',
  pascal: 'ThisIsAString',
  snake: 'this_is_a_string',
  space: 'this is a string',
  title: 'This Is a String'
}

/**
 * Tests.
 */

describe('to-sentence-case', function () {
  for (var key in strings) test(key)

  it('shouldnt touch sentence case', function () {
    assert.equal(sentence('A sentence case string.'), 'A sentence case string.')
  })

  it('should preserve punctuation', function () {
    assert.equal(sentence('A Title: Case of Something.'), 'A title: case of something.')
  })
})

/**
 * Create a test for a given case `key`.
 *
 * @param {String} key
 */

function test(key) {
  it('should convert ' + key + ' case', function () {
    assert.equal(sentence(strings[key]), 'This is a string')
  })
}
