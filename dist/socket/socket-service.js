"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const BoardController = __importStar(require("../board/board-controller"));
let socket;
function initSocket(srv) {
    const server = socket_io_1.default(srv);
    server.on("connect", (skt) => {
        console.log("Client connected...");
        socket = skt;
        BoardController.initBoard();
        listen();
    });
}
exports.initSocket = initSocket;
function listen() {
    socket.on("toggleLED", (val) => {
        BoardController.toggleLED(val);
    });
}
