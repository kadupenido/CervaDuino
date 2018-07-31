const five = require("johnny-five");
const DataModel = require('./board-data.model');
const PID = require('node-pid-controller');
var fs = require('fs');

const board = new five.Board({ repl: false });

const _pidHlt = new PID({ k_p: 0.25, k_i: 0.01, k_d: 0, dt: 1 });
const _pidMlt = new PID({ k_p: 0.25, k_i: 0.01, k_d: 0.01, dt: 1 });

let _isReady = false;
let _data = DataModel;

let _tempCircuito = {};

let _relayRecirculacao = {};
let _relayAux = {};

let _tempHlt = {};
const _pinResistenciaHlt = 3;

let _tempMlt = {};
const _pinResistenciaMlt = 5;

const _pinResistenciaBk = 6;

const _pinConsumo = 1;
const _voltage = 127;


board.on("ready", boardReady);
board.on("fail", boardFail);

function boardReady() {
    initTempCircuito();

    initRelayCirculacao();
    initRelayAux();

    //  initTempHlt();
    initResistenciaHlt();

    initResistenciaMlt();

    initResistenciaBk();

    initConsumo();

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
    consumoControl();
}

function initTempCircuito() {
    _tempCircuito = new five.Thermometer({ controller: "LM35", pin: "A0" });
    _tempCircuito.on("change", function () {
        _data.temperaturaCircuito = this.celsius
    });
}

function initRelayCirculacao() {
    _relayRecirculacao = new five.Relay(4);
    _relayRecirculacao.close();
}

function initRelayAux() {
    _relayAux = new five.Relay(7);
    _relayAux.close();
}

function initTempHlt() {
    _tempHlt = new five.Temperature({
        controller: "DS18B20",
        pin: 2,
        // address: 0x317017290ff
    });
    _tempHlt.on("change", function () {
        _data.hlt.temperatura = this.celsius;
    });
}

function initTempMlt() {
    _tempMlt = new five.Temperature({
        controller: "DS18B20",
        pin: 2,
        // address: 0x317017290ff
    });
    _tempMlt.on("change", function () {
        _data.mlt.temperatura = this.celsius;
    });
}

function initResistenciaHlt() {
    board.pinMode(_pinResistenciaHlt, five.Pin.PWM);
    board.analogWrite(_pinResistenciaHlt, 0);
}

function initResistenciaMlt() {
    board.pinMode(_pinResistenciaMlt, five.Pin.PWM);
    board.analogWrite(_pinResistenciaMlt, 0);
}

function initResistenciaBk() {
    board.pinMode(_pinResistenciaBk, five.Pin.PWM);
    board.analogWrite(_pinResistenciaBk, 0);
}

function initConsumo() {

    const numberOfSamples = 50;
    let i = 0;
    let offsetI = 512;
    let sumI = 0;
    let filteredI = 0;

    board.pinMode(_pinConsumo, five.Pin.INPUT);
    board.analogRead(_pinConsumo, function (voltage) {
        if (i < numberOfSamples) {
            offsetI = (offsetI + (voltage - offsetI) / 1024);
            filteredI = voltage - offsetI;
            sumI += filteredI * filteredI;
            i++;
        } else {
            let iRatio = 16.67 * ((4541 / 1000.0) / (1024));
            let consumo = iRatio * Math.sqrt(sumI / numberOfSamples);
            _data.consumo.corrente = consumo > 0.045 ? consumo : 0;
            _data.consumo.potencia = _data.consumo.corrente * _voltage;
            sumI = 0;
            i = 0;
        }
    });
}

function consumoControl() {
    _data.consumo.energia += (_data.consumo.potencia / 3600) / 1000;
}

function hltTempControl() {

    let correcao = 0;

    _pidHlt.setTarget(_data.hlt.setPoint);

    if (_data.hlt.resistencia) {
        correcao = _pidHlt.update(_data.hlt.temperatura);
        correcao = correcao < 0 ? 0 : correcao > 255 ? 255 : correcao;
    }

    board.analogWrite(_pinResistenciaHlt, correcao);
}

function mltTempControl() {

    let correcao = 0;

    _pidMlt.setTarget(_data.mlt.setPoint);

    if (_data.mlt.resistencia) {
        correcao = _pidMlt.update(_data.mlt.temperatura);
        correcao = correcao < 0 ? 0 : correcao > 255 ? 255 : correcao;
        _relayRecirculacao.open();
    } else {
        _relayRecirculacao.close();
    }

    board.analogWrite(_pinResistenciaMlt, correcao);
}

function bkTempControl() {
    if (_data.bk.resistencia) {
        board.analogWrite(_pinResistenciaBk, _data.bk.potencia);
    } else {
        board.analogWrite(_pinResistenciaBk, 0);
    }
}

function recirculacaoControl() {
    if (_data.mlt.recirculacao) {
        _relayRecirculacao.open();
    } else if (!_data.mlt.resistencia) {
        _relayRecirculacao.close();
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