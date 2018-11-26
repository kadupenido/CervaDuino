const five = require("johnny-five");
const DataModel = require('./board-data.model');
const PID = require('node-pid-controller');
var fs = require('fs');

const buzzer = require('./buzzer');

const circuitTemp = require('./circuit-temp');

const hltTemp = require('./hlt-temp');
const hltResistence = require('./hlt-resistance');

const mltTemp = require('./mlt-temp');
const mltResistence = require('./mlt-resistance');

const bkTemp = require('./bk-temp');
const bkResistence = require('./bk-resistance');

const recirculationRelay = require('./recirculation-relay');
const auxRelay = require('./aux-relay');

const current = require('./current');

const board = new five.Board({ repl: false });

const _pidHlt = new PID({ k_p: 0.25, k_i: 0.01, k_d: 0, dt: 1 });
const _pidMlt = new PID({ k_p: 0.25, k_i: 0.01, k_d: 0.01, dt: 1 });

let _isReady = false;
let _data = DataModel;

board.on("ready", boardReady);
board.on("fail", boardFail);

function boardReady() {

    buzzer.initialize(board);

    circuitTemp.initialize();

    hltTemp.initialize();
    hltResistence.initialize(board);

    mltTemp.initialize();
    mltResistence.initialize(board);

    bkTemp.initialize();
    bkResistence.initialize(board);

    recirculationRelay.initialize();
    auxRelay.initialize();

    current.initialize(board);

    board.loop(1000, boardLoop);

    _isReady = true;
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

function log() {
    var currentdate = new Date();
    var hora = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    var hora1 = "Hora: " + hora;
    var temp = "Temp: " + Math.round((_data.hlt.temperatura * 10)) / 10;
    var potencia = "Potencia: " + _data.hlt.potencia;
    console.log(hora1 + "  " + temp + "  " + potencia);

    var log = {
        hora: hora,
        temp: Math.round((_data.hlt.temperatura * 10)) / 10,
        potencia: _data.hlt.potencia
    };

    fs.appendFile('C:\\Users\\Kadu\\Desktop\\Chart\\registros.json', JSON.stringify(log) + "\r\n", function (err) {
        if (err) throw err;
    });
}

module.exports.isReady = () => {
    return _isReady;
}

module.exports.getData = () => {

    _data.temperaturaCircuito = circuitTemp.temp();

    _data.hlt.temperatura = hltTemp.temp();
    _data.mlt.temperatura = mltTemp.temp();
    _data.bk.temperatura = bkTemp.temp();

    const currentData = current.data();

    _data.consumo.energia = currentData.consumption;
    _data.consumo.corrente = currentData.current;
    _data.consumo.potencia = currentData.power;

    return _data;
}

module.exports.setData = (data) => {
    if (!data) return;

    _data.hlt.setPoint = data.hlt.setPoint;
    _data.hlt.resistencia = data.hlt.resistencia;

    _data.mlt.setPoint = data.mlt.setPoint;
    _data.mlt.resistencia = data.mlt.resistencia;
    _data.mlt.recirculacao = data.mlt.recirculacao;

    _data.bk.potencia = data.bk.potencia;
    _data.bk.resistencia = data.bk.resistencia;
}
