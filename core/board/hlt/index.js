var temperature = require('./temperature');
var resistence = require('./resistence');

exports.hlt = {};

exports.hlt.temperature = {};
exports.hlt.temperature.init = temperature.init;
exports.hlt.temperature.getTemp = temperature.getTemp;

exports.hlt.resistence = {};
exports.hlt.resistence.init = resistence.init;
exports.hlt.resistence.setPower = resistence.setPower;