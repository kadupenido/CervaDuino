const five = require("johnny-five");
const ports = require('./ports');

let _bkTemp = {};
let _temp = 0;

function initialize() {

    _bkTemp = new five.Thermometer({
        controller: ports.bkTemp.controller,
        pin: ports.bkTemp.pin,
        address: ports.bkTemp.address
    });

    _bkTemp.on("change", function () {
        _temp = this.celsius
    });

    console.log('BK temperature ready...');
}

function getTemp() {
    return _temp;
}

module.exports = {
    initialize: initialize,
    temp: getTemp
}