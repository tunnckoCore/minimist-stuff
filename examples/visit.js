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
  // .on('*', function (key, val) {
  //   console.log('*', key, val)
  // })
  .on('help', function () {
    console.log('usage help')
  })
cli
  .use(lib.visit)

// node examples/visit.js
// node examples/visit.js --set=a:123
// node examples/visit.js --get=a
cli(process.argv.slice(2), {help: true})

console.log(app.cache)
