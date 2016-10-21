
var assert = require('assert')
var minors = require('..')

describe('title-case-minors', function () {
  it('should be an array of strings', function () {
    assert(minors instanceof Array)
    minors.forEach(function (minor) {
      assert(typeof minor == 'string')
    })
  })
})
