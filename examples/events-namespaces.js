/* jshint asi:true */

'use strict'

var App = require('./app').App
var one = new App()
var two = new App()

var toEmitter = require('to-emitter')
var utils = require('../lib/utils')

var lib = require('../index')
var minimist = require('minimist')

var cli = lib.events(lib.expand(minimist), {toBoolean: true})

cli
  .on('help', function usage (self, opts) {
    console.log('usage help')
  })
  .on('h', function (val) {
    this.emit('help', this, this.options)
  })

cli = cli
  .on('one.set', console.log.bind(console, '[one.set]'))
  .on('two.set', console.log.bind(console, '[two.set]'))
  .on('one', namespace('one', one))
  .on('two', namespace('two', two))

// node examples/events-namespaces.js --one.set=foo:bar --one.set=baz:qux
// node examples/events-namespaces.js --two.set=a:b --one.set=foo:bar
cli(process.argv.slice(2), {help: true})

console.log('app one cache:', one.cache)
console.log('app two cache:', two.cache)

function namespace (name, app) {
  return function (obj) {
    var self = this
    app = toEmitter(self, app)
    Object.keys(obj).forEach(function (method) {
      self.emit(name + '.' + method, obj[method])
    })
    utils.visitArgs(obj, self.options, app)
  }
}
