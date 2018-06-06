const five = require("johnny-five");
const board = new five.Board();

board.on("ready", boardReady);

function boardReady() { }

function isRead() {
    return board.isReady;
}

module.exports = {
    isRead: isRead
};