/* jshint asi:true */

'use strict'

var utils = require('./utils')
var extend = require('merge-deep')
var forward = require('forward-object')
var isObject = require('is-plain-object')
var Emitter = require('component-emitter')

module.exports = minimistEvents

/**
 * minimistEvents
 *
 * @param  {Function} `<minimist>` minimist function
 * @param  {Object} `[opts]`
 * @return {Function} minimist proxy
 */

function minimistEvents (minimist, opts) {
  // every plugins is `minimist` proxy function
  if (typeof minimist !== 'function') {
    throw new TypeError('expect `minimist` to be function')
  }
  // already `minimist-events`
  if (utils.isEmitter(minimist)) {
    return minimist
  }
  // it can't be used as plugin for `minimist-plugins`
  if (utils.asPlugin(minimist)) {
    throw new Error('it cant be used as plugin')
  }
  opts = isObject(opts) ? opts : {}

  var mist = Emitter(function mist_ (args, options) {
    mist = utils.normalizeOptions(mist, opts, options)
    mist = utils.normalize(mist, minimist, args)

    var keys = Object.keys(mist.argv)
    if (mist.options.help && !mist.argv._.length && keys.length === 1) {
      mist.emit.call(mist, 'help', mist, mist.options)
      return mist
    }
    keys.forEach(function (key) {
      var val = mist.argv[key]
      mist.emit.call(mist, key, val)
      mist.emit.call(mist, '*', key, val)

      if (key === '_') {
        val.forEach(function (k, i) {
          mist.emit.call(mist, i, k, val)
          mist.emit.call(mist, k, i, val)
        })
      }
    })

    mist.emit.call(mist, 'end', mist, mist.options)
    return mist
  })

  return forward(mist, minimist)
}
