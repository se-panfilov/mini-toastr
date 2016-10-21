
var assert = require('assert')
var title = require('..')

/**
 * Tests.
 */

describe('to-title-case', function () {
  it('shouldnt touch title case', function () {
    assert.equal(title('A Title: Case of String'), 'A Title: Case of String')
  })

  it('should convert space case', function () {
    assert.equal(title('a space case of string'), 'A Space Case of String')
  })

  it('should convert camel case', function () {
    assert.equal(title('aCamelCaseOfString'), 'A Camel Case of String')
  })

  it('should convert snake case', function () {
    assert.equal(title('a_snake_case_of_string'), 'A Snake Case of String')
  })

  it('should convert dot case', function () {
    assert.equal(title('a.dot.case.of.string'), 'A Dot Case of String')
  })

  it('should convert constant case', function () {
    assert.equal(title('A_CONSTANT_CASE_OF_STRING'), 'A Constant Case of String')
  })

  it('should convert "the lord of the flies"', function () {
    assert.equal(title('the lord of the flies'), 'The Lord of the Flies')
  })

  it('should convert "a tale of two cities"', function () {
    assert.equal(title('a tale of two cities'), 'A Tale of Two Cities')
  })

  it('should convert "the lion, the witch and the wardrobe"', function () {
    assert.equal(title('the lion, the witch and the wardrobe'), 'The Lion, the Witch and the Wardrobe')
  })

  it('should convert "she: a history of adventure"', function () {
    assert.equal(title('she: a history of adventure'), 'She: A History of Adventure')
  })
})
