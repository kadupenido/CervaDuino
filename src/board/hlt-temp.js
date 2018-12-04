const five = require("johnny-five");
const ports = require('./ports');
let _io;

let _hltTemp = {};
let _temp = 0;

function initialize(io) {

    _io = io;

    _hltTemp = new five.Thermometer({
        controller: ports.hltTemp.controller,
        pin: ports.hltTemp.pin,
        address: ports.hltTemp.address
    });

    _hltTemp.on("change", function () {
        _temp = this.celsius;
        _io.emit('hltTemp', Math.round(_temp * 10) / 10);
        // console.log("0x" + this.address.toString(16));
    });

    console.log('HLT temperature ready...');
}

function getTemp() {
    return _temp;
}

module.exports = {
    initialize: initialize,
    temp: getTemp
}