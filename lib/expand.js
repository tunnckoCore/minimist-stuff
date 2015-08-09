/* jshint asi:true */

'use strict'

var utils = require('./utils')
var forward = require('forward-object')
var isObject = require('is-plain-object')
var expandArgs = require('expand-args')

module.exports = minimistExpand

/**
 * minimistExpand
 *
 * @param  {Function} `<minimist>` minimist function
 * @param  {Object} `[opts]`
 * @return {Function} minimist proxy
 */

function minimistExpand (minimist, opts) {
  // every plugin is `minimist` proxy function
  if (typeof minimist !== 'function') {
    throw new TypeError('expect `minimist` to be function')
  }
  // already `minimist-expand`
  if (minimist.expandArgs) {
    return minimist
  }
  opts = isObject(opts) ? opts : {}

  // it is plugin, so we just get already parsed `argv`
  if (utils.asPlugin(minimist)) {
    minimist.argv = expandArgs(minimist.argv)
    return minimist
  }

  // standalone
  function mist (args, options) {
    mist = utils.normalizeOptions(mist, opts, options) // eslint-disable-line no-func-assign
    mist = utils.normalize(mist, minimist, args) // eslint-disable-line no-func-assign
    mist.argv = expandArgs(mist.argv)
    return mist
  }
  mist.expandArgs = true

  return forward(mist, minimist)
}
