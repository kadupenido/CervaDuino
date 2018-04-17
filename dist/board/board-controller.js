"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = __importDefault(require("johnny-five"));
let board;
let led;
let pin;
function initBoard() {
    board = new johnny_five_1.default.Board();
    board.on("ready", boardReady);
}
exports.initBoard = initBoard;
function toggleLED(val) {
    pin.write(val);
}
exports.toggleLED = toggleLED;
function boardReady() {
    console.log("Board ready...");
    pin = new johnny_five_1.default.Pin(13);
}
