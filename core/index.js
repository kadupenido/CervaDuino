var coreEvent = require('./event');
var Emitter = coreEvent.emitter;

var board = require('./board');

function init() {

    board.init();

}

exports.emitter = Emitter;

exports.init = init;