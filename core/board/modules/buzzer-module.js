module.exports = function () {

    var five = require("johnny-five");

    var _buzzer = {}
    var _playingBuzzer = false;

    function init(ports, event) {
        _buzzer = new five.Pin(ports);

        console.log('Buzzer ready...');
    }

    function buzzer(on = false) {
        if (_playingBuzzer) {
            if (on) {
                _buzzer.low();
                board.wait(300, () => buzzer(!on));
            } else {
                _buzzer.high();
                board.wait(300, () => buzzer(!on));
            }
        } else {
            _buzzer.low();
        }
    }

    function play() {
        _playingBuzzer = true;
        buzzer();
    }

    function stop() {
        _playingBuzzer = false;
    }

    return {
        init: init,
        play: play,
        stop: stop
    }
}