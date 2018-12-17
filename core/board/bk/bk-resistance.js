const five = require("johnny-five");
const ports = require('./ports');

function initialize(boardI) {
    board = boardI;

    board.pinMode(ports.bkResistance, five.Pin.PWM);
    board.analogWrite(ports.bkResistance, 0);

    console.log('BK resistance ready...');
}

function setPower(power) {
    board.analogWrite(ports.bkResistance, power);
}

module.exports = {
    initialize: initialize,
    power: setPower
}