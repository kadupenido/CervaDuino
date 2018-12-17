/*
 * Event
 *
 * @module Event
 */

var EventEmitter = require('events').EventEmitter;
var coreEmitter = new EventEmitter();

exports.hlt = {};
exports.hlt.temperature = {};
exports.hlt.resistence = {};

exports.bk = {};
exports.bk.temperature = {}
exports.bk.resistence = {}
exports.bk.resistence.state = {}
exports.bk.resistence.power = {}

exports.hlt.temperature.changed = function (temperature) {
    coreEmitter.emit('hlt-temp:changed', temperature);
}

exports.hlt.resistence.changed = function (state) {
    coreEmitter.emit('hlt-resistence:changed', state);
}

exports.emitter = coreEmitter;
