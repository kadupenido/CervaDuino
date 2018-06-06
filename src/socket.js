// const board = require('./board');

function init(server) {
    this.io = require('socket.io').listen(server);
    this.io.on('connection', clientConnected);
}

function emit(data) {
    if (!this.io) return;

    this.io.emit('data', data);
}

function clientConnected(skt) {
    console.log('Client connected...');
    skt.on('disconnect', clientDisconnected)
}

function clientDisconnected() {
    console.log('Client disconnected...');
}

module.exports = {
    init: init,
    emit: emit
};