/* jshint asi:true */

'use strict'

var utils = require('./utils')
var forward = require('forward-object')
var Emitter = require('component-emitter')
var toEmitter = require('to-emitter')
var isExtendable = require('is-extendable')
var isPlainObject = require('is-plain-object')

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
  if (arguments.length < 2) {
    throw new Error('expect minimum two arguments')
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

  /**
   * standalone
   */
  if (isExtendable(opts) && arguments.length === 2) {
    app = opts.app || opts
  }
  if (isPlainObject(opts) && !opts.app && arguments.length === 2) {
    throw new Error('expect `app` as second argument or in `opts.app`')
  }

  function Visitor () {
    if (!(this instanceof Visitor)) {
      return new Visitor()
    }
    Emitter.call(this)
  }
  Emitter(Visitor.prototype)
  Visitor.prototype.visitor = function methodsProxy (args, options) {
    var self = this
    self = utils.normalizeOptions(self, opts, options)
    self = utils.normalize(self, minimist, args)
    app = app || self.options.app

    toEmitter(self, app)
    utils.visitArgs(self.argv, self.options, app)
    self.emit('end')
    return self
  }

  var visit = new Visitor()
  return forward(visit.visitor.bind(visit), visit)
}
