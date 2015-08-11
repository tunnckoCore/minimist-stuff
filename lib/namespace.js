/* jshint asi:true */

'use strict'

var utils = require('./utils')
var forward = require('forward-object')
var isObject = require('is-plain-object')
var toEmitter = require('to-emitter')

module.exports = minimistNamespace

/**
 * minimistNamespace
 *
 * @param  {Function} `<minimist>` minimist function
 * @param  {Object} `[opts]`
 * @return {Function} minimist proxy
 */

function minimistNamespace (minimist, opts) {
  // every plugins is `minimist` proxy function
  if (typeof minimist !== 'function') {
    throw new TypeError('expect `minimist` to be function')
  }
  // we need emitter `minimist-events`
  if (!utils.isEmitter(minimist)) {
    throw new Error('expect `minimist` to be emitter')
  }
  opts = isObject(opts) ? opts : {}

  function mist (args, options) {
    mist = utils.normalizeOptions(mist, opts, options) // eslint-disable-line no-func-assign
    mist = utils.normalize(mist, minimist, args) // eslint-disable-line no-func-assign

    if (!utils.hasOwn(mist.options, 'namespace') && !isObject(mist.options)) {
      throw new Error('expect `opts.namespace` to be object')
    }

    var namespaces = Object.keys(mist.options.namespace)
    var len = namespaces.length
    var i = 0

    while (i < len) {
      var ns = namespaces[i++]
      if (mist.argv[ns]) {
        var obj = mist.argv[ns]
        var app = mist.options.namespace[ns]
        app = toEmitter(mist, app)
        Object.keys(obj).forEach(function (method) {
          mist.emit(ns + '.' + method, obj[method])
        })
        utils.visitArgs(obj, mist.options, app)
      }
    }

    return mist
  }
  return forward(mist, minimist)
}
