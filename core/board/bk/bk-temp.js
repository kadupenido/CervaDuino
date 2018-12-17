const five = require("johnny-five");
const ports = require('./ports');
let _io;

let _bkTemp = {};

function initialize(io) {

    _io = io;

    _bkTemp = new five.Thermometer({
        controller: ports.bkTemp.controller,
        pin: ports.bkTemp.pin,
        address: ports.bkTemp.address
    });

    _bkTemp.on("change", function () {
        _io.emit('bkTemp', Math.round(this.celsius * 10) / 10);
    });

    console.log('BK temperature ready...');
}

module.exports = {
    initialize: initialize
};