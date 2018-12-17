const five = require("johnny-five");
const ports = require('./ports');

let _recirculationRelay = {};

function initialize() {
    _recirculationRelay = new five.Relay(ports.recirculationRelay);
    _recirculationRelay.close();

    console.log('Recirculation Relay ready...');
}

function open() {
    _recirculationRelay.open();
}

function close() {
    _recirculationRelay.close();
}

module.exports = {
    initialize: initialize,
    open: open,
    close: close
}