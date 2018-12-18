var EventEmitter = require('events').EventEmitter;
var coreEmitter = new EventEmitter();

exports.hlt = {};
exports.hlt.temperature = {};
exports.hlt.resistence = {};

exports.mlt = {};
exports.mlt.temperature = {}
exports.mlt.resistence = {}
exports.mlt.recirculation = {}

exports.bk = {};
exports.bk.temperature = {}
exports.bk.resistence = {}
exports.bk.cooling = {}

exports.hlt.temperature.changed = function (temperature) {
    coreEmitter.emit('hlt-temp:changed', temperature);
}

exports.hlt.resistence.changed = function (power) {
    coreEmitter.emit('hlt-resistence:changed', power);
}

exports.mlt.temperature.changed = function (temperature) {
    coreEmitter.emit('mlt-temp:changed', temperature);
}

exports.mlt.resistence.changed = function (power) {
    coreEmitter.emit('mlt-resistence:changed', power);
}

exports.mlt.recirculation.changed = function (state) {
    coreEmitter.emit('mlt-recirculation:changed', state);
}

exports.bk.temperature.changed = function (temperature) {
    coreEmitter.emit('bk-temp:changed', temperature);
}

exports.bk.resistence.changed = function (power) {
    coreEmitter.emit('bk-resistence:changed', power);
}

exports.bk.cooling.changed = function (state) {
    coreEmitter.emit('bk-cooling:changed', state);
}

exports.emitter = coreEmitter;
