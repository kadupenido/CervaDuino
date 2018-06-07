const board = require('./board');

function init(server) {
    this.io = require('socket.io').listen(server);
    this.io.on('connection', clientConnected);
}

function clientConnected(skt) {
    skt.on('boardIsReady', () => {
        skt.emit('boardIsReady', board.isReady);
    });
}

function emit(data) {
    if (!this.io) return;

    this.io.emit('data', data);
}

module.exports = {
    init: init,
    emit: emit
};