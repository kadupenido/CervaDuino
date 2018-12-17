var five = require("johnny-five");
var ports = require('../ports');
var coreEvent = require('../../event');

var hltTemp = {};
var temp = 0;

exports.init = function () {

    hltTemp = new five.Thermometer({
        controller: ports.hlt.temp.controller,
        pin: ports.hlt.temp.pin,
        address: ports.hlt.temp.address
    });

    hltTemp.on("change", function () {
        temp = this.celsius;
        coreEvent.hlt.temperature.changed(Math.round(temp * 10) / 10);
        // console.log("0x" + this.address.toString(16));
    });

    console.log('HLT temperature ready...');
}

exports.getTemp = function () {
    return temp;
}