/* jshint asi:true */

'use strict'

var lib = require('../index')
var assert = require('assert')
var minimist = require('minimist')

var expand = lib.expand(minimist)
var cli = lib.plugins(expand)

// run:
// node examples/expand-plugin.js --set=foo:bar
cli(process.argv.slice(2))

console.log('options', cli.options)
console.log('argv', cli.argv)
