const app = require('../src/app');
const http = require('http');
const debug = require('debug')('cervaduino');
// const socket = require('./socket');

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => onError(err, port));
server.on('listening', () => onListening(server));

// socket.init(server);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            debug(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            debug(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(server) {
    var addr = server.address();
    var bind = typeof addr === 'string' ? addr : addr.port;
    debug('Server running at http://127.0.0.1:' + bind + '/');
}