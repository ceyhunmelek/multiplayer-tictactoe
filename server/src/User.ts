import { Socket } from "socket.io";
import randomString from "random-string";

interface User { socket: Socket, nick: string }

class User {
  socket: Socket;
  nick: string
  constructor(socket: Socket, nick: string) {
    this.socket = socket;
    this.nick = nick;
  }
}

export default User;