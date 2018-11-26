const five = require("johnny-five");
const ports = require('./ports');

function initialize(boardI) {
    board = boardI;

    board.pinMode(ports.mltResistance, five.Pin.PWM);
    board.analogWrite(ports.mltResistance, 0);

    console.log('MLT Resistance ready...');
}

function setPower(power) {
    board.analogWrite(ports.mltResistance, power);
}

module.exports = {
    initialize: initialize,
    power: setPower
}