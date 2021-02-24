import { Socket } from "socket.io";
import randomString from "random-string";

interface Player {
  socket: Socket,
  nick: string
}

interface Move {x: number,y: number}

class TicTacToe {
  id: string = randomString({ length: 5 });
  players: Player[] = [];
  limit = 2;
  turn: number;
  board: string[][] = [
    [undefined,undefined,undefined],
    [undefined,undefined,undefined],
    [undefined,undefined,undefined]
  ];
  join(user: Player): void {
    if(this.players.length < this.limit){
      this.players.push(user);
      user.socket.emit("JOINED_GAME", this.id);
      if(this.players.length === this.limit){
        this.turn = Math.random() > 0.5 ? 1 : 0;
        const allPlayers = this.players.map(player => ({ id: player.socket.id, nick: player.nick }));
        this.players.map(player => player.socket.emit("GAME_STARTED", {
          turn: this.players[this.turn].socket.id,
          board: this.board,
          players: allPlayers
        }));
      }else {
        this.players.map(player => player.socket.emit("WAITING_FOR_OPPONENT"));
      }
    }else {
      user.socket.emit("ROOM_IS_FULL", this.id);
    }
  }
  move(user: Player, move: Move): void {
    if(user.socket.id !== this.players[this.turn].socket.id){
      user.socket.emit("NOT_YOUR_TURN");
    }else if (this.board[move.x][move.y]){
      user.socket.emit("INVALID_MOVE");
    }else {
      this.board[move.x][move.y] = user.socket.id;
      this.turn = this.turn === 0 ? 1 : 0;
      this.players.map(player => player.socket.emit("MOVED", {
        turn: this.players[this.turn].socket.id,
        board: this.board,
      }));
    }
  }
}

export default TicTacToe;