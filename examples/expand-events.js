/* jshint asi:true */

'use strict'

var lib = require('../index')
var minimist = require('minimist')

var events = lib.events(minimist)
var expand = lib.expand(events)
var cli = lib.plugins(expand)

// or
// var expand = lib.expand(minimist)
// var events = lib.events(expand)
// var cli = lib.plugins(events)

// or
// var events = lib.events(minimist)
// var cli = lib.plugins(events).use(lib.expand)


cli.on('help', function usage (self, opts) {
  console.log('usage help')
})

// run:
// node examples/expand-plugin.js --set=foo:bar
// node examples/expand-plugin.js --help
cli(process.argv.slice(2))

console.log('options', cli.options)
console.log('argv', cli.argv)
