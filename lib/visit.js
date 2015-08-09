/* jshint asi:true */

'use strict'

var utils = require('./utils')
var forward = require('forward-object')
var isObject = require('is-plain-object')
var Emitter = require('component-emitter')
var toEmitter = require('to-emitter')
var isExtendable = require('is-extendable')

module.exports = minimistVisit

/**
 * minimistVisit
 *
 * @param  {Function} `<minimist>` minimist function
 * @param  {Object} `[opts]`
 * @return {Function} minimist proxy
 */

function minimistVisit (minimist, opts, app) {
  // every plugins is `minimist` proxy function
  if (typeof minimist !== 'function') {
    throw new TypeError('expect `minimist` to be function')
  }
  if (utils.asPlugin(minimist)) {
    if (!utils.isEmitter(minimist)) {
      throw new Error('expect `minimist` or `this` to be emitter, when used as plugin')
    }
    if (!minimist.options.app && !isExtendable(minimist.options.app)) {
      throw new Error('expect opts.app when used directly as plugin')
    }
    app = minimist.options.app || app
    app = toEmitter(Emitter({}), app)
    minimist = forward(minimist, app)
    utils.visitArgs(minimist.argv, minimist.options, app)
    minimist.emit('end')
    return minimist
  }
}
