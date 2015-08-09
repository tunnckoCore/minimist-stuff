/* jshint asi:true */

'use strict'

var App = require('./app').App
var app = new App()
var minimist = require('minimist')

var lib = require('../index')
var cli = lib.visit(minimist, {foo: 'bar'}, app)

cli
  .on('set', console.log.bind(console, '[set]'))
  .on('get', console.log.bind(console, '[get]'))

// node example.js --set=foo:bar // shows set
// node example.js // shows help
cli(process.argv.slice(2), {toBoolean: true})

console.log(cli) // dont have `options` and `argv`
console.log('====')
console.log(cli.argv) //@todo: now is undefined, bug
console.log('====')
console.log(app.cache)
