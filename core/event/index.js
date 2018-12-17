/*
 * Event index
 *
 */

var Event = require('./Event');

exports.hlt = {};
exports.hlt.temperature = {};
exports.hlt.temperature.changed = Event.hlt.temperature.changed;

exports.emitter = Event.emitter;
