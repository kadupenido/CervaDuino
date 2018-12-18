module.exports = function () {

    var five = require("johnny-five");

    var _board;
    var _ports;
    var _event;

    function init(board, ports, event, type) {
        _board = board;
        _ports = ports;
        _event = event;

        _board.pinMode(_ports.resistance, five.Pin.PWM);
        _board.analogWrite(_ports.resistance, 0);

        console.log(`${type} resistance ready...`);
    }

    function setPower(power) {
        _board.analogWrite(_ports.resistance, power);
        _event.changed(power);
    }

    return {
        init: init,
        setPower: setPower
    }
}