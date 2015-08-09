/* jshint asi:true */

'use strict'

var visit = require('collection-visit')

/**
 * Example application, used in the other examples
 */

function App (cache) {
  this.cache = cache || {}
}

App.prototype.set = function set (key, value) {
  if (typeof key === 'object') {
    return this.visit('set', key)
  }
  this.cache[key] = value
  return this
}

App.prototype.get = function get (key) {
  return this.cache[key]
}

App.prototype.del = function del (key) {
  if (Array.isArray(key)) {
    return this.visit('del', key)
  }
  delete this.cache[key]
  return key
}

App.prototype.has = function has (key) {
  return this.cache.hasOwnProperty(key)
}

App.prototype.visit = function visit(method, val) {
  visit(this, method, val)
  return this
}

/**
 * Expose an instance of `App`
 */

module.exports = new App()

/**
 * Expose the `App` constructor
 */

module.exports.App = App
