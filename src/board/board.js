const five = require("johnny-five");
const DataModel = require('./board-data.model');

const board = new five.Board({ repl: false });

let _isReady = false;
let _data = DataModel;

let _tempCircuito = {};
let _relayRecirculacao = {};
let _relayAux = {};

board.on("ready", boardReady);
board.on("fail", boardFail);
board.on("close", boardClose);

function boardReady() {
    initTempCircuito();
    initRelayCirculacao();
    initRelayAux();

    _isReady = true;
}

function boardFail(e) {
    _isReady = false;
}

function boardClose() {
    _isReady = false
}

function initTempCircuito() {
    _tempCircuito = new five.Thermometer({ controller: "LM35", pin: "A0" });
    _tempCircuito.on("change", function () {
        _data.tempCircuito = this.celsius
    });
}

function initRelayCirculacao() {
    _relayRecirculacao = new five.Relay(7);
}

function initRelayAux() {
    _relayAux = new five.Relay(8);
}

function refreshData() {
    if (_data.mlt.recirculacao) {
        _relayRecirculacao.open();
    } else {
        _relayRecirculacao.close();
    }
}

module.exports.isReady = () => {
    return _isReady;
}

module.exports.getData = () => {
    return _data;
}

module.exports.setData = (data) => {
    if (!data) return;

    _data.mlt.recirculacao = data.mlt.recirculacao;

    refreshData();
}