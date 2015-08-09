/* jshint asi:true */

'use strict'

var lib = require('../index')
var assert = require('assert')
var minimist = require('minimist')

var events = lib.events(minimist, {aaa: 'bbb'})
var cli = lib.plugins(events, {
  alias: {
    s: 'set'
  },
  foo: 'bar'
})

cli
  .on('help', function (self, opts) {
    console.log('usage help')
  })
  .on('*', function (key, val) {
    console.log('*', key, val)
  })

cli
  .use(function customHelp (self, opts) {
    if (this.argv.h) {
      this.emit('help', self, opts)
    }
  })
  .use(function showArgv (self, opts) {
    console.log('this.argv:', self.argv)
  })

cli(process.argv.slice(2), {
  alias: {
    g: 'global'
  }
  qux: 'charlike'
})

console.log(cli)
