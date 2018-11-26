const five = require("johnny-five");
const ports = require('./ports');

let _auxRelay = {};

function initialize() {
    _auxRelay = new five.Relay(ports.auxRelay);
    _auxRelay.close();

    console.log('Auxiliar Relay ready...');
}

module.exports = {
    initialize: initialize,
    open: _auxRelay.open,
    close: _auxRelay.close
}