module.exports = function () {

    var five = require("johnny-five");

    var _ports;
    var _event;

    var relay;

    function init(ports, event, type) {
        _ports = ports;
        _event = event;

        relay = new five.Relay(_ports.coolingRelay);
        relay.close();

        console.log(`${type} relay ready...`);
    }

    function change(state) {
        if (state) {
            coolingRelay.open();
        } else {
            coolingRelay.close();
        }
        _event.changed(state);
    }

    return {
        init: init,
        change: change
    }
}