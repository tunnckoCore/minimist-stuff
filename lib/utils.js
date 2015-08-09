/*!
 * minimist-stuff <https://github.com/tunnckoCore/minimist-stuff>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

exports.asPlugin = function asPlugin (mist) {
  return typeof mist === 'function' &&
    typeof mist.use === 'function' &&
    Array.isArray(mist.proxs)
}

exports.isEmitter = function isEmitter (mist) {
  return typeof mist.on === 'function' &&
    typeof mist.off === 'function' &&
    typeof mist.emit === 'function'
}
