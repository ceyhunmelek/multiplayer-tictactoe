import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import User from "./User";
import TicTacToe from "./TicTacToe";
const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

interface UserInterface { socket: Socket, nick: string }
const games: TicTacToe[] = [];
const users: UserInterface[] = [];

io.on("connection", (socket: Socket) => {
  socket.on("SET_NICK", (nick) => {
    if(!users.some(user => user.nick === nick)) {
      users.push(new User(socket, nick));
      socket.emit("NICK_SET", nick);
    }else {
      socket.emit("NICK_EXISTS");
    }
  });
  socket.on("CREATE_ROOM", () => {
    const game = new TicTacToe();
    games.push(game);
    const user = users.find(user => user.socket.id === socket.id);
    game.join(user);

  });
  socket.on("JOIN_ROOM", (id) => {
    const game = games.find(game => game.id === id);
    if(game){
      game.join(users.find(user => user.socket.id === socket.id));
    }else {
      socket.emit("ROOM_IS_NOT_EXIST");
    }
  });
  socket.on("disconnect", () => {
    const index = users.findIndex(user => user.socket.id === socket.id);
    if(index !== -1) users.splice(index,1);
    // USER DISCONNECTED ROOm
  });
});

http.listen(8081, () => {
  console.log("Listening");
});
