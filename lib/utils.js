/* jshint asi:true */

'use strict'

var extend = require('merge-deep')
var isObject = require('is-plain-object')
var visitCollection = require('collection-visit')

exports.asPlugin = function asPlugin (mist) {
  return typeof mist === 'function' &&
    typeof mist.use === 'function' &&
    Array.isArray(mist.plugins)
}

exports.isEmitter = function isEmitter (mist) {
  return typeof mist.on === 'function' &&
    typeof mist.off === 'function' &&
    typeof mist.emit === 'function'
}

exports.normalizeOptions = function normalizeOptions (mist, opts, options) {
  options = isObject(options) ? options : {}
  mist.options = extend({}, opts, options)
  return mist
}

exports.normalize = function normalize (mist, minimist, args) {
  mist.argv = minimist.call(minimist, args, mist.options)

  if (typeof mist.argv === 'function' && mist.argv.argv) {
    mist.options = extend({}, mist.options, mist.argv.options)
    mist.argv = mist.argv.argv
  }
  return mist
}

exports.visitArgs = function visitArgs (argv, opts, app) {
  for (var key in argv) {
    if (argv.hasOwnProperty(key) && (key in app)) {
      var val = argv[key]

      if (typeof val === 'object') {
        visitCollection(app, key, val)
      } else {
        opts.toBoolean ? app[key](val, true) : app[key](val)
      }
    }
  }
}
