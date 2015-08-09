/* jshint asi:true */

'use strict'

var lib = require('../index')
var assert = require('assert')
var minimist = require('minimist')
var expandArgs = require('expand-args')

var cli = lib.plugins(minimist, {
  alias: {
    s: 'set'
  },
  foo: 'bar'
})

cli
  .use(function expandArgs_ (self, opts) {
    // `self` is `minimist` proxy
    // should update `minimist-expand` to work, which is strange
    this.argv = expandArgs(this.argv)
  })
  .use(function changeSomeOptions (self, opts) {
    self.options.foo = opts.foo === 'bar' ? 'welcome' : opts.foo
    this.username = 'tunnckoCore'
  })
  .use(function testChangedOptions (self, opts) {
    assert.equal(opts.foo, 'welcome')
    assert.equal(this.options.foo, 'welcome')
    assert.equal(this.username, 'tunnckoCore')
  })
  .use(function showSelf (self, opts) {
    assert.deepEqual(this, self)
    console.log(self)
  })
  .use(function showOptions (self, opts) {
    assert.deepEqual(this.options, opts)
    assert.deepEqual(this.options, self.options)
    console.log(opts)

    // or optionally we can return `this` or `self`
    // it's no matter, even if we not return anything
    return this
  })

cli(process.argv.slice(2), {
  alias: {
    g: 'global'
  },
  qux: 'charlike'
})
