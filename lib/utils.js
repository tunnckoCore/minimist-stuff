/* jshint asi:true */

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
