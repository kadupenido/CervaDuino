const five = require("johnny-five");
const ports = require('./ports');
let _io;

let _mltTemp = {};
let _temp = 0;

function initialize(io) {

    _io = io;

    _mltTemp = new five.Thermometer({
        controller: ports.mltTemp.controller,
        pin: ports.mltTemp.pin,
        address: ports.mltTemp.address
    });

    _mltTemp.on("change", function () {
        _temp = this.celsius;
        _io.emit('mltTemp', Math.round(_temp * 10) / 10);
    });

    console.log('MLT temperature ready...');
}

function getTemp() {
    return _temp;
}

module.exports = {
    initialize: initialize,
    temp: getTemp
}