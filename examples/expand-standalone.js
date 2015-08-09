/* jshint asi:true */

'use strict'

var lib = require('../index')
var assert = require('assert')
var minimist = require('minimist')

var cli = lib.expand(minimist, {
  alias: {
    s: 'set'
  }
})

// run:
// node examples/expand-standalone.js --set=a:b
// node examples/expand-standalone.js -s=foo:bar
// node examples/expand-standalone.js --get=c:d
cli(process.argv.slice(2), {
  alias: {
    g: 'get'
  }
})

console.log('options', cli.options)
console.log('argv', cli.argv)
