/* jshint asi:true */

'use strict'

var lib = require('../index')
var minimist = require('minimist')

var events = lib.events(minimist, {aaa: 'bbb'})
var cli = lib.plugins(events, {
  alias: {
    s: 'set'
  },
  foo: 'bar',
  help: true
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
    this.customHelp = true
    if (this.argv.h) {
      this.emit('help', self, opts)
    }
  })
  .use(function pluginIndex (self, opts) {
    console.log('plugin position:', this.pluginIndex)
  })

// shows `usage help`
// node examples/plugins-events.js
// node examples/plugins-events.js -h
// node examples/plugins-events.js --help
cli(process.argv.slice(2), {
  alias: {
    g: 'global'
  },
  qux: 'charlike'
})

// console.log(cli)
