/* jshint asi:true */

'use strict'

var app = require('./app')
var lib = require('../index')
var minimist = require('minimist')

var cli = lib.events(minimist, {a: 'b', toBoolean: true})

cli
  .on('help', console.log.bind(console, '[help]'))
  .on('set', console.log.bind(console, '[set]'))

cli = lib.expand(cli, {c: 'd', app: app})

cli
  .on('foo', console.log.bind(console, '[foo]'))

cli = lib.plugins(cli, {e: 'f'})
  .use(lib.visit)
  .use(function mroeHelp (self) {
    if (this.argv.h) {
      this.emit('help')
    }
  })

// node examples/passthrough.js --set=foo:bar --set=baz=qux --set=a:b+g.c.d.e:abc
// node examples/passthrough.js --set=a.b.c.d:e --set=a.b.c.e:123 --help --foo
// node examples/passthrough.js --help --set=abc.def:123
// node examples/passthrough.js --foo
// node examples/passthrough.js -h
cli(process.argv.slice(2), {help: true})

console.log(cli)
console.log('=========')
console.log('app.cache', app.cache)
console.log('=========')
console.log('cli.argv', cli.argv)
