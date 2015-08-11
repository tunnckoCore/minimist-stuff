/* jshint asi:true */

'use strict'

var App = require('./app').App
var one = new App()
var two = new App()

var lib = require('../index')
var minimist = require('minimist')
var cli = lib.namespace(lib.expand(minimist), {
  toBoolean: true,
  namespace: {
    one: one
  }
})

cli
  .on('set', console.log.bind(console, '[set]'))
  .on('one.set', console.log.bind(console, '[one.set]'))
  .on('two.set', console.log.bind(console, '[two.set]'))

// node examples/namespace.js --one.set=foo:bar --one.set=baz:qux
// node examples/namespace.js --two.set=a:b --one.set=foo:bar
// node examples/namespace.js --two.set=a:b --one.set=foo:bar --set=c:d
cli(process.argv.slice(2), {
  namespace: {
    two: two
  }
})

console.log('=====')
console.log('cli.argv', cli.argv)
console.log('one.cache', one.cache)
console.log('two.cache', two.cache)
