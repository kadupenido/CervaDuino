import five from "johnny-five";
import * as SocketService from "../socket/socket-service"

let temp: number = 0;

let board: five.Board;
let led: five.Led;
let pin: five.Pin;
let th: five.Thermometer;
let relayA: five.Relay;
let relayB: five.Relay;

export function initBoard() {
  board = new five.Board();
  board.on("ready", boardReady);
}

export function toggleLED(val: number) {
  //board.analogWrite(6, val);
  relayA.toggle();
  relayB.toggle()
}

function boardReady() {

  console.log("Board ready...");

  board.pinMode(6, 0x03);

  th = new five.Thermometer({
    controller: "DS18B20",
    pin: 3
  });
  getTemp();

  relayA = new five.Relay(10);
  relayB = new five.Relay(11);
  
}

function getTemp() {
  th.on("change", () => {
    console.log(th.celsius, "°C");
    SocketService.emit(th.celsius);
    console.log("RelayA ON? ", relayA.isOn);
    console.log("RelayB ON? ", relayB.isOn);

    // if(th.celsius > 30){
    //   relayA.open();
    //   relayB.close();
    // } else {
    //   relayA.close();
    //   relayB.open();
    // }


  });
}