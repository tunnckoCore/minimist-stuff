/* jshint asi:true */

'use strict'

var App = require('./app').App
var app = new App()
var minimist = require('minimist')

var lib = require('../index')
var expand = lib.expand(minimist)
var events = lib.events(expand)
var cli = lib.plugins(events, {foo: 'bar', app: app})

cli
  .on('set', console.log.bind(console, '[set]'))
  .on('get', console.log.bind(console, '[get]'))
  .on('help', function () {
    console.log('usage help')
  })

cli
  .use(lib.visit)

// node examples/visit.js
// node examples/visit.js --set=a:123
// node examples/visit.js --get=a
// node examples/visit.js --set=foo:bar --set=a:123 --set=qux
cli(process.argv.slice(2), {help: true, toBoolean: true})

// it is able after `cli()`
console.log(app.cache)
//=> { foo: 'bar', a: 123, qux: true }
