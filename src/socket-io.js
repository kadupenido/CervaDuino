const socketIo = require('socket.io');

let _io;

module.exports = function (server) {
    if (server) {
        _io = socketIo(server);
        _io.on('connection', function (socket) {
            console.log('Client connected...');
        });
    }
    return _io;
};