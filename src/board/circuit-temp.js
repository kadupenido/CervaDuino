const five = require("johnny-five");
const ports = require('./ports');
const io = require('../socket-io')();

let _circuitTemp = {};

function initialize() {

    _circuitTemp = new five.Thermometer({
        controller: ports.circuitTemp.controller,
        pin: ports.circuitTemp.pin
    });

    _circuitTemp.on("change", function () {
        if (io) {
            io.emit('circuitTemp', Math.round(this.celsius * 10) / 10);
        }
    });

    console.log('Circuit temperature ready...');
}

module.exports = initialize;