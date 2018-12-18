/**
 * Logger
 *
 * @module Temperature
 **/

module.exports = function () {
    
    var five = require("johnny-five");

    var _ports;
    var _event;


    var thermo;
    var temp = 0;

    function init(ports, event, type) {

        _ports = ports;
        _event = event;

        thermo = new five.Thermometer({
            controller: _ports.temp.controller,
            pin: _ports.temp.pin,
            address: _ports.temp.address
        });

        thermo.on("change", function () {
            temp = this.celsius;
            _event.changed(Math.round(temp * 10) / 10);
        });

        console.log(`${type} temperature ready...`);
    }

    function getTemp() {
        return temp;
    }

    return {
        init: init,
        getTemp: getTemp
    }
}