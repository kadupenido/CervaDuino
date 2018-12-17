var five = require("johnny-five");
var ports = require('../ports');
var coreEvent = require('../../event');

var coolingRelay = {};

exports.init = function () {
    coolingRelay = new five.Relay(ports.bk.coolingRelay);
    coolingRelay.close();

    console.log('Cooling relay ready...');
}

exports.change = function (state) {
    if (state) {
        coolingRelay.open();
    } else {
        coolingRelay.close();
    }
    coreEvent.bk.
}