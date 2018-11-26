const five = require("johnny-five");
const ports = require('./ports');

function initialize(boardI) {
    board = boardI;

    board.pinMode(ports.hltResistance, five.Pin.PWM);
    board.analogWrite(ports.hltResistance, 0);

    console.log('HLT Resistance ready...');
}

function setPower(power) {
    board.analogWrite(ports.hltResistance, power);
}

module.exports = {
    initialize: initialize,
    power: setPower
}