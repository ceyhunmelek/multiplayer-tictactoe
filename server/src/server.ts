import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import User from "./User";
import TicTacToe from "./TicTacToe";
const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

interface UserInterface { socket: Socket, nick: string }
const games: TicTacToe[] = [];
const users: UserInterface[] = [];
console.log(process.env.CLIENT_URL);

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
  socket.on("MOVE", (roomID, move) => {
    const game = games.find(game => game.id === roomID);
    const user = users.find(user => user.socket.id === socket.id);
    if(game && user) game.move(user, move);
  });
  socket.on("disconnect", () => {
    const index = users.findIndex(user => user.socket.id === socket.id);
    if(index !== -1) users.splice(index,1);
    const userGames = games.filter(game => game.players.some(player => player.socket.id === socket.id));
    userGames.forEach(game => game.players.forEach(player => player.socket.id !== socket.id && player.socket.emit("USER_DISCONNECTED")));
  });
});

http.listen(8081, () => {
  console.log("Listening");
});
