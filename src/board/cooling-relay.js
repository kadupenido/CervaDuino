const five = require("johnny-five");
const ports = require('./ports');

let _coolingRelay = {};

function initialize() {
    _coolingRelay = new five.Relay(ports.coolingRelay);
    _coolingRelay.close();

    console.log('Cooling Relay ready...');
}

function open() {
    _coolingRelay.open();
}

function close() {
    _coolingRelay.close();
}

module.exports = {
    initialize: initialize,
    open: open,
    close: close
}