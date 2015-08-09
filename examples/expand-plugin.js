/* jshint asi:true */

'use strict'

var lib = require('../index')
var minimist = require('minimist')

var cli = lib.plugins(minimist)
  .use(lib.expand)

// run:
// node examples/expand-plugin.js --set=a:b
cli(process.argv.slice(2))

console.log('options', cli.options)
console.log('argv', cli.argv)
