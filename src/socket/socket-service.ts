import { Server } from "http";
import socketIO from "socket.io";
import * as BoardController from "../board/board-controller";

let socket: SocketIO.Socket;

export function initSocket(srv: Server) {
  const server = socketIO(srv);
  server.on("connect", (skt: SocketIO.Socket) => {
    console.log("Client connected...");
    socket = skt;
    BoardController.initBoard();
    listen();
  });
}

function listen() {
  socket.on("toggleLED", val => {
    BoardController.toggleLED(val);
  });
}

export function emit(val: number) {
  socket.emit("temp", val + "°C");
}
