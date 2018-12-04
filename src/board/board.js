const five = require("johnny-five");
const DataModel = require('./board-data.model');
const PID = require('node-pid-controller');
let _io;

const buzzer = require('./buzzer');
const current = require('./current');

const hltTemp = require('./hlt-temp');
const hltResistence = require('./hlt-resistance');

const mltTemp = require('./mlt-temp');
const mltResistence = require('./mlt-resistance');

const bkTemp = require('./bk-temp');
const bkResistence = require('./bk-resistance');

const recirculationRelay = require('./recirculation-relay');
const auxRelay = require('./aux-relay');

const board = new five.Board({ repl: false });

const _pidHlt = new PID({ k_p: 0.25, k_i: 0.01, k_d: 0, dt: 1 });
const _pidMlt = new PID({ k_p: 0.25, k_i: 0.01, k_d: 0.01, dt: 1 });

let _data = DataModel;

board.on("ready", boardReady);
board.on("fail", boardFail);

function boardReady() {

    buzzer.initialize(board);
    current.initialize(board, _io);

    hltTemp.initialize(_io);
    hltResistence.initialize(board);

    mltTemp.initialize(_io);
    mltResistence.initialize(board);

    bkTemp.initialize(_io);
    bkResistence.initialize(board);

    recirculationRelay.initialize();
    auxRelay.initialize();

    board.loop(1000, boardLoop);

    _io.on('connection', ioConnection);

    console.log("Board ready...");
}

function boardFail(e) {
    _isReady = false;
}

function boardLoop() {
    hltTempControl();
    mltTempControl();
    bkTempControl();
    recirculacaoControl();
}

function hltTempControl() {

    let correcao = 0;

    _pidHlt.setTarget(_data.hlt.setPoint);

    if (_data.hlt.resistencia) {
        correcao = _pidHlt.update(hltTemp.temp());
        correcao = correcao < 0 ? 0 : correcao > 255 ? 255 : correcao;
    }

    hltResistence.power(correcao);
}

function mltTempControl() {

    let correcao = 0;

    _pidMlt.setTarget(_data.mlt.setPoint);

    if (_data.mlt.resistencia) {
        correcao = _pidMlt.update(mltTemp.temp());
        correcao = correcao < 0 ? 0 : correcao > 255 ? 255 : correcao;
        recirculationRelay.open();
    } else {
        recirculationRelay.close();
    }

    mltResistence.power(correcao);
}

function bkTempControl() {
    if (_data.bk.resistencia) {
        bkResistence.power(_data.bk.potencia);
    } else {
        bkResistence.power(0);
    }
}

function recirculacaoControl() {
    if (_data.mlt.recirculacao) {
        recirculationRelay.open();
    } else if (!_data.mlt.resistencia) {
        recirculationRelay.close();
    }
}

function ioConnection(socket) {
    socket.on('hltSetPoint', function (val) { _data.hlt.setPoint = val; });
    socket.on('hltResistencia', function (val) { _data.hlt.resistencia = val; });

    socket.on('mltSetPoint', function (val) { _data.mlt.setPoint = val; });
    socket.on('mltResistencia', function (val) { _data.mlt.resistencia = val; });
    socket.on('mltrecirculacao', function (val) { _data.mlt.recirculacao = val; });

    socket.on('bkPotencia', function (val) { _data.bk.potencia = val; });
    socket.on('bkResistencia', function (val) { _data.bk.resistencia = val; });

    socket.on('buzzer', function (val) {
        if (val) {
            buzzer.play();
        } else {
            buzzer.stop();
        }
    });
}

module.exports = function (io) {
    _io = io;
};