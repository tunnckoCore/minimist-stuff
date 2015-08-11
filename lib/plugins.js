/* jshint asi:true */

'use strict'

var utils = require('./utils')
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
  // every plugin is `minimist` proxy function
  if (typeof minimist !== 'function') {
    throw new TypeError('expect `minimist` to be function')
  }
  // already `minimist-plugins`
  if (utils.asPlugin(minimist)) {
    return minimist
  }
  opts = isObject(opts) ? opts : {}

  function mist (args, options) {
    mist = utils.normalizeOptions(mist, opts, options) // eslint-disable-line no-func-assign
    mist = utils.normalize(mist, minimist, args) // eslint-disable-line no-func-assign

    if (Array.isArray(mist.plugins) && mist.plugins.length > 0) {
      var ctx = null
      mist.plugins.forEach(function (plugin, i) {
        mist.pluginIndex = i
        ctx = plugin.call(ctx || mist, ctx || mist, mist.options)
      })
      mist = ctx // eslint-disable-line no-func-assign
    }

    return mist
  }
  mist.plugins = mist.plugins || minimist.plugins || []
  mist.use = function (fn) {
    mist.plugins.push(fn)
    return mist
  }

  return forward(mist, minimist)
}
