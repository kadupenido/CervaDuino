/*
 * Socket
 *
 * @module Socket
 */

var io;

var last = {
    HLT: {
        temp: 0
    }
}

var EVENT = {
    HLT: {
        TEMP: 'hlt_temperature_changed',
        SETPOINT: 'hlt_setpoint'
    },
    MLT: {

    },
    BK: {

    }
}

/*
 * Initialize
 *
 * @method init
 * @param {Object} _io - SocketIO instance
 */
exports.init = function (_io) {
    io = _io;

    io.on('connect', function () {
        console.log('Cliente conectado...');
        exports.emit(EVENT.HLT.TEMP, temp);
    });
}

/*
 * Emit
 *
 * @method emit
 * @param {String} key
 * @param {Object} data
 */
exports.emit = function (key, data) {
    if (io) {
        console.error('O socket.io não foi inicializado.');
        return;
    }

    io.emit(key, data);
}

/*
 * Set emitter
 *
 * @method setEmitter
 * @param {EventEmitter} emitter
 */
exports.setEmitter = function (emitter) {

    emitter.on('hlt-temp:changed', function (temp) {
        last.HLT.temp = temp;
        exports.emit(EVENT.HLT.TEMP, temp);
    });

}