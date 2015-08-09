/* jshint asi:true */

'use strict'

var utils = require('./utils')
var extend = require('merge-deep')
var forward = require('forward-object')
var isObject = require('is-plain-object')

module.exports = minimistPlugins

/**
 * minimistPlugins
 *
 * @param  {Function} `<minimist>` minimist function
 * @param  {Object} `[opts]`
 * @return {Function} minimist proxy
 */

function minimistPlugins (minimist, opts) {
  // every plugins is `minimist` proxy function
  if (typeof minimist !== 'function') {
    throw new TypeError('expect `minimist` to be function')
  }
  // already `minimist-plugins`
  if (utils.asPlugin(minimist)) {
    return minimist
  }
  opts = isObject(opts) ? opts : {}

  function mist (args, options) {
    options = isObject(options) ? options : {}
    mist.options = extend({}, opts, options)
    mist.argv = minimist.call(minimist, args, mist.options)

    if (Array.isArray(mist.plugins) && mist.plugins.length > 0) {
      mist.plugins.forEach(function (plugin, i) {
        mist.pluginIndex = i
        plugin.call(mist, mist, mist.options)
      })
    }

    return mist
  }
  mist.plugins = mist.plugins || []
  mist.use = function (fn) {
    mist.plugins.push(fn)
    return mist
  }

  return forward(mist, minimist)
}
