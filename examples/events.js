/* jshint asi:true */

'use strict'

var lib = require('../index')
var minimist = require('minimist')

var cli = lib.events(minimist, {a: 'b'})

cli
  .on('help', function usage (self, opts) {
    console.log(self, opts)
    console.log('=========')
    console.log('usage help')
  })
  .on('foo', function (val) {
    console.log('foo:', val)
  })
  .on('h', function (val) {
    this.emit('help', this, this.options)
  })

cli(process.argv.slice(2), {help: true})
