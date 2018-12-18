module.exports = function () {

    var five = require("johnny-five");

    var _board;
    var _ports;
    var _event;


    const numberOfSamples = 50;
    let i = 0;
    let offsetI = 512;
    let sumI = 0;
    let filteredI = 0;

    let _current = 0;
    let _power = 0;
    let _consumption = 0;

    function init(board, ports, event) {

        _board = board;
        _ports = ports;
        _event = event;

        _board.pinMode(_ports.pin, five.Pin.INPUT);
        _board.analogRead(_ports.pin, function (voltage) { readCurrent(voltage) });

        _board.loop(1000, function () {
            _consumption += (_power / 3600) / 1000;
            _event.changed(getData());
        });

        console.log('Current ready...');
    }

    function getData() {
        return {
            consumption: Math.round(_consumption * 100) / 100,
            current: Math.round(_current * 100) / 100,
            power: Math.round(_power),
        }
    }

    function readCurrent(voltage) {

        if (i < numberOfSamples) {

            offsetI = (offsetI + (voltage - offsetI) / 1024);
            filteredI = voltage - offsetI;
            sumI += filteredI * filteredI;
            i++;

        } else {

            let iRatio = 16.67 * ((4541 / 1000.0) / (1024));
            _current = iRatio * Math.sqrt(sumI / numberOfSamples);
            _power = _current * ports.current.voltage;

            sumI = 0;
            i = 0;
        }
    }
    
    return {
        init: init,
        getData: getData
    }
}