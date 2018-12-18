var io;

var last = {
    hlt: {
        temp: 0,
        setpoint: 0,
        resistence: 0
    },
    mlt: {
        temp: 0,
        setpoint: 0,
        resistence: 0,
        recirculation: false
    },
    bk: {
        temp: 0,
        resistence: 0,
        cooling: false
    }
}

var EVENT = {
    HLT: {
        TEMP: 'hlt_temperature',
        SETPOINT: 'hlt_setpoint',
        RESISTENCE: 'hlt_resistence'
    },
    MLT: {
        TEMP: 'mlt_temperature',
        SETPOINT: 'mlt_setpoint',
        RESISTENCE: 'mlt_resistence',
        RECIRCULATION: 'mlt_recirculation'
    },
    BK: {
        TEMP: 'bk_temperature',
        RESISTENCE: 'bk_resistence',
        COOLING: 'bk_cooling'
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
        exports.emit(EVENT.HLT.TEMP, last.HLT.temp);
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
exports.setCoreEmitter = function (emitter) {

    emitter.on('hlt-temp:changed', function (temp) {
        last.hlt.temp = temp;
        exports.emit(EVENT.HLT.TEMP, temp);
    });

    emitter.on('hlt-resistence:changed', function (power) {
        last.hlt.resistence = power;
        exports.emit(EVENT.HLT.RESISTENCE, power > 0);
    });

    emitter.on('mlt-temp:changed', function (temp) {
        last.mlt.temp = temp;
        exports.emit(EVENT.MLT.TEMP, temp);
    });

    emitter.on('mlt-resistence:changed', function (power) {
        last.mlt.resistence = power;
        exports.emit(EVENT.MLT.RESISTENCE, power > 0);
    });

    emitter.on('mlt-recirculation:changed', function (state) {
        last.mlt.recirculation = state;
        exports.emit(EVENT.MLT.recirculation, state);
    });

    emitter.on('bk-temp:changed', function (temp) {
        last.bk.temp = temp;
        exports.emit(EVENT.BK.TEMP, temp);
    });

    emitter.on('bk-resistence:changed', function (power) {
        last.bk.resistence = power;
        exports.emit(EVENT.BK.RESISTENCE, power);
    });

    emitter.on('bk-cooling:changed', function (state) {
        last.bk.cooling = state;
        exports.emit(EVENT.BK.COOLING, state);
    });
}