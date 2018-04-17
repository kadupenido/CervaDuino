import five from "johnny-five";

let board: five.Board;
let led: five.Led;
let pin: five.Pin;

export function initBoard() {
  board = new five.Board();
  board.on("ready", boardReady);
}

export function toggleLED(val: number) {
  pin.write(val);
}

function boardReady() {
  console.log("Board ready...");
  pin = new five.Pin(13);
}