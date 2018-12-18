var five = require("johnny-five");
var ports = require('./ports');
var Modules = require('./modules');
var coreEvent = require('../event');
var liquidPID = require('liquid-pid');
var DataModel = require('./board-data.model');

var _board = {};

var _buzzer = new Modules.BuzzerModule;
var _current = new Modules.CurrentModule;
var _relayRecirulation = new Modules.RelayModule;
var _relayCooling = new Modules.RelayModule;
var _hltTemperature = new Modules.TemperatureModule;
var _mltTemperature = new Modules.TemperatureModule;
var _bkTemperature = new Modules.TemperatureModule;
var _hltResistence = new Modules.ResistenceModule;
var _mltResistence = new Modules.ResistenceModule;
var _bkResistence = new Modules.ResistenceModule;

var pidMlt = new liquidPID({ Pmax: 255 });
var pidMlt = new liquidPID({ Pmax: 255 });

var _data = DataModel;

exports.init = function () {
    _board = new five.Board({ repl: false });

    _board.on("ready", boardReady);
    _board.on("fail", boardFail);
    _board.on("close", boardClose);
}

function boardReady() {

    _buzzer.init(ports.buzzer, null);
    _current.init(_board, ports.current, coreEvent.current); // adicionar evento

    _relayRecirulation.init(ports.mlt.recirculationRelay, coreEvent.mlt.recirculation.changed, 'Recirculation');
    _relayCooling.init(ports.bk.coolingRelay, coreEvent.bk.cooling.changed, 'Cooling');

    _hltTemperature.init(ports.hlt, coreEvent.hlt.temperature.changed, 'HLT');
    _mltTemperature.init(ports.mlt, coreEvent.mlt.temperature.changed, 'MLT');
    _bkTemperature.init(ports.bk, coreEvent.bk.temperature.changed, 'BK');

    _hltResistence.init(_board, ports.hlt, coreEvent.hlt.resistence.changed, 'HLT');
    _mltResistence.init(_board, ports.mlt, coreEvent.mlt.resistence.changed, 'MLT');
    _bkResistence.init(_board, ports.bk, coreEvent.bk.resistence.changed, 'BK');

    _board.loop(1000, boardLoop);

    console.log('Board ready...')

}

function boardFail(e) {
    console.log(e.message);
}

function boardClose(){

    _relayRecirulation.change(false);
    _relayCooling.change(false);

    _hltResistence.setPower(0);
    _mltResistence.setPower(0);
    _bkResistence.setPower(0);
    _buzzer.stop();

    console.log('Board closed...');
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
        correcao = pidHlt.calculate(_hltTemperature.getTemp());
        console.log(`HLT -> SETPOINT: ${_data.hlt.setPoint} - TEMP: ${_hltTemperature.getTemp()} - P: ${correcao}`);
    }

    _hltResistence.setPower(correcao);
}

function mltTempControl() {

    let correcao = 0;

    pidMlt.setPoint(_data.mlt.setPoint)

    if (_data.mlt.resistencia) {
        correcao = pidMlt.calculate(_mltTemperature.getTemp());
        console.log(`MLT -> SETPOINT: ${_data.mlt.setPoint} - TEMP: ${_mltTemperature.getTemp()} - P: ${correcao}`);
    }

    _mltResistence.setPower(correcao);
}

function bkTempControl() {
    if (_data.bk.resistencia) {
        _bkResistence.setPower(_data.bk.potencia);
    } else {
        _bkResistence.setPower(0);
    }
}

function recirculationControl() {
    _relayRecirulation.change(_data.mlt.recirculacao);
}

function coolingControl() {
    _relayRecirulation.change(_data.bk.resfriamento);
}
