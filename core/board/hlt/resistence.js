var five = require("johnny-five");
var ports = require('./ports');

var board;

exports.init = function (_board) {
    board = _board;

    board.pinMode(ports.hltResistance, five.Pin.PWM);
    board.analogWrite(ports.hltResistance, 0);

    console.log('HLT resistance ready...');
}

exports.setPower = function(power) {
    board.analogWrite(ports.hltResistance, power);
}