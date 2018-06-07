const five = require("johnny-five");
const board = new five.Board({ repl: false });

let _isReady = false;

board.on("ready", boardReady);
board.on("fail", (e) => _isReady = false);
board.on("close", () => _isReady = false);

function boardReady() {
    _isReady = true;
}

function isReady() {
    return _isReady;
}

module.exports = {
    isReady: isReady
};
