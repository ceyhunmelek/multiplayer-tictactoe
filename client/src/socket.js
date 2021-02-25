import { io } from "socket.io-client";
import {toast} from "react-toastify";
import store from "./redux";
import {setIdState, setNickState} from "./redux/user/actions";
import {
  setBoardState,
  setGameIDState,
  setGameStatusState, setOpponentState, setScoreState,
  setTurnState
} from "./redux/game/actions";

const ENDPOINT = "http://localhost:8081";
const socket = process.env.NODE_ENV === "production" ? io().connect() : io(ENDPOINT).connect();

socket.on("NICK_EXISTS", () => {
  toast.error("Nickname already in use");
});
socket.on("NICK_SET", (nick) => {
  store.dispatch(setNickState(nick));
  store.dispatch(setIdState(socket.id));
  toast.success(`Welcome ${nick}!`);
});
socket.on("ROOM_IS_FULL", () => {
  toast.warn("Game is full.");
});
socket.on("ROOM_IS_NOT_EXIST", () => {
  toast.error("Room ID is not valid.");
});
socket.on("JOINED_GAME", res => {
  store.dispatch(setGameIDState(res));
  toast.warn("Joined the room");
});
socket.on("WAITING_FOR_OPPONENT", () => {
  store.dispatch(setGameStatusState(false));
});
socket.on("GAME_STARTED", ({ board, players, turn, score}) => {
  const state = store.getState();
  store.dispatch(setGameStatusState(true));
  store.dispatch(setBoardState(board));
  store.dispatch(setTurnState(state.user.id === turn));
  store.dispatch(setOpponentState(players.find(player => player.id !== state.user.id)));
  store.dispatch(setScoreState(score));
  toast.success("Round started.");
});
socket.on("NOT_YOUR_TURN", () => {
  toast.warn("It is not your turn!");
});
socket.on("INVALID_MOVE", () => {
  toast.warn("Move is invalid.");
});
socket.on("MOVED", ({ turn, board }) => {
  const state = store.getState();
  store.dispatch(setBoardState(board));
  store.dispatch(setTurnState(state.user.id === turn));
});
socket.on("GAME_END", ({ draw, winner, score }) => {
  if(draw){
    toast.warn("DRAW!");
  }else {
    socket.id === winner ? toast.success("YOU WON!") : toast.error("YOU LOSE!");
    store.dispatch(setGameStatusState(false));
  }
  store.dispatch(setScoreState(score));
});
socket.on("USER_DISCONNECTED", () => {
  toast.warn("Your opponent ran away");
  store.dispatch(setGameIDState(undefined));
  store.dispatch(setScoreState(undefined));
});

export const setNick = (nick) => socket.emit("SET_NICK", nick);
export const createRoom = () => socket.emit("CREATE_ROOM");
export const joinRoom = (id) => socket.emit("JOIN_ROOM", id);
export const makeMove = (roomID, move) => socket.emit("MOVE", roomID, move);

export default socket;
