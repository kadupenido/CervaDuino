const five = require("johnny-five");
const DataModel = require('./board-data.model');
const liquidPID = require('liquid-pid');
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
const coolingRelay = require('./cooling-relay');

const board = new five.Board({ repl: false });

const pidHlt = new liquidPID({ Pmax: 255 });
const pidMlt = new liquidPID({ Pmax: 255 });

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
    coolingRelay.initialize();

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
    recirculationControl();
    coolingControl();
}

function hltTempControl() {

    let correcao = 0;

    pidHlt.setPoint(_data.hlt.setPoint);

    if (_data.hlt.resistencia) {
        correcao = pidHlt.calculate(hltTemp.temp());
        console.log(`HLT -> SETPOINT: ${_data.hlt.setPoint} - TEMP: ${hltTemp.temp()} - P: ${correcao}`);
    }

    hltResistence.power(correcao);
}

function mltTempControl() {

    let correcao = 0;

    pidMlt.setPoint(_data.mlt.setPoint)

    if (_data.mlt.resistencia) {
        correcao = pidMlt.calculate(mltTemp.temp());
        console.log(`MLT -> SETPOINT: ${_data.mlt.setPoint} - TEMP: ${mltTemp.temp()} - P: ${correcao}`);
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

function recirculationControl() {
    if (_data.mlt.recirculacao) {
        recirculationRelay.open();
    } else {
        recirculationRelay.close();
    }
}

function coolingControl() {
    if (_data.bk.resfriamento) {
        coolingRelay.open();
    } else {
        coolingRelay.close();
    }
}

function ioConnection(socket) {

    socket.on('hltSetPoint', function (val) {
        _data.hlt.setPoint = val;
        console.log('HLT setpoint: ', val);
    });

    socket.on('hltResistencia', function (val) {
        _data.hlt.resistencia = val;
        console.log('HLT resistência: ', val ? 'ON' : 'OFF');
    });

    socket.on('mltSetPoint', function (val) {
        _data.mlt.setPoint = val;
        console.log('MLT setpoint: ', val);
    });
    socket.on('mltResistencia', function (val) {
        _data.mlt.resistencia = val;
        console.log('MLT resistência: ', val ? 'ON' : 'OFF');
    });
    socket.on('mltRecirculacao', function (val) {
        _data.mlt.recirculacao = val;
        console.log('MLT recirculação: ', val ? 'ON' : 'OFF');
    });

    socket.on('bkPotencia', function (val) {
        _data.bk.potencia = val;
        console.log('BK potência: ', val);
    });
    socket.on('bkResistencia', function (val) {
        _data.bk.resistencia = val;
        console.log('BK resistência: ', val ? 'ON' : 'OFF');
    });
    socket.on('bkResfriamento', function (val) {
        _data.bk.resfriamento = val;
        console.log('BK resfriamento: ', val ? 'ON' : 'OFF');
    });

    socket.on('buzzer', function (val) {
        if (val) {
            buzzer.play();

        } else {
            buzzer.stop();
        }

        console.log('Buzzer: ', val ? 'ON' : 'OFF');
    });
}

module.exports = function (io) {
    _io = io;
};