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
  score: { [name: string]: number } = {};
  numberOfMoves = 0;
  turn: number;
  board: string[][];
  join(user: Player): void {
    if(this.players.length < this.limit){
      this.players.push(user);
      this.score[user.socket.id] = 0;
      user.socket.emit("JOINED_GAME", this.id);
      if(this.players.length === this.limit){
        this.rematch();
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
      this.numberOfMoves++;
      this.check();
    }
  }
  check(): void {
    // cols
    for(let x = 0; x < 3; x++) {
      let sign: string;
      let win = true;
      for(let y = 0; y < 3; y++) {
        const value = this.board[x][y];
        if (!value) {
          win = false;
          break;
        }
        if (!sign) sign = value;
        if (sign !== value) {
          win = false;
          break;
        }
      }
      if(win) {
        this.score[sign]++;
        this.players.map(player => player.socket.emit("GAME_END", { winner: sign, score: this.score }));
        this.rematch();
        return;
      }
    }
    // row
    for(let y = 0; y < 3; y++) {
      let sign: string;
      let win = true;
      for(let x = 0; x < 3; x++) {
        const value = this.board[x][y];
        if (!value) {
          win = false;
          break;
        }
        if (!sign) sign = value;
        if (sign !== value) {
          win = false;
          break;
        }
      }
      if(win) {
        this.score[sign]++;
        this.players.map(player => player.socket.emit("GAME_END", { winner: sign, score: this.score }));
        this.rematch();
        return;
      }
    }
    // diagonal
    if((this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) || (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0])){
      if(this.board[1][1]){
        this.score[this.board[1][1]]++;
        this.players.map(player => player.socket.emit("GAME_END", { winner: this.board[1][1], score: this.score }));
        this.rematch();
        return;
      }
    }
    // draw
    if(this.numberOfMoves === 9){
      this.players.map(player => player.socket.emit("GAME_END", { draw: true, score: this.score }));
      this.rematch();
      return;
    }
  }
  rematch(): void {
    this.turn = Math.random() > 0.5 ? 1 : 0;
    this.numberOfMoves = 0;
    this.board = [
      [undefined,undefined,undefined],
      [undefined,undefined,undefined],
      [undefined,undefined,undefined]
    ];
    const allPlayers = this.players.map(player => ({ id: player.socket.id, nick: player.nick }));
    this.players.map(player => player.socket.emit("GAME_STARTED", {
      turn: this.players[this.turn].socket.id,
      board: this.board,
      score: this.score,
      players: allPlayers
    }));
  }
}

export default TicTacToe;
