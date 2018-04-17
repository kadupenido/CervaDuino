"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
class SocketService {
    static initSocket(server) {
        SocketService.io = socket_io_1.default(server);
        SocketService.io.on("connect", (skt) => {
            console.log("Cliente connected...");
            SocketService.socket = skt;
            SocketService.socket.on("disconnect", () => {
                console.log("Cliente disconnected...");
            });
        });
    }
    static emit(event, args) {
        SocketService.socket.emit(event, args);
    }
}
exports.default = SocketService;
