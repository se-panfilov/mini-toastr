
var space = require('to-space-case')

/**
 * Export.
 */

module.exports = toDotCase

/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 */

function toDotCase(string) {
  return space(string).replace(/\s/g, '.')
}
