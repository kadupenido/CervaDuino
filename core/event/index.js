/*
 * Event index
 *
 */

var Event = require('./Event');

exports.hlt = {};
exports.hlt.temperature = {};
exports.hlt.temperature.changed = Event.hlt.temperature.changed;
exports.hlt.resistence = {};
exports.hlt.resistence.changed = Event.hlt.resistence.changed;

exports.mlt = {};
exports.mlt.temperature = {};
exports.mlt.temperature.changed = Event.mlt.temperature.changed;
exports.mlt.resistence = {};
exports.mlt.resistence.changed = Event.mlt.resistence.changed;
exports.mlt.recirculation = {};
exports.mlt.recirculation.changed = Event.mlt.recirculation.changed;

exports.bk = {};
exports.bk.temperature = {};
exports.bk.temperature.changed = Event.bk.temperature.changed;
exports.bk.resistence = {};
exports.bk.resistence.changed = Event.bk.resistence.changed;
exports.bk.cooling = {};
exports.bk.cooling.changed = Event.bk.cooling.changed;

exports.emitter = Event.emitter;
