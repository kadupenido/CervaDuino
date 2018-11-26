const five = require("johnny-five");
const ports = require('./ports');

let _circuitTemp = {};
let _temp = 0;

function initialize() {

    _circuitTemp = new five.Thermometer({
        controller: ports.circuitTemp.controller,
        pin: ports.circuitTemp.pin
    });

    _circuitTemp.on("change", function () {
        _temp = this.celsius
    });

    console.log('Circuit temperature ready...');
}

function getTemp() {
    return _temp;
}

module.exports = {
    initialize: initialize,
    temp: getTemp
}